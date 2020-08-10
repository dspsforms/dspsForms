const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  try {
    console.log("req.headers", req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.JSON_WEB_TOKEN_SERVER_KEY);
    console.log("decodedToken", decodedToken);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };

    // check if user is logged in
    if (req.userData.userId && req.userData.email) {
      next();
    } else {
      // not logged in?
      console.log("user may not be logged in");
      res.status(401).json({ message: "User may not be signed in, or it may have expired" });
    }

  } catch (error) {
    res.status(401).json({ message: " Auth failed. User may not be signed in, or it may have expired" });
  }
};
