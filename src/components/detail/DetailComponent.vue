<template>
  <main>
    <div>
      <img
        :src="img_backdrop + detail.backdrop_path"
        class="w-full lg:h-img-detail"
        alt=""
      />
    </div>
    <section class="container mx-auto">
      <div class="grid-cols-3 my-10 md:grid">
        <div>
          <img
            :src="img_poster + detail.poster_path"
            class="w-10/12 h-full mx-auto shadow-2xl shadow-black rounded-3xl"
            alt=""
          />
        </div>
        <div class="col-span-2 px-3">
          <h1 class="text-4xl text-yellow-400">{{ detail.title }} {{ detail.name }}</h1>
          <p class="my-3 text-xl">{{ detail.release_date }}</p>
          <div class="flex">
            <div v-for="genre in detail.genres" :key="genre.id">
              <p class="my-3 text-2xl">{{ genre.name + " , " }}</p>
            </div>
          </div>
          <p class="my-3 text-2xl text-yellow-400 uppercase title-font">{{ media }}</p>
          <div class="flex my-3">
            <img src="../../assets/images/star.png" class="my-auto" alt="" />
            <p class="mx-3 text-2xl text-yellow-400 title-font">
              {{ detail.vote_average }}
            </p>
          </div>
          <p class="my-3 text-xl italic text-gray-400 title-font">{{ detail.tagline }}</p>
          <p class="my-4 text-3xl text-yellow-400">Synopsis</p>
          <p class="text-lg text-justify">{{ detail.overview }}</p>
        </div>
      </div>
    </section>
    <section class="py-20 my-20 bg-black" v-show="video != ''">
      <iframe class="mx-auto video md:video-md lg:video-lg" :src="video_url + video">
      </iframe>
    </section>

    <!-- actors Headliners -->

    <section class="container mx-auto">
      <h2 class="my-20 text-5xl text-center">Têtes d'affiche</h2>

      <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
        <div v-for="cast in casts" :key="cast.id" v-show="cast.profile_path">
          <div>
            <div class="w-56 mx-auto my-5 shadow-xl rounded-2xl">
              <img
                :src="img_poster + cast.profile_path"
                class="w-56 h-80 rounded-2xl"
                alt=""
              />

              <div
                class="absolute top-0 w-full h-full p-2 opacity-0 rounded-xl hover:opacity-100"
              >
                <div class="p-1 rounded bg-black/70 top-44">
                  <p class="text-2xl">{{ cast.name }}</p>
                  <p class="text-2xl text-yellow-500">{{ cast.character }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  props: ["media", "detail", "img_backdrop", "img_poster", "video", "video_url", "casts"],
};
</script>
