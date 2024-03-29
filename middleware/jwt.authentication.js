require('dotenv').config();
const jwt = require("jsonwebtoken");
exports.authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Missing token" });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Forbidden", message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
