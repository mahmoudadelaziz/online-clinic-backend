// A separatee file for testing different stuff

const { faker } = require("@faker-js/faker");

let i = 2;

const nom =
i % 2 === 0
  ? faker.name.fullName({ sex: "female" }).trim().toLowerCase()
  : faker.name.fullName({ sex: "male" }).trim().toLowerCase();
const password = faker.internet.password(10);
const gender = i % 2 === 0 ? "female" : "male";
const dateOfBirth = faker.date.between('1958-01-01T00:00:00.000Z', '1992-01-01T00:00:00.000Z')
const username = nom.replace(/\W/g, "").toLowerCase().trim();
const email = faker.internet.email().trim().toLowerCase();
const phoneNumber = String(faker.phone.number("+20-10-####-####"))
.replace(/-/g, "")
.trim();
// create an object for the doctor
const patient = {
nom,
password,
username,
email,
gender,
dateOfBirth,
phoneNumber,
};

console.log(patient)