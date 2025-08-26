<template>
  <section class="w-full mb-12">
    <wave class="fill-gray-800"></wave>
    <section class="container-section">
      <HeaderSection title="Bismillahirrahmanirrahim"></HeaderSection>
      <Card title="Kisah kami berawal dari">
        <template v-slot:body>
          <p class="text-sm p-6 leading-relaxed px-4 text-justify">
            Segala puji bagi Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon ridho dan rahmat-Nya, kami memulai ikatan suci ini. Semoga Allah jadikan rumah tangga kami sebagai tempat bernaung penuh keberkahan,
            cinta yang menguatkan iman, dan keturunan yang shalih-shalihah. Aamiin ya Rabbal Alamiin.
            <br /><br />
            Semoga Allah jadikan rumah tangga kami sebagai tempat bernaung penuh keberkahan, cinta yang menguatkan iman, dan keturunan yang shalih-shalihah. Aamiin ya Rabbal Alamiin.
          </p>
        </template>
        <template v-slot:footer>
          <img src="@/assets/images/galeri-7.jpg" class="w-full" alt="" />
        </template>
      </Card>
    </section>
  </section>
</template>

<script setup>
import HeaderSection from "@/components/HeaderSection.vue";
import Card from "@/components/Card.vue";
import wave from "@/assets/svg/wave.svg";
</script>
