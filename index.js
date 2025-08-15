// initialize prisma with npx prisma init
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();
const verifyToken = require("./jwtConfig");

const groupRoute = require("./routes/groupRoute");
const loginRoute = require("./routes/LoginRoute");
const signupRoute = require("./routes/signupRoute");
const friendsRoute = require("./routes/friendsRoute");
const profileRoute = require("./routes/profileRoute");
const privateRoute = require("./routes/privateRoute");

app.use("/api/group", verifyToken, groupRoute);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/friends", verifyToken, friendsRoute);
app.use("/api/profile", verifyToken, profileRoute);
app.use("/api/private-message", verifyToken, privateRoute);

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`port running on ${PORT}`);
});
