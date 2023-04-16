const { PrismaClient } = require("@prisma/client");
const fs = require("fs/promises");
const prisma = new PrismaClient();

function seedFakeLocations() {
  fs.readFile("./src/seeders/locations.json", "utf8")
    .then((data) => {
      return prisma.location.createMany({ data: JSON.parse(data) });
    })
    .then((res) => {
      console.log(res.count);
    });
}

module.exports = { seedFakeLocations };
