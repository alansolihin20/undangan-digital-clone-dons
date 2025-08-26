<template>
  <div>
    <!-- Welcome Screen -->
    <section
      v-if="showWelcome"
      :class="['welcome-container', isOpenInvitation ? 'close-page' : 'animate__animated animate__slideInUp']"
      @animationend="animationEndHandler"
      class="w-full h-screen bg-slate-100 fixed inset-0 grid place-items-center z-50 bg-texture bg-cover"
    >
      <!-- Frames -->
      <img class="frame top-0 left-0 animate__animated animate__fadeInLeft" src="@/assets/frame/frame3.png" alt="frame" />
      <img class="frame top-0 right-0 animate__animated animate__fadeInRight" src="@/assets/frame/frame-mirror.png" alt="frame" />
      <img class="frame bottom-0 right-0 rotate-180" src="@/assets/frame/frame3.png" alt="frame" />
      <img class="frame bottom-0 left-0 rotate-180" src="@/assets/frame/frame4.png" alt="frame" />

      <!-- Isi Welcome -->
      <div class="w-6/12 text-center text-xs md:text-lg lg:text-xl">
        <img src="@/assets/frame/frame.png" class="animate__animated animate__swing w-10/12 md:w-8/12 mx-auto" />

        <div class="mt-3 animate__animated animate__zoomInUp">
          <p>{{ weddingDate }}</p>
          <h1 class="satisfy-font text-5xl lg:text-6xl my-4 text-blue-800">{{ couples.join(" & ") }}</h1>
          <p>Semoga menjadi pasangan yang dipertemukan oleh takdir hingga maut yang memisahkan</p>

          <!-- Tampilkan Nama Tamu -->
          <section class="w-full text-center py-10">
            <h1 class="text-2xl satisfy-font text-blue-800 animate-slide-up">Kepada Bapak/Ibu</h1>
            <p class="font-medium my-2 text-xs">
              {{ guestName }} <span v-if="partnerName"> & {{ partnerName }}</span>
            </p>
          </section>

          <!-- Tombol -->
          <button
            type="button"
            @click="openInvitation"
            class="w-10/12 md:w-8/12 text-sm md-text-lg font-medium z-50 border border-black-500 text-black-500 bg-light p-2 rounded-full pointer active:scale-90 hover:bg-blue-600 hover:text-gray-100 duration-300"
          >
            <i class="fa-solid fa-book-open mr-1"></i>
            Buka undangan
          </button>
        </div>
      </div>
    </section>

    <!-- Konten Undangan -->
    <section v-if="!showWelcome" class="animate__animated animate__fadeIn">
      <MainCover id="mainCover" />
      <FirstSight />
      <GroomBride />
      <Timelines v-on:goToGuestBook="navigationHandler('#guest-book')" />
      <OurGallery />
      <Envelope id="envelope" />
      <GuestBook id="guest-book" />
    </section>

    <!-- Audio Player -->
    <audio ref="bgMusic">
      <source src="@/assets/audio/backsound.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useState } from "@/stores/state.js";
import MainCover from "@/components/MainCover.vue";
import FirstSight from "@/components/FirstSight.vue";
import GroomBride from "@/components/GroomBride.vue";
import Timelines from "@/components/Timelines.vue";
import OurGallery from "@/components/OurGallery.vue";
import Envelope from "@/components/Envelope.vue";
import GuestBook from "@/components/GuestBook.vue";
import "animate.css";
const couples = ref(["Iman", "Widi"]);
const weddingDate = ref("Sabtu, 13 September 2025");
import { useRoute } from "vue-router";

const state = useState();
const bgMusic = ref(null);
const isOpenInvitation = ref(false);
const showWelcome = ref(true);

const openInvitation = () => {
  isOpenInvitation.value = true;
  state.isAudioPlay = true; // Aktifkan musik global
  setTimeout(() => {
    showWelcome.value = false;
    if (bgMusic.value) {
      bgMusic.value.play().catch(() => console.log("Autoplay blocked"));
    }
  }, 800);
};

watch(
  () => state.isAudioPlay,
  (newVal) => {
    if (bgMusic.value) {
      if (newVal) {
        bgMusic.value.play().catch(() => console.log("Play error"));
      } else {
        bgMusic.value.pause();
      }
    }
  }
);

// Setelah animasi keluar selesai → hapus welcome
const animationEndHandler = () => {
  if (isOpenInvitation.value) {
    showWelcome.value = false;
  }
};

const route = useRoute();

const guestName = computed(() => {
  return route.query.to || "Saudara/i";
});

const partnerName = computed(() => {
  return route.query.partner || "";
});
// Scroll handler
const navigationHandler = (id) => {
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
.frame {
  @apply absolute w-6/12 md:w-4/12 z-0;
}

.slide-up-enter-active {
  transition: transform 0.8s ease;
}
.slide-up-enter-from {
  transform: translateY(50px);
}
.slide-up-enter-to {
  transform: translateY(0);
}

@keyframes backOutUp-custom {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  20% {
    transform: translateY(0) scale(0.7);
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100%) scale(0.7);
    opacity: 0;
  }
}

.close-page {
  animation: backOutUp-custom 0.8s ease forwards;
}
</style>
