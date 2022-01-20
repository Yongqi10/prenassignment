module.exports = (req, res, next) => {
  const { username, password, name } = req.body;

  if (req.path === "/Register") {
    //check all 3 if is empty
    if (![username, password, name].every(Boolean)) {
      return res
        .status(401)
        .json("username, password and name can not be empty");
    }
  } else if (req.path === "/Login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("username and password can not be empty");
    }
  }

  next();
};
