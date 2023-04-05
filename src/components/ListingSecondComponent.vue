<template>
  <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
    <div v-for="tendance in listing" :key="tendance.id" class="my-5">
      <div class="h-full mx-auto shadow-xl md:w-56 w-80 rounded-2xl">
        <router-link
          :to="{
            name: 'Detail',
            params: { media: 'movie', id: tendance.id },
          }"
        >
          <img
            :src="img_poster + tendance.poster_path"
            class="h-full md:w-56 w-80 rounded-2xl"
            alt=""
          />
          <div
            class="absolute top-0 w-full h-full p-2 bg-gradient-to-t from-black rounded-xl"
          >
            <div class="text-center top-2/4">
              <div class="flex w-16 my-2 ml-auto">
                <img src="../assets/images/star.png" class="my-auto" alt="" />
                <p class="mx-2 text-lg text-yellow-400">
                  {{ tendance.vote_average.toFixed(1) }}
                </p>
              </div>
              <p class="text-xl">
                {{ tendance.title }} {{ tendance.name }}
                <span>({{ tendance.release_date }} {{ tendance.first_air_date }})</span>
              </p>
            </div>
          </div>
          <div
            class="absolute top-0 w-full h-full p-2 opacity-0 backdrop-blur-sm bg-white/5 rounded-xl hover:opacity-100"
          >
            <div class="top-0">
              <p class="text-xl">
                {{ tendance.title }} {{ tendance.name }}
                <span>({{ tendance.release_date }} {{ tendance.first_air_date }})</span>
              </p>
              <div class="flex justify-between my-5">
                <p class="text-xl text-yellow-400">
                  {{ tendance.media_type }}
                </p>
                <div class="flex">
                  <img src="../assets/images/star.png" class="my-auto" alt="" />
                  <p class="mx-2 text-xl text-yellow-400">
                    {{ tendance.vote_average.toFixed(1) }}
                  </p>
                </div>
              </div>
              <p class="text-base">
                {{ tendance.overview.slice(0, 150) + "..." }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <!-- Pagination -->

  <div class="flex justify-center my-10 text-center">
    <button
      @click="prev"
      :disabled="page === 1"
      :class="{ 'hover:bg-blue-700': page !== 1 }"
      class="px-3 pagination-class"
    >
      &lt;
    </button>

    <div v-if="totalPage > 50">
      <button
        @click="pagination(paginationNumber)"
        :class="{ 'bg-blue-700': page === paginationNumber }"
        v-for="paginationNumber in paginationNumbers"
        :key="paginationNumber.index"
        class="px-3 pagination-class hover:bg-blue-700"
      >
        {{ paginationNumber }}
      </button>
    </div>

    <button
      @click="next"
      :disabled="page === 50"
      :class="{ 'hover:bg-blue-700': page !== 50 }"
      class="px-3 pagination-class"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  props: [
    "page",
    "totalPage",
    "paginationNumbers",
    "img_poster",
    "listing",
    "next",
    "prev",
    "pagination",
  ],
};
</script>
