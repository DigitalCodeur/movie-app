<template>
  <main>
    <div class="container mx-auto">
      <h2 class="p-20 text-4xl text-center md:text-5xl">Tendances <span v-if="time_window == 'week'"> de la
          semaine</span>
        <span v-else>du Jour</span>
      </h2>
      <div class="flex mb-10 text-2xl">
        <button class="pt-2 mx-5 border-blue-700 hover:text-blue-700" :class="{ 'border-b-4': time_window == 'week' }"
          @click="timeWindowWeek">
          Cette Semaine</button>
        <button class="pt-2 mx-5 border-blue-700 hover:text-blue-700" :class="{ 'border-b-4': time_window == 'day' }"
          @click="timeWindowDay">Aujourd'hui</button>
      </div>

      <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">

        <div v-for="tendance in tendances" :key="tendance.id">
          <div class="w-56 mx-auto my-5 shadow-xl rounded-2xl">
            <a href="#">
              <img :src="img_poster + tendance.poster_path" class="w-56 h-80 rounded-2xl" alt="">
              <div class="absolute top-0 w-full h-full p-2 bg-gradient-to-t from-gray-900 rounded-xl">
                <div class="text-center top-2/4">
                  <div class="flex w-16 my-2 ml-auto">
                    <img src="../assets/images/star.png" class="my-auto" alt="">
                    <p class="mx-2 text-lg text-yellow-400">{{ tendance.vote_average.toFixed(1) }}</p>
                  </div>
                  <p class="text-xl">{{ tendance.title }} {{ tendance.name }}
                    <span>({{ tendance.release_date }} {{ tendance.first_air_date }})</span>
                  </p>
                </div>
              </div>
              <div
                class="absolute top-0 w-full h-full p-2 opacity-0 backdrop-blur-sm bg-white/5 rounded-xl hover:opacity-100">
                <div class="top-0 ">
                  <p class="text-xl">{{ tendance.title }} {{ tendance.name }}
                    <span>({{ tendance.release_date }} {{ tendance.first_air_date }})</span>
                  </p>
                  <div class="flex justify-between my-5">
                    <p class="text-xl text-yellow-400">{{ tendance.media_type }}</p>
                    <div class="flex">
                      <img src="../assets/images/star.png" class="my-auto" alt="">
                      <p class="mx-2 text-xl text-yellow-400">{{ tendance.vote_average.toFixed(1) }}</p>
                    </div>
                  </div>
                  <p class="text-base text-justify">{{ tendance.overview.slice(0, 150) + '...' }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>

      <!-- Pagination -->

      <div class="flex justify-center my-10 text-center">
        <button @click="prev" :disabled="page === 1" :class="{ 'hover:bg-blue-700': page !== 1 }"
          class="px-2 pagination-class md:px-3">
          &lt;
        </button>

        <div v-if="totalPage > 50">
          <button @click="pagination(paginationNumber)" :class="{ 'bg-blue-700': page === paginationNumber }"
            v-for="paginationNumber in paginationNumbers" :key="paginationNumber.index"
            class="px-1 pagination-class md:px-3 hover:bg-blue-700">
            {{ paginationNumber }}
          </button>
        </div>

        <button @click="next" :disabled="page === 50" :class="{ 'hover:bg-blue-700': page !== 50 }"
          class="px-2 pagination-class md:px-3"> &gt;
        </button>
      </div>
    </div>
  </main>

</template>


<script>

export default {

  props: ['time_window', 'page', 'totalPage', 'paginationNumbers', 'img_poster', 'tendances', 'next', 'prev', 'pagination', 'timeWindowDay', 'timeWindowWeek'],

}
</script>