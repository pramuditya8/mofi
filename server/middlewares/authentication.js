const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Invalid token" };
    }

    let payload = verifyToken(access_token);

    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Invalid token" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    if (error.name === "Invalid token" || error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = authentication;
