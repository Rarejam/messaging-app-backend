// initialize prisma with npx prisma init
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();
const groupRoute = require("./routes/groupRoute");
const loginRoute = require("./routes/LoginRoute");
const signupRoute = require("./routes/signupRoute");
const friendsRoute = require("./routes/friendsRoute");
const profileRoute = require("./routes/profileRoute");
const privateRoute = require("./routes/privateRoute");
app.use("/api/group", groupRoute);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/friends", friendsRoute);
app.use("/api/profile", profileRoute);
app.use("/api/private-message", privateRoute);

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`port running on ${PORT}`);
});
