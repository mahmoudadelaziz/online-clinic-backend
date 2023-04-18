const { seedFakeDoctors } = require("./doctor");
const { seedFakeLocations } = require("./location");
const { seedFakeReviews } = require("./review");
const { seedFakePatients } = require("./patient");

async function main() {
  await seedFakeLocations();
  await seedFakeDoctors();
  await seedFakePatients();
  await seedFakeReviews();
}
main();
