const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const privateController = require("../controllers/privateController");
const express = require("express");
const privateRoute = express.Router();
privateRoute.get("/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    //OR retrieves messages from both sides not just all messages from one id
    const messages = await prisma.privateMessage.findMany({
      where: {
        OR: [
          { senderId: parseInt(userId), receiverId: parseInt(friendId) },
          { senderId: parseInt(friendId), receiverId: parseInt(userId) },
        ],
      },
      include: {
        sender: { include: { profile: true } },
        receiver: { include: { profile: true } },
      },
      orderBy: {
        date: "asc",
      },
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});
privateRoute.post("/:userId/:friendId", privateController);
module.exports = privateRoute;
