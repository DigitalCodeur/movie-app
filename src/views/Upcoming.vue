<script setup>
import ListingComponent from "../components/ListingComponent.vue";
import ListingSecondComponent from "../components/ListingSecondComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
</script>

<template>
  <!-- <HeaderComponent
    :listing="listing"
    :img_backdrop="img_backdrop"
    :genresTv="genresTv"
    :genresMovie="genresMovie"
  /> -->

  <main>
    <div class="container mx-auto">
      <h2 class="p-20 text-4xl text-center md:text-5xl">Film à venir</h2>
      <ListingSecondComponent
        :page="page"
        :totalPage="totalPage"
        :paginationNumbers="paginationNumbers"
        :img_poster="img_poster"
        :listing="listing"
        :next="next"
        :prev="prev"
        :pagination="pagination"
      />
    </div>
  </main>

  <FooterComponent />
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      page: undefined,
      totalPage: undefined,
      genre_id: undefined,
      genresTv: [],
      genresMovie: [],
      n: undefined,
      paginationNumbers: [],
      img_backdrop: "https://www.themoviedb.org/t/p/original",
      img_poster: "https://www.themoviedb.org/t/p/w220_and_h330_face",
      listing: [],
      key: "87ef0d000bb1818cfb178b93bd60f415",
    };
  },

  methods: {
    getTendance: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=fr-FR&page=${this.page}`
        )
        .then((response) => {
          // console.log(response.data);
          this.listing = response.data.results;
          this.totalPage = response.data.total_pages;

          if (this.page === 1) {
            this.n = this.page + 3;
            this.paginationNumbers = [];
          } else if (this.page === 2) {
            this.n = this.page + 2;
            this.paginationNumbers = [this.page - 1];
          } else if (this.page === 3) {
            this.n = this.page + 2;
            this.paginationNumbers = [this.page - 2, this.page - 1];
          } else if (this.page >= 4) {
            this.n = this.page + 2;
            this.paginationNumbers = [1, "..."];
          }

          for (let index = this.page; index < this.n && index < 51; index++) {
            if (index >= this.page) {
              this.paginationNumbers.push(index);
            }
          }

          if (this.page !== 48 && this.page !== 49 && this.page !== 50) {
            this.paginationNumbers.push("...", 50);
          } else if (this.page === 48) {
            this.paginationNumbers.push(50);
          }
        });
    },

    getGenre: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${this.key}&language=fr-FR`
        )
        .then((res) => {
          res.data.genres.forEach((e) => {
            this.genresTv.push(e);
          });
        });

      axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=fr-FR`
        )
        .then((res) => {
          res.data.genres.forEach((e) => {
            this.genresMovie.push(e);
          });
        });
    },

    next: function () {
      this.page++;
      this.getTendance();
    },

    prev: function () {
      if (this.page !== 1) {
        this.page--;
        this.getTendance();
      }
    },

    pagination: function (paginationNumber) {
      if (paginationNumber !== "...") {
        this.page = paginationNumber;
        this.paginationNumbers = [];
        this.getTendance();
      }
    },
  },

  mounted() {
    this.page = 1;
    this.n = this.page + 5;
    this.getGenre();
    this.getTendance();
  },
};
</script>
