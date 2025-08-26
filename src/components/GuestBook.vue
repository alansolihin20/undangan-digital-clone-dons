<style scoped>
.frame {
  @apply w-4/12 rotate-180;
}

.input-wrapper {
  @apply w-full flex flex-wrap gap-1 mb-3;
}

label {
  @apply w-full text-gray-600 font-medium;
}

input,
textarea,
select,
option {
  @apply w-full px-2 py-3 rounded-lg bg-gray-800 border border-gray-100 shadow-lg duration-300 focus:border-gray-500 text-gray-200 placeholder:text-gray-400;
}

.message-box {
  @apply w-10/12 mx-auto mt-8 bg-white p-4 rounded-lg shadow-md;
}

.message-item {
  @apply border-b border-gray-200 py-2;
}
</style>

<template>
  <section class="w-full bg-slate-100 pt-5">
    <section class="container-section bg-slate-100">
      <HeaderSection title="Buku Tamu" subtitle="Demi kelancaran acara dimohon untuk para tamu undangan untuk memastikan kehadirannya pada acara kami" />

      <!-- Form -->
      <form ref="form" @submit="sendMessage" class="w-10/12 mx-auto mt-6">
        <!-- Alert -->
        <Alert :statusResponse="statusResponse" :showAlert="showAlert" v-on:close="showAlert = false" />

        <!-- Guest Name -->
        <div class="input-wrapper" data-aos="zoom-in">
          <label for="GuestName">Nama</label>
          <input v-model="GuestName" placeholder="Nama lengkap anda" name="GuestName" id="GuestName" type="text" required />
        </div>

        <!-- Guest Status -->
        <div class="input-wrapper" data-aos="zoom-in">
          <label for="GuestStatus">Kehadiran</label>
          <select v-model="GuestStatus" name="GuestStatus" id="GuestStatus" required>
            <option value="Hadir">Hadir</option>
            <option value="Tidak Hadir">Tidak Hadir</option>
          </select>
        </div>

        <!-- Guest Message -->
        <div class="input-wrapper" data-aos="zoom-in">
          <label for="GuestMessage">Pesan</label>
          <textarea placeholder="Tuliskan pesan anda disini" v-model="GuestMessage" name="GuestMessage" id="GuestMessage" cols="30" rows="5" required></textarea>
        </div>

        <!-- Submit -->
        <button data-aos="zoom-in" class="w-full bg-gray-800 text-gray-100 mt-6 rounded-lg py-2 font-medium pointer active:scale-90 hover:border border-gray-500 hover:bg-gray-100 hover:text-blue-500 duration-300" type="submit">
          <i class="fa fa-paper-plane mr-1"></i>
          Kirim pesan
        </button>
      </form>

      <!-- ✅ Message List -->
      <!-- <div class="message-box" v-if="messages.length > 0">
        <h3 class="text-lg font-semibold mb-3">Pesan Tamu</h3>
        <div v-for="(msg, index) in messages" :key="index" class="message-item">
          <p class="font-bold">
            {{ msg.name }} <span class="text-sm text-gray-500">({{ msg.status }})</span>
          </p>
          <p class="text-gray-700">{{ msg.message }}</p>
        </div>
      </div> -->

      <section class="w-10/12 mx-auto mt-6">
        <p>{{ messages.length }} Pesan Tamu</p>
      </section>
      <section style="max-height: 400px" class="w-10/12 mt-5 mx-auto overflow-scroll">
        <template v-for="(msg, index) in messages" :key="index" class="message-item">
          <div class="w-full mb-5 border-b-2 border-gray-900 pb-1">
            <span class="flex gap-2 items-center">
              <p class="kalam-font text-gray-900 text-xl">{{ msg.name }}</p>
              <span class="py-1 px-2 bg-gray-600 text-gray-100 rounded-lg text-xxs">{{ msg.status ? "Hadir" : "Tidak Hadir" }}</span>
            </span>
            <p class="font-medium text-xs mt-2">Pada {{ msg.timestamp }}</p>
            <p class="text-sm">{{ msg.message }}</p>
          </div>
        </template>
      </section>

      <div class="w-full text-center pb-12 mt-12">
        <p class="text-sm text-amber-600 font-medium">Diundang &copy; 2025</p>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import HeaderSection from "@/components/HeaderSection.vue";
import Alert from "@/components/Alert.vue";

const form = ref(null);
const GuestName = ref(null);
const GuestMessage = ref(null);
const GuestStatus = ref("Hadir");
const statusResponse = ref(false);
const showAlert = ref(false);

// ✅ Messages list
const messages = ref([]);

// ✅ Google Apps Script URL
const scriptURL = "https://script.google.com/macros/s/AKfycbxNG6JvPxVIvCR0hNia8KIvfiQZZGOrt0agi2buljrQCQr6BXeMtJ4wl-qrrMljLBFMCQ/exec";
const sheetJSON = "https://docs.google.com/spreadsheets/d/1LINKv0KaAyApaiOYAHa27gGs6a7Q17p63y_Z7hb-wjo/gviz/tq?tqx=out:json";

// ✅ Send Message
const sendMessage = (evt) => {
  evt.preventDefault();

  fetch(scriptURL, { method: "POST", body: new FormData(form.value) })
    .then(() => {
      statusResponse.value = true;
      showAlert.value = true;
      // ✅ Reset form
      GuestMessage.value = "";
      GuestStatus.value = "Hadir";
      // ✅ Refresh messages
      setTimeout(fetchMessages, 1000);
    })
    .catch(() => {
      statusResponse.value = false;
      showAlert.value = true;
    });
};

// ✅ Fetch messages from Google Sheet
const fetchMessages = async () => {
  try {
    const res = await fetch(sheetJSON);
    const text = await res.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    messages.value = rows
      .map((r) => ({
        name: r.c[0]?.v || "",
        status: r.c[1]?.v || "",
        message: r.c[2]?.v || "",
      }))
      .filter((m) => m.name && m.message);
  } catch (err) {
    console.error("Error fetching messages:", err);
  }
};

// ✅ Auto load messages
onMounted(fetchMessages);

// ✅ Autofill name from query string
const route = useRoute();
if (route.query.to) GuestName.value = route.query.to;
</script>
