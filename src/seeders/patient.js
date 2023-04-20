const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedFakePatients() {
  let patients = [];
  for (let i = 0; i < 100; i++) {
    // generate random data for each field
    const name = faker.name.fullName().trim().toLowerCase();
    const password = faker.internet.password(10);
    const username = name.replace(/\W/g, "").toLowerCase().trim();
    const email = faker.internet.email().trim().toLowerCase();
    const phoneNumber = String(faker.phone.number("+20-10-####-####"))
      .replace(/-/g, "")
      .trim();
    // create an object for the doctor
    const patient = {
      name,
      password,
      username,
      email,
      phoneNumber,
    };

    // push the doctor object to the doctors array
    patients.push(patient);
  }
  try {
    const res = await prisma.patient.createMany({ data: patients });
    console.log(`Inserted ${res.count} patient records in databse`);
    prisma.$disconnect();
  } catch (error) {
    console.log(error);
  }
}
module.exports = { seedFakePatients };
