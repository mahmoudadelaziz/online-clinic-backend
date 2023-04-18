const { PrismaClient } = require("@prisma/client");
const fs = require("fs/promises");
const prisma = new PrismaClient();

async function seedFakeLocations() {
  try {
    const data = await fs.readFile("./src/seeders/locations.json", "utf8");
    const res = await prisma.location.createMany({ data: JSON.parse(data) });
    console.log(`Inserted ${res.count} fake locations in databse`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { seedFakeLocations };
