<template>
  <div>
    <!-- Welcome Screen -->
    <section
      v-if="showWelcome"
      :class="['welcome-container', isOpenInvitation ? 'close-page' : 'animate__animated animate__fadeIn']"
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

        <div class="mt-5 animate__animated animate__zoomInUp">
          <p>{{ weddingDate }}</p>
          <h1 class="satisfy-font text-5xl lg:text-6xl my-4 text-blue-800">{{ couples.join(" & ") }}</h1>
          <p>Semoga menjadi pasangan yang dipertemukan oleh takdir hingga maut yang memisahkan</p>

          <section class="w-full text-center py-10">
            <h1 class="text-3xl font-bold text-green-700 animate-slide-up">Selamat Datang</h1>
            <p class="text-xl mt-2 animate-slide-up" style="animation-delay: 0.2s">
              {{ guestName }}
            </p>
          </section>
          <!-- Tombol -->
          <button
            type="button"
            @click="openInvitation"
            class="w-10/12 md:w-8/12 text-sm md-text-lg mt-12 font-medium z-50 border border-black-500 text-black-500 bg-light p-2 rounded-full pointer active:scale-90 hover:bg-blue-500 hover:text-gray-100 duration-300"
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

    <!-- Audio Player (hidden) -->
    <audio ref="bgMusic" loop>
      <source src="@/assets/music/wedding-song.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MainCover from "@/components/MainCover.vue";
import FirstSight from "@/components/FirstSight.vue";
import GroomBride from "@/components/GroomBride.vue";
import Timelines from "@/components/Timelines.vue";
import OurGallery from "@/components/OurGallery.vue";
import Envelope from "@/components/Envelope.vue";
import GuestBook from "@/components/GuestBook.vue";
import { useRoute } from "vue-router";

const couples = ref(["Iman", "Widi"]);
const weddingDate = ref("Sabtu, 13 September 2025");

const showWelcome = ref(true);
const isOpenInvitation = ref(false);

const bgMusic = ref(null);

const openInvitation = () => {
  isOpenInvitation.value = true;

  // Play music setelah undangan dibuka
  if (bgMusic.value) {
    bgMusic.value.play().catch((err) => {
      console.log("Autoplay diblokir, user harus klik:", err);
    });
  }
};

// Setelah animasi keluar selesai → hapus welcome
const animationEndHandler = () => {
  if (isOpenInvitation.value) {
    showWelcome.value = false;
  }
};

// Scroll handler
const navigationHandler = (id) => {
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
};

const route = useRoute();

const guestName = computed(() => {
  // Ambil dari query (?to=Alan)
  let name = route.query.to;

  // Kalau query tidak ada, coba ambil dari path param (/to/:name)
  if (!name && route.params.name) {
    name = route.params.name;
  }

  if (name) {
    return decodeURIComponent(name)
      .replace(/&/g, " & ")
      .replace(/[-_]/g, " ") // ganti - atau _ jadi spasi
      .replace(/\+/g, " ")
      .trim();
  }

  return "Tamu Undangan";
});
</script>

<style scoped>
.frame {
  @apply absolute w-6/12 md:w-4/12 z-0;
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
