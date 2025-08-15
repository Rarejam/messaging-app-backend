const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const signupController = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (!email || !password || !confirm_password || !username) {
    return res.status(401).json({ message: "input required feilds" });
  }

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  if (userExists) {
    res.status(401).json({ message: "user already exists" });
  }

  if (password !== confirm_password) {
    return res.status(401).json({ message: "Passwords do not match" });
  }
  if (password.length < 8) {
    return res.status(401).json({ message: "Password too short" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      message: "Signup successful",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = signupController;
