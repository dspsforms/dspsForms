const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
      isStaff: decodedToken.isStaff
    };

    // check if user has staff or admin permission
    if (req.userData.isStaff || req.userData.isAdmin) {
      next();
    } else {
      // not admin
      res.status(401).json({ message: "Need Staff or Admin permission" });
    }

  } catch (error) {
    res.status(401).json({ message: "Auth failed. User may not be signed in, or it may have expired" });
  }
};
