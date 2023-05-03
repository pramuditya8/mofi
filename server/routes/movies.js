const express = require("express");
const MovieController = require("../controllers/MovieController");
const router = express.Router();

router.get("/movies/upcoming", MovieController.getUpcoming);
router.get("/movies/popular", MovieController.getPopular);
router.get("/movies/:id", MovieController.getMovieDetails);
router.get("/movies/shorturl/:id", MovieController.getShortUrl);
router.post("/movies/shorturl", MovieController.createTinyUrl);

module.exports = router;
