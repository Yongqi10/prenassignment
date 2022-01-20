const jwt = require("jsonwebtoken");
require("dotenv").config();

function Generator(id) {
  const payload = {
    user: id,
  };
  return jwt.sign(payload, process.env.Secret, { expiresIn: "1hr" });
}

module.exports = Generator;
