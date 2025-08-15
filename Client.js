const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  // Delete dependent group messages first
  // await prisma.groupMessage.deleteMany();

  // Delete dependent profiles
  // await prisma.profile.deleteMany();

  // Now delete users
  // await prisma.user.deleteMany();

  // await prisma.privateMessage.deleteMany();

  console.log(users);
  const allUsers = await prisma.user.findMany();
  console.log(allUsers); // Should be []
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
