const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginController = async (req, res) => {
  const { login_email, login_password } = req.body;

  const { bio } = req.body;

  if (!login_email || !login_password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: login_email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(login_password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (bio && bio.trim() !== "") {
      console.log(bio);
      await prisma.profile.upsert({
        where: {
          userId: parseInt(user.id),
        },
        update: {
          profileBio: bio,
        },
        create: {
          userId: parseInt(user.id),
          profileBio: bio,
        },
      });
    }

    const token = jwt.sign(
      { userId: user.id, user: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Login failed" });
  }
};

module.exports = loginController;
