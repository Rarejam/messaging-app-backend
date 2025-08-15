const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const groupController = require("../controllers/groupController");
const express = require("express");
const groupRoute = express.Router();
// Get group messgaes
groupRoute.get("/", async (req, res) => {
  try {
    const groupMessages = await prisma.groupMessage.findMany({
      include: {
        message: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { date: "asc" },
    });

    return res.status(200).json(groupMessages);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "No group messages", err: err.message });
  }
});
groupRoute.post("/", groupController);
// groupRoute.post("/:id", (req, res) => {
//   const { id } = req.params;
// });
module.exports = groupRoute;
