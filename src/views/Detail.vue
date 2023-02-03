<script setup>
import DetailComponent from '../components/detail/DetailComponent.vue'
import FooterComponent from '../components/FooterComponent.vue';
</script>

<template>
  <DetailComponent :media="media" :detail="detail" :img_backdrop="img_backdrop" :img_poster="img_poster"
    :video_url="video_url" :video="video" />
  <FooterComponent />
</template>

<script>
import axios from 'axios'

export default {

  props: ['media', 'id'],
  data() {
    return {
      img_backdrop: "https://www.themoviedb.org/t/p/original",
      img_poster: "https://www.themoviedb.org/t/p/w500",
      video_url: "https://www.youtube.com/embed/",
      detail: [],
      video: [],
    }
  },

  methods: {
    getDetail: function () {
      axios.get(`https://api.themoviedb.org/3/${this.media}/${this.id}?api_key=87ef0d000bb1818cfb178b93bd60f415&language=fr-FR`)
        .then(Response => {
          // console.log(Response.data);
          this.detail = Response.data;
        });
    },

    getVideo: function () {
      axios.get(`https://api.themoviedb.org/3/${this.media}/${this.id}/videos?api_key=87ef0d000bb1818cfb178b93bd60f415&language=fr-FR`)
        .then(Response => {
          // console.log(Response.data);
          this.video = Response.data.results[0].key;
        });
    }

  },

  mounted() {
    this.getDetail();
    this.getVideo();
  },
}
</script>