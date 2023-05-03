const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/oauth/discord-login", UserController.discordLogin);
router.patch("/upgrade", authentication, UserController.upgrade);
router.post(
  "/generate-midtrans-token",
  authentication,
  UserController.generateMidtransToken
);

module.exports = router;
