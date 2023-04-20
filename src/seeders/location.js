const { PrismaClient } = require("@prisma/client");
const fs = require("fs/promises");
const prisma = new PrismaClient();

async function seedFakeLocations() {
  try {
    const data = await fs.readFile("./src/seeders/locations.json", "utf8");
    let parsedData = JSON.parse(data);
    parsedData = parsedData.map((location) => {
      return {
        ...location,
        city: location.city.toLowerCase().trim(),
        governorate: location.governorate.toLowerCase().trim(),
      };
    });
    const res = await prisma.location.createMany({ data: parsedData });
    console.log(`Inserted ${res.count} fake locations in databse`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { seedFakeLocations };
