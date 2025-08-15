const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const profileRoute = express.Router();

profileRoute.get("/:id", async (req, res) => {
  const profileid = req.params.id;

  console.log("GET /api/profile hit with id:", req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(profileid),
      },
      include: {
        profile: true,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
profileRoute.post("/:id", async (req, res) => {
  const { inputUrl, bio } = req.body;
  const userId = req.params.id;
  console.log("Incoming data:", inputUrl, userId);

  try {
    // const profile = await prisma.profile.create({
    //   data: {
    //     profileImage: inputUrl,
    //     profileBio: bio,
    //   },
    //   user: { connect: { id: parseInt(userId) } },
    // });

    const profile = await prisma.profile.upsert({
      where: { userId: parseInt(userId) },
      update: {
        profileImage: inputUrl,
        // profileBio: bio,
      },
      create: {
        profileImage: inputUrl,
        profileBio: bio,
        user: { connect: { id: parseInt(userId) } },
      },
    });

    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to update profile" });
  }
});
module.exports = profileRoute;
