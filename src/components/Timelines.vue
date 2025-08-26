<style scoped>
.btn {
  @apply active:scale-95 active:ring-gray-200 active:ring duration-300 rounded-3xl px-3 py-2 text-amber-500 bg-gray-800 inline-block w-10/12 mt-4;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

<template>
  <section class="w-full bg-gradient-to-b from-gray-700 to-gray-600">
    <section class="container-section pb-12">
      <HeaderSection text-color="text-gray-100" subtitle="Dengan tidak mengurangi rasa hormat, kami mengajak para tamu undangan agar bisa berhadir pada serangkaian acara kami" title="Runtutan Acara"></HeaderSection>
      <Card>
        <template v-slot:body>
          <div class="bg-gray-900 px-6 py-8 text-center text-sm font-medium" v-for="(timeline, index) in timelines" :key="index">
            <section data-aos="fade-up">
              <h1 class="text-xl satisfy-font text-amber-400">{{ timeline.title }}</h1>
              <p class="font-medium text-gray-100">{{ timeline.date }} | {{ timeline.time }}</p>
              <decoration class="w-2/12 mx-auto my-2 fill-amber-500"></decoration>
              <p class="text-amber-500">{{ timeline.location }}</p>
              <p class="text-gray-200">{{ timeline.address }}</p>
              <a class="btn" href="javascript:void(0)" @click="openMap(timeline)">
                <i class="fa-solid fa-map"></i>
                Lihat Peta
              </a>
              <decoration class="w-2/12 mx-auto my-2 fill-amber-500 rotate-180"></decoration>
            </section>
            <div v-if="showMap" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div class="bg-white rounded-2xl w-11/12 md:w-3/4 lg:w-1/2 p-4 relative">
                <button @click="closeMap" class="absolute top-2 right-3 text-gray-500 text-2xl">&times;</button>
                <h2 class="text-lg font-semibold mb-3">{{ selectedTimeline.title }} - {{ selectedTimeline.location }}</h2>
                <iframe width="100%" height="300" style="border: 0" :src="mapEmbedUrl" allowfullscreen loading="lazy"> </iframe>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <section class="bg-gray-900">
            <Countdown></Countdown>
            <!-- Button to Guest Book -->
            <div class="px-6 pt-5 pb-8 text-center">
              <p class="text-sm text-gray-100">Konfirmasi kehadiran anda pada buku tamu</p>
              <button @click="goToGuestBook" class="btn">
                <i class="fa-solid fa-clipboard-check"></i>
                Konfirmasi
              </button>
            </div>
            <img src="@/assets/images/couples2.jpg" alt="" />
          </section>
        </template>
      </Card>
    </section>
  </section>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import HeaderSection from "@/components/HeaderSection.vue";
import Card from "@/components/Card.vue";
import Countdown from "@/components/Countdown.vue";
import decoration from "@/assets/svg/decoration-2.svg";

const timelines = ref(null);
onMounted(() => {
  axios
    .get("contents/timelines.json")
    .then((res) => (timelines.value = res.data.timelines))
    .catch((err) => alert(err));
});

// Handler for navigate to guest book
const emits = defineEmits(["goToGuestBook"]);

const goToGuestBook = () =>
  setTimeout(() => {
    emits("goToGuestBook");
  }, 300);

const showMap = ref(false);
const selectedTimeline = ref({});
const mapEmbedUrl = ref("");

const openMap = (timeline) => {
  selectedTimeline.value = timeline;
  mapEmbedUrl.value = `https://www.google.com/maps?q=${encodeURIComponent(timeline.address)}&output=embed`;
  showMap.value = true;
};

const closeMap = () => {
  showMap.value = false;
};
</script>
