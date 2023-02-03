<template>
  <main>
    <div>
      <img :src="img_backdrop + detail.backdrop_path" class="w-full lg:h-img-detail" alt="">
    </div>
    <div class="container mx-auto">
      <div class="grid-cols-3 my-10 md:grid">
        <div>
          <img :src="img_poster + detail.poster_path" class="w-10/12 h-full px-2 mx-auto rounded-lg" alt="">
        </div>
        <div class="col-span-2 px-3">
          <h1 class="text-4xl text-yellow-400">{{ detail.title }} {{ detail.name }}</h1>
          <p class="my-3 text-xl">{{ detail.release_date }}</p>
          <div class="flex">
            <div v-for="genre in detail.genres" :key="genre.id">
              <p class="my-3 text-2xl"> {{ genre.name + ' , ' }}</p>
            </div>
          </div>
          <p class="my-3 text-2xl text-yellow-400">{{ media }}</p>
          <div class="flex my-3">
            <img src="../../assets/images/star.png" class="my-auto" alt="">
            <p class="mx-3 text-2xl text-yellow-400">{{ detail.vote_average }}</p>
          </div>
          <p class="my-3 text-xl italic text-gray-400">{{ detail.tagline }}</p>
          <p class="my-4 text-3xl text-yellow-400">Synopsis</p>
          <p class="text-lg text-justify">{{ detail.overview }}</p>
        </div>
      </div>
    </div>
    <div class="py-20 my-20 bg-black" v-show="video != ''">
      <iframe class="mx-auto video md:video-md lg:video-lg" :src="video_url + video">
      </iframe>
    </div>
  </main>
</template>

<script>
export default {
  props: ['media', 'detail', 'img_backdrop', 'img_poster', 'video', 'video_url'],
}
</script>