// require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // const users = await prisma.user.findMany();

  // Delete dependent messages first
  await prisma.privateMessage.deleteMany(); // delete private messages first
  await prisma.groupMessage.deleteMany(); // then group messages
  await prisma.profile.deleteMany(); // then profiles

  // Now you can safely delete users
  const users = await prisma.user.findMany();
  await prisma.user.deleteMany();
  console.log(users);
  const allUsers = await prisma.user.findMany();
  console.log(allUsers); // Should be []
}
main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
