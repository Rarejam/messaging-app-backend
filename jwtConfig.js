const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  // Authorization : BEARER <token>
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // seperate bearer and token by using the split()
  // to create an array of two Elements where there is space (' ')
  const token = authHeader.split(" ")[1];
  //   then get the second Element of index 1 in the array
  if (!token) {
    return res.status(401).json({ message: "Token missin" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json(err);
    }
    req.user = payload;
    next();
  });
}
module.exports = verifyToken;
