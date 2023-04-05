<script setup>
import ListingComponent from "../components/ListingComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
</script>

<template>
  <main>
    <div class="container mx-auto">
      <h1 class="p-20 text-4xl text-center md:text-3xl">Resultats de la recherche: {{ this.search }}</h1>

      <ListingComponent
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
  props: ["search"],
  data() {
    return {
      img_poster: "https://www.themoviedb.org/t/p/w500",
      listing: [],
      page: undefined,
      totalPage: undefined,
    };
  },

  methods: {
    searchMovie: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=87ef0d000bb1818cfb178b93bd60f415&query=${this.search}&language=fr-FR&page=${this.page}`
        )
        .then((response) => {
          // console.log(Response.data);
          this.listing = response.data.results;
          this.totalPage = response.data.total_pages;

          if (this.page === 1) {
            this.n = this.page + 5;
            this.paginationNumbers = [];
          } else if (this.page === 2) {
            this.n = this.page + 3;
            this.paginationNumbers = [this.page - 1];
          } else if (this.page === 3) {
            this.n = this.page + 2;
            this.paginationNumbers = [this.page - 2, this.page - 1];
          } else if (this.page >= 4) {
            this.n = this.page + 2;
            this.paginationNumbers = [1, "...", this.page - 1];
          }

          for (let index = this.page; index < this.n && index < totalPage + 1; index++) {
            if (index >= this.page) {
              this.paginationNumbers.push(index);
            }
          }

          // if (this.page !== totalPage && this.page !== 49 && this.page !== totalPage) {
          //   this.paginationNumbers.push('...', 50);
          // } else if (this.page === 48) {
          //   this.paginationNumbers.push(50);
          // }
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
    this.searchMovie();
  },
};
</script>
