const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function seedFakePatients() {
  let patients = [];
  for (let i = 0; i < 100; i++) {
    // generate random data for each field
    const name = faker.name.fullName();
    const password = faker.internet.password(10);
    const username = name.replace(/\W/g, "").toLowerCase();
    const email = faker.internet.email();
    const phoneNumber = String(faker.phone.number("+20-10-####-####")).replace(
      /-/g,
      ""
    );
    // create an object for the doctor
    const doctor = {
      name,
      password,
      username,
      email,
      phoneNumber,
    };

    // push the doctor object to the doctors array
    patients.push(doctor);
  }
  prisma.patient.createMany({ data: patients }).then(() => {
    console.log("done");
    prisma.$disconnect();
  });
}
module.exports = { seedFakePatients };
