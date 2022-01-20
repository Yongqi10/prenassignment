const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

//register and login routes
app.use("/auth", require("./routes/jwt.js"));
//list of movies
app.use("/list", require("./routes/list.js"));
//Home page
app.use("/Home", require("./routes/homePage.js"));

app.listen(5000, () => {
  console.log("server has started");
});
