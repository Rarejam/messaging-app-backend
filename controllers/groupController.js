const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const groupController = async (req, res) => {
  // const { userId } = req.params;
  const { newMessage, userId } = req.body;
  if (!newMessage) {
    return res.status(400).json({ error: " content are required" });
  }
  try {
    const message = await prisma.groupMessage.create({
      data: {
        content: newMessage,
        message: { connect: { id: parseInt(userId) } },
        // messageId: parseInt(userId),
      },
    });
    res.json(message);
  } catch (err) {
    console.error("Error creating group message:", err);
    res.status(500).json({ error: "Failed to create message" });
  }
};
module.exports = groupController;
