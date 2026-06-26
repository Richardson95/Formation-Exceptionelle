<template>
  <section class="section-padding bg-white relative overflow-hidden" id="faculty">
    <!-- Background decoration -->
    <div class="absolute inset-0 pointer-events-none opacity-50">
      <div class="absolute top-10 right-1/4 w-72 h-72 bg-purple-100 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-1/4 w-72 h-72 bg-gold-100 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative z-10">
      <div class="text-center mb-14" data-aos="fade-up">
        <span class="badge-gold text-sm px-4 py-2 mb-4 inline-block">World-Class Experts</span>
        <h2 class="section-title mb-4">
          Meet Our <span class="gradient-text">Distinguished Faculty</span>
        </h2>
        <p class="section-subtitle">
          Seasoned partners, general counsel and industry leaders who facilitate our programmes and
          share real-world expertise from the boardroom and the courtroom.
        </p>
      </div>

      <!-- Moving faculty marquee -->
      <div class="relative" data-aos="fade-up" data-aos-delay="100">
        <!-- Edge fades -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-20"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20"></div>

        <div class="faculty-marquee">
          <ul class="faculty-track">
            <li
              v-for="(person, i) in [...facultyMembers, ...facultyMembers]"
              :key="i + '-' + person.name"
              class="faculty-card"
              :aria-hidden="i >= facultyMembers.length ? 'true' : null"
            >
              <div class="faculty-photo">
                <img
                  v-if="person.img"
                  :src="person.img"
                  :alt="person.name"
                  loading="lazy"
                  class="faculty-photo-img"
                />
                <div
                  v-else
                  class="faculty-initials"
                  :style="{ background: person.gradient }"
                >
                  {{ person.initials }}
                </div>
                <span v-if="person.role" class="faculty-role-tag">{{ person.role }}</span>
              </div>

              <div class="faculty-info">
                <h3 class="faculty-name">{{ person.name }}</h3>
                <p v-if="person.title" class="faculty-title">{{ person.title }}</p>
                <p v-if="person.org" class="faculty-org">{{ person.org }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Real faculty / facilitators. Photos live in /public (referenced from root).
// People without a photo yet fall back to an initials avatar — drop a matching
// file in /public and set `img` to show their headshot.
const facultyMembers = [
  { name: 'Funmilayo Otsemobor', role: 'Partner', title: 'Partner', org: 'Aluko & Oyebode', img: '/FUNMILAYO%20OTSEMOBOR.jpeg' },
  { name: 'Dr. Ayodele Oni', role: 'Partner', title: 'Partner', org: 'Bloomfield Law Practice', img: null, initials: 'AO', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)' },
  { name: 'Desmond Ogba', role: 'Partner', title: 'Partner', org: 'Templars Law', img: '/DESMOND%20OGBA.jpeg' },
  { name: 'Adedoyin Afun', role: 'Partner', title: 'Partner', org: 'Bloomfield Law Practice', img: '/ADEDOYIN%20AFUN.jpeg' },
  { name: 'Dipo Akinbode', role: 'General Counsel', title: 'Group Deputy, General Counsel', org: 'Aradel Holdings Plc', img: null, initials: 'DA', gradient: 'linear-gradient(135deg, #d97706, #fbbf24)' },
  { name: 'Oluwadare Agbelese', role: 'Group Head', title: 'Group Head, Legal & Supply Chain Management', org: 'Waltersmith', img: '/OLUWADARE%20AGBELESE.jpeg' },
  { name: 'Akindeji Oyebode', role: 'Partner', title: 'Partner', org: 'Banwo & Ighodalo', img: '/AKINDEJI%20OYEBODE.jpeg' },
  { name: 'Boonyameen Babajide Lawal', role: 'Partner', title: 'Partner', org: 'Babalakin & Co', img: '/BOOYAMEEN%20LAWAL.jpeg' },
  { name: 'Stella Duru', role: 'Partner', title: 'Partner', org: 'Banwo & Ighodalo', img: '/STELLA%20DURU.jpeg' },
  { name: 'Dipo Okuribido', role: 'General Counsel', title: 'Senior Vice President & General Counsel', org: 'Verod Capital Management', img: '/DIPO%20OKURIBIDO.jpeg' },
  { name: 'Tosin Baruwa', role: null, title: null, org: null, img: '/Tosin%20Baruwa.jpeg' },
  { name: 'Seyi Bella', role: 'Partner', title: 'Partner', org: 'Banwo & Ighodalo', img: '/SEYI%20BELLA.jpeg' },
  { name: 'Chinedum Umeche', role: 'Partner', title: 'Partner', org: 'Banwo & Ighodalo', img: '/CHINEDUM%20UMECHE.jpeg' },
  { name: 'Okechukwu Okoro', role: 'Partner', title: 'Partner', org: 'G. Elias', img: '/OKECHUKWU%20OKORO.jpeg' },
  { name: 'Adeola Sunmola', role: 'Partner', title: 'Partner', org: 'Udo Udoma & Belo-Osagie', img: '/ADEOLA%20SUNMOLA.jpeg' },
]
</script>

<style scoped>
.faculty-marquee {
  width: 100%;
  overflow: hidden;
  padding: 0.5rem 0 1rem;
}

.faculty-track {
  display: flex;
  width: max-content;
  gap: 1.5rem;
  animation: faculty-scroll 70s linear infinite;
}

.faculty-marquee:hover .faculty-track {
  animation-play-state: paused;
}

.faculty-card {
  flex: 0 0 auto;
  width: 16rem;
  background: #ffffff;
  border: 1px solid #ede9fe;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 8px 22px -12px rgba(76, 29, 149, 0.25);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.faculty-card:hover {
  transform: translateY(-6px);
  border-color: #c4b5fd;
  box-shadow: 0 18px 36px -14px rgba(76, 29, 149, 0.4);
}

.faculty-photo {
  position: relative;
  width: 100%;
  height: 17rem;
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
}

.faculty-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.faculty-initials {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
}

.faculty-role-tag {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #4c1d95;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 2px 8px -2px rgba(76, 29, 149, 0.35);
  backdrop-filter: blur(2px);
}

.faculty-info {
  padding: 1rem 1.1rem 1.25rem;
  text-align: center;
}

.faculty-name {
  font-weight: 800;
  font-size: 1.05rem;
  line-height: 1.25;
  color: #1f2937;
}

.faculty-title {
  margin-top: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #7c3aed;
  line-height: 1.3;
}

.faculty-org {
  margin-top: 0.15rem;
  font-size: 0.78rem;
  color: #6b7280;
  line-height: 1.3;
}

@keyframes faculty-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .faculty-track {
    animation: none;
  }
  .faculty-marquee {
    overflow-x: auto;
  }
}
</style>
