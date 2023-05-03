<template>
  <header class="container" style="margin-top: 56px">
    <Carousel :carouselData="carouselData" />
  </header>

  <div class="container mt-5">
    <div class="row gx-4 gy-4">
      <h1 class="text-white">Current Popular</h1>
      <Card v-for="movie in popularMovies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Carousel from "../components/Carousel.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMoviesStore } from "../stores/movies";

export default {
  components: {
    Card,
    Carousel,
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState(useMoviesStore, ["popularMovies", "carouselData"]),
    ...mapWritableState(useMoviesStore, ["nextPageLoad", "popularMovies"]),
  },
  methods: {
    ...mapActions(useMoviesStore, ["fetchPopular", "fetchUpcoming"]),
  },
  created() {
    this.page = 1;
    this.popularMovies = [];
    this.fetchPopular(this.page);
    this.fetchUpcoming();
    window.onscroll = () => {
      if (
        window.scrollY + window.innerHeight >= document.body.scrollHeight &&
        !this.nextPageLoad &&
        this.$route.name === "home"
      ) {
        this.page++;
        this.fetchPopular(this.page);
        this.nextPageLoad = true;
      }
    };
  },
};
</script>
