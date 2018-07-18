const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("req.headers", req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    console.log("decodedToken", decodedToken);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
      isStaff: decodedToken.isStaff
    };

    // check if user has admin permission
    if (req.userData.isAdmin) {
      next();
    } else {
      // not admin
      console.log("admin perm failed");
      res.status(401).json({ message: "Need Admin permission" });
    }

  } catch (error) {
    res.status(401).json({ message: "Auth failed. User may not be signed in, or it may have expired" });
  }
};
