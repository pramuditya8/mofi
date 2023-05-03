const { User } = require("../models");
const { hash, compare } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const axios = require("axios");
const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");

const discord =
  "https://discord.com/api/oauth2/authorize?client_id=1092810792748994621&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fdiscord-login&response_type=code&scope=identify%20email";

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const user = await User.create({ username, email, password });

      res
        .status(201)
        .json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((e) => {
          return { path: e.path, message: e.message };
        });
        res.status(400).json({ errors: errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email && !password) {
        res.status(400).json({
          errors: [
            { path: "email", message: "Email is required" },
            { path: "password", message: "Password is required" },
          ],
        });
        return;
      } else if (!email) {
        res
          .status(400)
          .json({ errors: [{ path: "email", message: "Email is required" }] });
        return;
      } else if (!password) {
        res.status(400).json({
          errors: [{ path: "password", message: "Password is required" }],
        });
        return;
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({
          errors: [{ path: "invalid", message: "Invalid email/password" }],
        });
        return;
      }

      const isPasswordCorrect = compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(401).json({
          errors: [{ path: "invalid", message: "Invalid email/password" }],
        });
        return;
      }

      res.status(200).json({
        username: user.username,
        premium: user.premium,
        access_token: signToken({ id: user.id }),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async discordLogin(req, res) {
    try {
      const { access_token } = req.headers;

      const DiscordUserInfo = await axios({
        method: "post",
        url: "http://discordapp.com/api/users/@me",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const email = DiscordUserInfo.data.email;

      const [newUser, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          username: DiscordUserInfo.data.username,
          email,
          password: "default",
        },
        hooks: false,
      });

      const token = signToken({ id: newUser.id });

      res.status(created ? 201 : 200).json({
        username: newUser.username,
        premium: newUser.premium,
        access_token: token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async upgrade(req, res) {
    try {
      await User.update({ premium: true }, { where: { id: req.user.id } });

      res.status(200).json({ message: `Upgrade to premium successfully` });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async generateMidtransToken(req, res) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const user = await User.findByPk(req.user.id);
      if (!user) {
        res.status(400).json({ message: "User already premium" });
        return;
      }

      let parameter = {
        transaction_details: {
          order_id:
            `TRANSACTION_${user.id}_MOFI_PREMIUM_` +
            Math.floor(100000 + Math.random() * 100000),
          gross_amount: 59999,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: user.username,
          email: user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
