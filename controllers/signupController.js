const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const signupController = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  console.log(req.body);
  if (password !== confirm_password) {
    return res.status(401).json({ message: "Passwords do not match" });
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
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
module.exports = signupController;
