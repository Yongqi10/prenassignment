const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const Generator = require("../utils/Generator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
//register
router.post("/Register", validInfo, async (req, res) => {
  try {
    //1. get the username password and name

    const { username, password, name } = req.body;

    //2. check if the user exist

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    // if is !==0 means the user is exist
    if (user.rows.length !== 0) {
      //401 is unauthenticated
      return res.status(401).json("user exist");
    }

    //3. Bcrypt the user password
    const Salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, Salt);

    //4. enter the new user inside our DB

    const newUser = await pool.query(
      "INSERT INTO users (username,password,name) VALUES ($1,$2,$3) RETURNING *",
      [username, hashedPassword, name]
    );

    // 5. create a token
    const token = Generator(newUser.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// login route
router.post("/Login", validInfo, async (req, res) => {
  try {
    //1. get the username password and name

    const { username, password } = req.body;

    //2. check if user exist
    const newUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    //3. check if the password is same as the DB

    // user is the arr return obj inside the arr if arr is empty this means that user is undefined
    if (newUser.rows.length === 0) {
      return res.status(401).json("ERROR!! username undefined");
    }
    // return bool
    // compare user input password to DB password
    const correctPassword = await bcrypt.compare(
      password,
      newUser.rows[0].password
    );

    if (!correctPassword) {
      return res.status(401).json("ERROR!! username or password is incorrect");
    }
    //4. give them jwt token

    const token = Generator(newUser.rows[0].id);
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
