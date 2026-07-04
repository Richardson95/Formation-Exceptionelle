/**
 * videoService — Udemy-style video upload seam.
 * --------------------------------------------------------------------------
 * The whole app is currently a frontend-only mock. This module is the single
 * place that talks to "the video backend". Today it runs in MOCK mode:
 *   - reads the file's duration
 *   - grabs a thumbnail frame
 *   - simulates chunked upload progress
 *   - returns a session-only object URL for playback
 *
 * When the real backend is ready, set VITE_API_BASE_URL (see .env.example) and
 * fill in realUpload(). Nothing else in the UI needs to change — components
 * only ever call uploadVideo() / getPlaybackUrl().
 *
 * Expected backend response shape from realUpload():
 *   {
 *     assetId:      string,   // server id for the video
 *     status:       'processing' | 'ready',
 *     playbackUrl:  string,   // HLS/MP4 URL the <video> can play
 *     thumbnail:    string,   // poster image URL
 *     duration:     number,   // seconds
 *     durationLabel:string,   // 'mm:ss'
 *   }
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
// Automatically use the mock until a backend URL is configured.
const MOCK_MODE = !API_BASE_URL

// In-memory registry of uploaded blobs for the current session so playback
// works before a real backend exists. NOTE: object URLs do not survive a page
// reload — that limitation disappears once a real backend returns durable URLs.
const sessionBlobs = new Map()

export function formatDuration(seconds) {
  if (!seconds || !isFinite(seconds)) return ''
  const s = Math.floor(seconds % 60)
  const m = Math.floor((seconds / 60) % 60)
  const h = Math.floor(seconds / 3600)
  const pad = (n) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

export function formatFileSize(bytes) {
  if (!bytes) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let val = bytes
  while (val >= 1024 && i < units.length - 1) { val /= 1024; i++ }
  return `${val.toFixed(val >= 10 || i === 0 ? 0 : 1)} ${units[i]}`
}

/**
 * Reads metadata (duration) and captures a thumbnail frame from a video File,
 * entirely in the browser. Used by the mock; a real backend would do this
 * server-side during transcoding.
 */
function probeVideo(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.src = url

    const fail = () => resolve({ duration: 0, durationLabel: '', thumbnail: null, playbackUrl: url })

    video.onloadedmetadata = () => {
      // Seek a little in to grab a representative (non-black) frame.
      const target = Math.min(Math.max(video.duration * 0.1, 0.5), video.duration || 0.5)
      try { video.currentTime = target } catch { fail() }
    }

    video.onseeked = () => {
      let thumbnail = null
      try {
        const canvas = document.createElement('canvas')
        const w = 320
        const ratio = video.videoHeight && video.videoWidth ? video.videoHeight / video.videoWidth : 9 / 16
        canvas.width = w
        canvas.height = Math.round(w * ratio)
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
        thumbnail = canvas.toDataURL('image/jpeg', 0.6)
      } catch {
        thumbnail = null
      }
      resolve({
        duration: video.duration,
        durationLabel: formatDuration(video.duration),
        thumbnail,
        playbackUrl: url,
      })
    }

    video.onerror = fail
  })
}

/**
 * Upload a video file. Returns a video asset object (see module header).
 * @param {File} file
 * @param {{ onProgress?: (pct:number) => void }} options
 */
export async function uploadVideo(file, { onProgress } = {}) {
  if (!file) throw new Error('No file provided')
  if (!file.type.startsWith('video/')) throw new Error('Please choose a video file (MP4, MOV, WEBM…).')

  return MOCK_MODE ? mockUpload(file, onProgress) : realUpload(file, onProgress)
}

async function mockUpload(file, onProgress) {
  const meta = await probeVideo(file)
  const assetId = `vid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  sessionBlobs.set(assetId, meta.playbackUrl)

  // Simulate a chunked upload so the progress UI behaves like the real thing.
  await new Promise((resolve) => {
    let pct = 0
    const tick = () => {
      pct += Math.random() * 16 + 6
      if (pct >= 100) { onProgress?.(100); resolve() }
      else { onProgress?.(Math.round(pct)); setTimeout(tick, 160) }
    }
    tick()
  })

  return {
    assetId,
    source: 'upload',
    status: 'ready', // a real backend typically returns 'processing' first, then 'ready'
    originalName: file.name,
    size: file.size,
    duration: meta.duration,
    durationLabel: meta.durationLabel,
    thumbnail: meta.thumbnail,
    playbackUrl: meta.playbackUrl, // session-only object URL in mock mode
  }
}

/* -------------------------------------------------------------------------
 * REAL BACKEND IMPLEMENTATION — fill in when the API is ready.
 *
 * Pattern A (shown): direct multipart upload to your API, using XHR so we get
 * real upload-progress events.
 *
 * Pattern B (recommended at scale): presigned / direct upload to a video
 * platform (Mux, Cloudflare Stream, S3 + transcode):
 *   1) const { uploadUrl, assetId } = await fetch(`${API_BASE_URL}/api/videos/create-upload`).then(r => r.json())
 *   2) PUT the file straight to uploadUrl (XHR for progress)
 *   3) poll GET `${API_BASE_URL}/api/videos/${assetId}` until status === 'ready'
 * ------------------------------------------------------------------------- */
function realUpload(file, onProgress) {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${API_BASE_URL}/api/videos/upload`)
    // Video upload is instructor-only — attach the saved JWT.
    const authToken = localStorage.getItem('fe_token')
    if (authToken) xhr.setRequestHeader('Authorization', `Bearer ${authToken}`)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText)
          resolve({ source: 'upload', originalName: file.name, size: file.size, ...data })
        } catch {
          reject(new Error('Unexpected server response'))
        }
      } else {
        reject(new Error(`Upload failed (${xhr.status})`))
      }
    }
    xhr.onerror = () => reject(new Error('Network error during upload'))
    xhr.send(form)
  })
}

/**
 * Resolve a playable URL for a stored video asset.
 * In mock mode this prefers the live session object URL.
 */
export function getPlaybackUrl(asset) {
  if (!asset) return ''
  if (asset.source === 'url') return asset.playbackUrl || ''
  if (asset.assetId && sessionBlobs.has(asset.assetId)) return sessionBlobs.get(asset.assetId)
  return asset.playbackUrl || ''
}

/**
 * The embeddable player URL for a stored asset, when the backend provides one
 * (Bunny Stream iframe player). Bunny serves HLS that a raw <video> can't play
 * cross-browser, so when embedUrl exists the player should render an <iframe>.
 * Mock/session uploads have no embedUrl — the caller falls back to <video>.
 */
export function getEmbedUrl(asset) {
  return asset?.embedUrl || ''
}

/**
 * Whether the asset can actually be played right now. In mock mode an uploaded
 * asset becomes unplayable after a page reload (its blob is gone); a real
 * backend keeps it playable forever.
 */
export function isPlayable(asset) {
  if (!asset || asset.status !== 'ready') return false
  if (asset.source === 'url') return !!asset.playbackUrl
  return sessionBlobs.has(asset.assetId) || /^https?:/.test(asset.playbackUrl || '')
}

/** Build an asset object from a pasted external video link (fallback path). */
export function assetFromUrl(url) {
  return {
    assetId: `url_${Date.now()}`,
    source: 'url',
    status: 'ready',
    originalName: '',
    size: 0,
    duration: 0,
    durationLabel: '',
    thumbnail: null,
    playbackUrl: url,
  }
}

export const isMockMode = MOCK_MODE
