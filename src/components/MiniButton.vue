<style scoped>
.button {
  @apply bg-gray-600 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-full text-lg grid place-items-center left-3 text-amber-400 z-50 mb-2;
  height: 40px;
  width: 40px;
}
</style>

<template>
  <section class="fixed bottom-24 pl-2">
    <button class="button" @click="toggleAudio">
      <i v-if="!isAudioPlay" class="fa-solid fa-volume-off"></i>
      <i v-else class="fa-solid fa-volume-high"></i>
    </button>
    <button @click="giftAction" class="button">
      <i class="fa-solid fa-gift"></i>
    </button>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useState } from "@/stores/state.js";

const state = useState();
const isAudioPlay = computed(() => state.isAudioPlay);

const toggleAudio = () => {
  state.isAudioPlay = !state.isAudioPlay;
};

const giftAction = () =>
  setTimeout(() => {
    document.querySelector("#envelope").scrollIntoView({ behavior: "smooth" });
  }, 300);
</script>
