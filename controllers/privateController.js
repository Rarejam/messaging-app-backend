const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const privateController = async (req, res) => {
  const { userId, friendId } = req.params;
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message is required" });

  try {
    const newMessage = await prisma.privateMessage.create({
      data: {
        content: message,
        senderId: parseInt(userId),
        receiverId: parseInt(friendId),
      },
    });
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = privateController;
