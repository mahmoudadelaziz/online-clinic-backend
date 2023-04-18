const { faker } = require("@faker-js/faker");

const { PrismaClient } = require("@prisma/client");
// create an array for the doctors
async function seedFakeDoctors() {
  const doctors = [];
  const medicalSpecializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Hematology",
    "Infectious Disease",
    "Nephrology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology",
  ];
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
    const specialization =
      medicalSpecializations[
        Math.floor(Math.random() * medicalSpecializations.length)
      ];
    const subSpecialization = specialization;
    const price1 = faker.datatype.number({ min: 100, max: 500 });
    const locationId = faker.datatype.number({ min: 1, max: 40 });

    // create an object for the doctor
    const doctor = {
      name,
      password,
      username,
      email,
      phoneNumber,
      specialization,
      subSpecialization,
      price1,
      locationId,
    };

    // push the doctor object to the doctors array
    doctors.push(doctor);
  }

  // insert into the database
  const prisma = new PrismaClient();
  try {
    const res = await prisma.doctor.createMany({ data: doctors });
    console.log(`Inserted ${res.count} doctor in Database`);
    prisma.$disconnect();
  } catch (error) {
    console.log(error);
  }
}
module.exports = { seedFakeDoctors };
