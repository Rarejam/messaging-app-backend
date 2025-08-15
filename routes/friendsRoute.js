const express = require("express");
const friendsRoute = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

friendsRoute.get("/:friendId", async (req, res) => {
  const { friendId } = req.params;
  try {
    const friend = await prisma.user.findUnique({
      where: { id: parseInt(friendId) },
      include: { profile: true },
    });
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.status(200).json(friend);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

friendsRoute.post("/", async (req, res) => {
  const { searchValue } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: searchValue,
      },
      include: {
        profile: true,
      },
    });
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "No User Found" });
  }
});
module.exports = friendsRoute;
