const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;
    req.username = username;
    next();
  } catch {
    next("Authentication failure");
  }
}

module.exports = checkLogin;
