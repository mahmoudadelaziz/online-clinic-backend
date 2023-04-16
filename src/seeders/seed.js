const { seedFakeDoctors } = require("./doctor");
const { seedFakeLocations } = require("./location");
const { seedFakeReviews } = require("./review");
const { seedFakePatients } = require("./patient");

seedFakePatients();
seedFakeLocations();
seedFakeDoctors();
seedFakeReviews();
