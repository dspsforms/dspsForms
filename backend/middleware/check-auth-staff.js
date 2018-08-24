const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.JSON_WEB_TOKEN_SERVER_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
      isStaff: decodedToken.isStaff
    };

    // check if user has staff permission
    if (req.userData.isStaff) {
      next();
    } else {
      // not admin
      res.status(401).json({ message: "Need Staff permission" });
    }

  } catch (error) {
    res.status(401).json({ message: "Auth failed. User may not be signed in, or it may have expired" });
  }
};
