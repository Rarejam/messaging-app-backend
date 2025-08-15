const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
  const { login_email, login_password } = req.body;
  console.log(req.body);

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
    console.log(user);

    const isPasswordValid = await bcrypt.compare(login_password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
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
