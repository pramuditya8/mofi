import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = "https://iproject-mofi-production.up.railway.app";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    popularMovies: [],
    carouselData: [],
    movieDetails: {},
    shortUrl: "",
    nextPageLoad: true,
  }),
  getters: {},
  actions: {
    async fetchPopular(page) {
      try {
        const response = await axios({
          method: "get",
          url: baseUrl + "/movies/popular",
          params: {
            page,
          },
        });

        // console.log(response.data);
        // this.popularMovies = response.data;
        this.popularMovies.push(...response.data);
        console.log(this.popularMovies);
        this.nextPageLoad = false;
        // console.log(this.nextPageLoad);
      } catch (error) {
        // console.log(error);
      }
    },
    async fetchUpcoming() {
      try {
        const response = await axios({
          method: "get",
          url: baseUrl + "/movies/upcoming",
        });

        // console.log(response.data);
        this.carouselData = response.data;
      } catch (error) {
        // console.log(error);
      }
    },
    async fetchMovieDetails(params) {
      try {
        const response = await axios({
          method: "get",
          url: baseUrl + `/movies/${params.id}`,
        });

        this.movieDetails = response.data;
        // console.log(this.movieDetails);
      } catch (error) {
        // console.log(error);
      }
    },
    async generateShortUrl(data) {
      try {
        const response = await axios({
          method: "post",
          url: baseUrl + `/movies/shorturl`,
          data: {
            movieId: data.id,
          },
        });

        this.shortUrl = response.data.tiny_url;
        // console.log(response);
      } catch (error) {
        // console.log(error);
      }
    },
    async fetchShortUrl(params) {
      try {
        const response = await axios({
          method: "get",
          url: baseUrl + `/movies/shorturl/${params.id}`,
        });

        this.shortUrl = response.data.tinyUrl;
        // console.log(this.shortUrl);
      } catch (error) {
        // console.log(error);
      }
    },
  },
});
