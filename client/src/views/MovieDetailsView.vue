<template lang="">
  <div class="container" style="margin-top: 56px">
    <div id="card" class="col-12">
      <div class="card" style="background-color: black">
        <img
          id="card-img"
          :src="`https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}`"
          class="card-img"
          style="width: 100%; height: 90%; object-fit: contain; opacity: 0.3"
        />
        <div class="card-img-overlay text-white d-flex align-items-center m-5">
          <div id="card" class="col col-6 col-sm-6 col-md-3 me-5">
            <div class="card" style="background-color: black">
              <img
                id="card-img"
                class="card-img"
                :src="`https://image.tmdb.org/t/p/w780/${movieDetails.poster_path}`"
                style="width: 100%; height: 100%; object-fit: contain"
              />
              <div class="card-img-overlay text-white d-flex align-items-end">
                <h5 class="card-title"></h5>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column d-none d-xl-flex">
            <h1 class="card-title">
              {{ movieDetails.title }}
            </h1>
            <p class="card-text mb-5" style="opacity: 0.7">
              {{ movieDetails.tagline }}
            </p>
            <h4 class="card-title">Overview</h4>
            <p class="card-text" style="opacity: 0.7">
              {{ movieDetails.overview }}
            </p>
            <p>
              <button
                class="btn btn-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Share
              </button>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body text-dark">
                {{ url }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column text-white d-xl-none mt-5">
      <h1 class="card-title">
        {{ movieDetails.title }}
      </h1>
      <p class="card-text mb-5" style="opacity: 0.7">
        {{ movieDetails.tagline }}
      </p>
      <h4 class="card-title">Overview</h4>
      <p class="card-text" style="opacity: 0.7">
        {{ movieDetails.overview }}
      </p>
      <p>
        <button
          class="btn btn-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Share
        </button>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body text-dark">
          {{ url }}
        </div>
      </div>
    </div>
    <div
      style="height: 720px; margin-top: 100px; margin-bottom: 300px"
      v-if="isPremium === true"
    >
      <h1 class="text-white my-5">WATCH NOW</h1>
      <iframe
        :src="movieDetails.film"
        class="w-100"
        style="height: 100%"
        allowfullscreen
      ></iframe>
    </div>
    <div
      style="height: 250px; margin-top: 100px; margin-bottom: 300px"
      v-if="isPremium === false"
    >
      <h1 class="text-white my-5">WATCH NOW</h1>
      <p class="text-white">
        You need to be Premium to watch the movie
        <RouterLink to="/upgrade-to-premium/pricing">Go Premium</RouterLink>
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useMoviesStore } from "../stores/movies";
import { useUsersStore } from "../stores/users";

export default {
  data() {
    return {
      url: "",
    };
  },
  computed: {
    ...mapState(useMoviesStore, ["movieDetails", "shortUrl"]),
    ...mapState(useUsersStore, ["isPremium"]),
  },
  methods: {
    ...mapActions(useMoviesStore, [
      "fetchMovieDetails",
      "generateShortUrl",
      "fetchShortUrl",
    ]),
  },
  created() {
    this.fetchMovieDetails(this.$route.params);
    this.generateShortUrl(this.$route.params);
    this.fetchShortUrl(this.$route.params);
  },
  watch: {
    shortUrl: {
      handler(value) {
        this.url = value;
      },
    },
  },
};
</script>
<style lang=""></style>
