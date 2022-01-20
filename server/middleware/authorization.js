const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");

    //check token is empty of not
    if (!token) {
      return res.status(403).json("NOT AUTHORIZE");
    }

    // payload is the information that in the Generator(user id)
    // and check the token is real or fake
    const payload = jwt.verify(token, process.env.Secret);

    req.user = payload.user;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("NOT AUTHORIZE");
  }

  next();
};
