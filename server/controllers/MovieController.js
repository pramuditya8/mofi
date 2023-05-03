const axios = require("axios");
const TMDB = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_KEY;
const { ShortUrl } = require("../models");

class MovieController {
  static async getUpcoming(req, res) {
    try {
      const upcoming = await axios({
        method: "get",
        url: TMDB + "/movie/upcoming",
        params: {
          api_key: API_KEY,
        },
      });

      let data = [];

      for (let i = 0; i < 5; i++) {
        data.push(upcoming.data.results[i]);
      }

      const upcomingData = data.map((e) => {
        e.backdrop_path = "https://image.tmdb.org/t/p/w1280" + e.backdrop_path;
        return e;
      });

      res.status(200).json(upcomingData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getPopular(req, res) {
    try {
      const { page } = req.query;
      const popular = await axios({
        method: "get",
        url: TMDB + "/movie/popular",
        params: {
          api_key: API_KEY,
          page,
        },
      });

      const data = popular.data.results.map((e) => {
        e.poster_path = "https://image.tmdb.org/t/p/w780" + e.poster_path;
        return e;
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMovieDetails(req, res) {
    try {
      const { id } = req.params;

      const popular = await axios({
        method: "get",
        url: TMDB + `/movie/${id}`,
        params: {
          api_key: API_KEY,
        },
      });

      const video = await axios({
        method: "get",
        url: TMDB + `/movie/${id}/videos`,
        params: {
          api_key: API_KEY,
        },
      });

      let url;
      if (video.data.results.length === 0) {
        url = "";
      } else {
        url = video.data.results[0].key;
      }

      const data = {
        ...popular.data,
        film: "https://www.youtube.com/embed/" + url,
      };

      res.status(200).json(data);
    } catch (error) {
      if (error.response.data.status_code === 34) {
        res.status(404).json({ message: error.response.data.status_message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async createTinyUrl(req, res) {
    const { movieId } = req.body;

    const movie = await ShortUrl.findOne({ where: { MovieId: movieId } });
    if (movie) {
      res.status(400).json({ message: "Short Url already available" });
      return;
    }

    const reqBody = {
      url: `https://iproject-mofi.web.app/movie/watch/${movieId}`,
      domain: "tinyurl.com",
      alias: `abcd-${movieId}`,
    };

    const response = await axios.post(
      `https://api.tinyurl.com/create`,
      reqBody,
      {
        params: {
          api_token: process.env.TINYURL_KEY,
        },
      }
    );

    await ShortUrl.create({
      MovieId: movieId,
      tinyUrl: response.data.data.tiny_url,
      url: response.data.data.url,
    });

    res.status(201).json(response.data.data);
  }

  static async getShortUrl(req, res) {
    try {
      const { id } = req.params;
      const shortUrl = await ShortUrl.findOne({ where: { MovieId: id } });
      if (!shortUrl) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      res.status(200).json(shortUrl);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = MovieController;
