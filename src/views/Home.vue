<script setup>
import HomeComponent from '../components/HomeComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue';
</script>

<template>
  <HeaderComponent :tendances="tendances" :img_backdrop="img_backdrop" :genresTv="genresTv"
    :genresMovie="genresMovie" />

  <HomeComponent :time_window="time_window" :page="page" :totalPage="totalPage" :paginationNumbers="paginationNumbers"
    :img_poster="img_poster" :tendances="tendances" :next="next" :prev="prev" :pagination="pagination"
    :timeWindowDay="timeWindowDay" :timeWindowWeek="timeWindowWeek" />

  <FooterComponent />
</template>


<script>

import axios from 'axios'

export default {
  data() {
    return {
      time_window: '',
      page: undefined,
      totalPage: undefined,
      genre_id: undefined,
      genresTv: [],
      genresMovie: [],
      n: undefined,
      paginationNumbers: [],
      img_backdrop: "https://www.themoviedb.org/t/p/original",
      img_poster: "https://www.themoviedb.org/t/p/w220_and_h330_face",
      tendances: [],

    }
  },

  methods: {

    getTendance: function () {
      axios.get(`https://api.themoviedb.org/3/trending/all/${this.time_window}?api_key=87ef0d000bb1818cfb178b93bd60f415&language=fr-FR&page=${this.page}`)
        .then(response => {
          // console.log(response.data);
          this.tendances = response.data.results;
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
            this.paginationNumbers = [1, '...', this.page - 1];
          }

          for (let index = this.page; index < this.n && index < 51; index++) {
            if (index >= this.page) {
              this.paginationNumbers.push(index);
            }
          }

          if (this.page !== 48 && this.page !== 49 && this.page !== 50) {
            this.paginationNumbers.push('...', 50);
          } else if (this.page === 48) {
            this.paginationNumbers.push(50);
          }
        })
    },

    getGenre: function () {
      axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=87ef0d000bb1818cfb178b93bd60f415&language=fr-FR`)
        .then(res => {
          res.data.genres.forEach(e => {
            this.genresTv.push(e);
          });
        });

      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=87ef0d000bb1818cfb178b93bd60f415&language=fr-FR`)
        .then(res => {
          res.data.genres.forEach(e => {
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

    timeWindowDay: function () {
      this.time_window = 'day';
      this.getTendance();
    },

    timeWindowWeek: function () {
      this.time_window = 'week';
      this.getTendance();
    },

    pagination: function (paginationNumber) {
      if (paginationNumber !== '...') {
        this.page = paginationNumber;
        this.paginationNumbers = [];
        this.getTendance();
      }
    },

  },

  mounted() {
    this.page = 1;
    this.n = this.page + 5;
    this.time_window = 'week';
    this.getGenre();
    this.getTendance();
  },
}
</script>

