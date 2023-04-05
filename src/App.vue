<template>
  <nav class="fixed top-0 z-10 w-full bg-opacity-50 bg-neutral-900">
    <div class="container justify-between mx-auto lg:flex">
      <div class="flex justify-around my-auto lg:w-4/12 xl:w-5/12 lg:justify-start">
        <router-link
          to="/"
          class="text-2xl hover:text-blue-500 title-font"
          @click="type = 'home'"
          :class="{ 'text-blue-500': this.type == 'home' }"
          >MOVIE APP</router-link
        >
        <div class="block lg:hidden">
          <button
            @click="menuVisible = !menuVisible"
            class="flex items-center px-3 py-2 mx-3 text-white border border-white rounded"
            id="click-menu"
          >
            <svg
              class="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="w-full lg:flex" :class="{ hidden: menuVisible === false }">
        <div class="my-auto">
          <ul class="text-xl lg:flex">
            <li class="mx-5 my-4 lg:my-0 hover:text-blue-500">
              <router-link
                to="/"
                class="title-font"
                @click="type = 'home'"
                :class="{ 'text-blue-500': this.type == 'home' }"
                >Accueil</router-link
              >
            </li>
            <li class="mx-5 my-4 lg:my-0 hover:text-blue-500">
              <router-link
                :to="{ name: 'Genre', params: { genre: 'movie' } }"
                class="title-font"
                @click="type = 'movie'"
                :class="{ 'text-blue-500': this.type == 'movie' }"
                >Films</router-link
              >
            </li>
            <li class="mx-5 my-4 lg:my-0 hover:text-blue-500">
              <router-link
                :to="{ name: 'Genre', params: { genre: 'tv' } }"
                class="title-font"
                @click="type = 'tv'"
                :class="{ 'text-blue-500': this.type == 'tv' }"
                >Series</router-link
              >
            </li>
            <li class="mx-5 my-4 lg:my-0 hover:text-blue-500">
              <router-link
                to="/upcoming"
                class="title-font"
                @click="type = 'upcoming'"
                :class="{ 'text-blue-500': this.type == 'upcoming' }"
                >A venir</router-link
              >
            </li>
          </ul>
        </div>
        <div
          class="w-10 p-2 my-4 ml-5 bg-black lg:ml-auto lg:my-0 rounded-3xl"
          v-show="!searchVisible"
          @click="searchVisible = !searchVisible"
        >
          <a href="#" class="my-auto">
            <img src="./assets/images/loupe.png" alt="Recherche" />
          </a>
        </div>
        <form
          v-on:submit="searchMovie"
          method="get"
          class="flex w-full py-2 my-4 ml-auto bg-black rounded-md lg:my-0 xl:w-5/12 lg:w-4/12"
          v-show="searchVisible"
        >
          <input
            type="search"
            v-model="search"
            class="w-full px-2 py-3 mx-2 text-lg text-white bg-inherit focus:outline-none sm:py-0"
            placeholder="Recherche..."
            autocomplete="off"
            id="search"
          />
          <button
            type="submit"
            title="Recherche"
            @click="searchVisible = !searchVisible"
            class="px-3"
          >
            <img src="./assets/images/loupe.png" alt="Recherche" />
          </button>
        </form>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>
<script>
export default {
  data() {
    return {
      searchVisible: false,
      menuVisible: false,
      search: undefined,
      type: undefined,
    };
  },
  methods: {
    searchMovie: function (search) {
      this.$router.push({ name: "Search", params: { search: this.search } });
    },
  },
};
</script>
