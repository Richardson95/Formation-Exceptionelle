<template>
  <section class="section-padding bg-white relative overflow-hidden" id="clients">
    <!-- Background decoration -->
    <div class="absolute inset-0 pointer-events-none opacity-50">
      <div class="absolute top-10 left-1/4 w-72 h-72 bg-purple-100 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-1/4 w-72 h-72 bg-gold-100 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative z-10">
      <!-- Header -->
      <div class="text-center mb-14" data-aos="fade-up">
        <span class="badge-purple text-sm px-4 py-2 mb-4 inline-block">Trusted Partners</span>
        <h2 class="section-title mb-4">
          Who We've <span class="gradient-text">Worked With</span>
        </h2>
        <p class="section-subtitle">
          Leading organisations across law, banking, energy and industry trust Formation Exceptionelle
          to develop their people.
        </p>
      </div>

      <!-- Marquee -->
      <div class="relative" data-aos="fade-up" data-aos-delay="100">
        <!-- Edge fades -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-20"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20"></div>

        <!-- Row 1 -->
        <div class="marquee mb-5">
          <ul class="marquee-track">
            <li v-for="(client, i) in row1" :key="'a' + i" class="client-card">
              <span class="client-logo" :class="{ 'client-logo--img': client.logo }">
                <img v-if="client.logo" :src="client.logo" :alt="client.name + ' logo'" class="client-logo-img" />
                <span v-else>{{ client.short }}</span>
              </span>
              <span class="client-name">{{ client.name }}</span>
            </li>
            <li v-for="(client, i) in row1" :key="'a2' + i" class="client-card" aria-hidden="true">
              <span class="client-logo" :class="{ 'client-logo--img': client.logo }">
                <img v-if="client.logo" :src="client.logo" :alt="''" class="client-logo-img" />
                <span v-else>{{ client.short }}</span>
              </span>
              <span class="client-name">{{ client.name }}</span>
            </li>
          </ul>
        </div>

        <!-- Row 2 (reverse) -->
        <div class="marquee">
          <ul class="marquee-track marquee-track--reverse">
            <li v-for="(client, i) in row2" :key="'b' + i" class="client-card">
              <span class="client-logo" :class="{ 'client-logo--img': client.logo }">
                <img v-if="client.logo" :src="client.logo" :alt="client.name + ' logo'" class="client-logo-img" />
                <span v-else>{{ client.short }}</span>
              </span>
              <span class="client-name">{{ client.name }}</span>
            </li>
            <li v-for="(client, i) in row2" :key="'b2' + i" class="client-card" aria-hidden="true">
              <span class="client-logo" :class="{ 'client-logo--img': client.logo }">
                <img v-if="client.logo" :src="client.logo" :alt="''" class="client-logo-img" />
                <span v-else>{{ client.short }}</span>
              </span>
              <span class="client-name">{{ client.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Real brand logos (sourced from each company's official site).
// Companies without a square brand mark keep an elegant monogram fallback.
import geliasLogo from '@/assets/clients/gelias.png'
import templarsLogo from '@/assets/clients/templars.png'
import zenithLogo from '@/assets/clients/zenith.png'
import buaLogo from '@/assets/clients/bua.png'
import aelexLogo from '@/assets/clients/aelex.png'
import rmbLogo from '@/assets/clients/rmb.png'
import banwoLogo from '@/assets/clients/banwo.png'
import bloomfieldLogo from '@/assets/clients/bloomfield.png'
import cosgroveLogo from '@/assets/clients/cosgrove.png'
import tetracoreLogo from '@/assets/clients/tetracore.png'
import aradelLogo from '@/assets/clients/aradel.png'
import karrenLogo from '@/assets/clients/karren.png'
import doaLogo from '@/assets/clients/doa.png'
import ekedcLogo from '@/assets/clients/ekedc.png'

const clients = [
  { name: 'G. Elias', short: 'GE', logo: geliasLogo },
  { name: 'Templars', short: 'TP', logo: templarsLogo },
  { name: 'Zenith Bank Plc', short: 'ZB', logo: zenithLogo },
  { name: 'Matrix', short: 'MX', logo: null },
  { name: 'BUA Cement', short: 'BUA', logo: buaLogo },
  { name: 'AELEX', short: 'AX', logo: aelexLogo },
  { name: 'Rand Merchant Bank', short: 'RMB', logo: rmbLogo },
  { name: 'Banwo & Ighodalo', short: 'B&I', logo: banwoLogo },
  { name: 'Bloomfield Legal Practice', short: 'BLP', logo: bloomfieldLogo },
  { name: 'Cosgrove', short: 'CG', logo: cosgroveLogo },
  { name: 'Tetracore Energy Group', short: 'TEG', logo: tetracoreLogo },
  { name: 'Aluko & Oyebode', short: 'A&O', logo: null },
  { name: 'Aradel Holdings', short: 'AH', logo: aradelLogo },
  { name: 'Karren Walters Attorneys', short: 'KWA', logo: karrenLogo },
  { name: 'Duale, Ovia & Alex-Adedipe', short: 'DOA', logo: doaLogo },
  { name: 'EKEDC', short: 'EK', logo: ekedcLogo },
]

// Split into two rows for the dual-direction marquee
const mid = Math.ceil(clients.length / 2)
const row1 = clients.slice(0, mid)
const row2 = clients.slice(mid)
</script>

<style scoped>
.marquee {
  width: 100%;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
  gap: 1.25rem;
  animation: marquee-scroll 40s linear infinite;
}

.marquee-track--reverse {
  animation-direction: reverse;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.client-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  flex: 0 0 auto;
  min-width: 14rem;
  height: 5rem;
  padding: 0 1.5rem;
  border-radius: 1rem;
  background: #ffffff;
  border: 1px solid #ede9fe;
  box-shadow: 0 4px 14px -6px rgba(76, 29, 149, 0.18);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.client-card:hover {
  transform: translateY(-4px);
  border-color: #c4b5fd;
  box-shadow: 0 12px 26px -10px rgba(76, 29, 149, 0.35);
}

/* Small logo badge */
.client-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  border-radius: 0.55rem;
  background: linear-gradient(135deg, #4c1d95, #7c3aed);
  color: #fde68a;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1;
  overflow: hidden;
}

/* Real brand marks sit on a clean white chip, a touch larger than monograms */
.client-logo--img {
  width: 2.75rem;
  height: 2.75rem;
  background: #ffffff;
  border: 1px solid #ede9fe;
  padding: 4px;
}

.client-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.client-name {
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.01em;
  text-align: center;
  white-space: nowrap;
  color: #4c1d95;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
  .marquee {
    overflow-x: auto;
  }
}
</style>
