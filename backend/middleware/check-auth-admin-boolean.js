const jwt = require("jsonwebtoken");
const config = require("../config/config");

// similar to check-auth-admin, except returns true or false, instead of
// calling next() or returning a 401
module.exports = (req, res) => {
  try {
    console.log("req.headers", req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.JSON_WEB_TOKEN_SERVER_KEY);
    console.log("decodedToken", decodedToken);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
      isStaff: decodedToken.isStaff
    };

    // check if user has admin permission
    if (req.userData.isAdmin) {
      return true;
    } else {
      // not admin
      return false;
    }

  } catch (error) {
    return false;
  }
};
