<template>
  <header>
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="false"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="tendance in listing" :key="tendance.id">
        <router-link
          :to="{
            name: 'Detail',
            params: { media: tendance.media_type, id: tendance.id },
          }"
        >
          <div class="bg-black">
            <img
              :src="img_backdrop + tendance.backdrop_path"
              class="w-full swiper-img"
              alt=""
            />
          </div>
          <div class="absolute w-3/5 p-5 md:mx-20 rounded-xl bottom-14">
            <p class="text-4xl text-shadow title-font">
              {{ tendance.title }} {{ tendance.name }}
            </p>
            <div class="flex my-5">
              <p class="text-2xl text-yellow-400 uppercase title-font">
                {{ tendance.media_type }}
              </p>
              <div class="flex ml-10">
                <img src="../assets/images/star.png" class="my-auto" alt="" />
                <p class="mx-2 my-auto text-xl text-yellow-400 title-font">
                  {{ tendance.vote_average.toFixed(1) }}
                </p>
              </div>
            </div>
            <p class="text-lg text-justify text-shadow">
              {{ tendance.overview.slice(0, 200) + "..." }}
            </p>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </header>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default {
  props: ["listing", "genresTv", "genresMovie", "img_backdrop"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>
