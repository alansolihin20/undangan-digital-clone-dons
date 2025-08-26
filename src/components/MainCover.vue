<template>
  <section class="w-full bg-couples bg-cover bg-center bg-no-repeat h-screen">
    <section class="container-section h-screen grid content-end">
      <div 
        class="animate__animated animate__fadeInUpBig text-gray-100 text-center bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-t-3xl px-6 py-10">
        <p>Pernikahan</p>
        <h1 class="tangerine-font text-title font-bold">{{ couples.join(' & ') }}</h1>
        <decoration class="fill-amber-400 mx-auto w-3/12 mb-3"></decoration>
        <p class="text-sm">
          <p class="font-medium">Kepada Bapak/Ibu Yang Terhormat</p>
          <p class="font-medium my-2 text-lg">
            {{ guestName }} <span v-if="partnerName"> & {{ partnerName }}</span>
          </p>
          <small>Izinkan kami turut mengundang anda dalam acara kami</small>
        </p>
      </div>
    </section>
  </section>
</template>

<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import decoration from '@/assets/svg/decoration-2.svg'

const couples = ['Iman', 'Widi']

const route = useRoute()

const guestName = computed(() => {
  return route.query.to || "Saudara/i"
})

const partnerName = computed(() => {
  return route.query.partner || ""
})
</script>
