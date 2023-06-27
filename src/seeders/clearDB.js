// Clearing up the database (for reset and error fixing)

// WARNING!! EXECUTE WITH EXTREME CAUTION!!
// THIS DELETES RECORDS BUT DOES (NOT) RESET THE DB
// THE IDs WILL CONTINUE TO INCREMENT FROM THE PREVIOUSLY MAXIMUM VALUE BEFORE DELETION!!

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Delete all rows in the `Doctor` model
async function deleteAllDoctors() {
  const prisma = new PrismaClient();

  try {
    const deletedDoctors = await prisma.doctor.deleteMany();
    console.log(`Deleted ${deletedDoctors.count} doctors.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Delete all rows in the `Patient` model
async function deleteAllPatients() {
  const prisma = new PrismaClient();

  try {
    const deletedPatients = await prisma.patient.deleteMany();
    console.log(`Deleted ${deletedPatients.count} patients.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Delete all rows in the `PatientReview` model
async function deleteAllPatientReview() {
  const prisma = new PrismaClient();

  try {
    const deletedPatientReviews = await prisma.patientReview.deleteMany();
    console.log(`Deleted ${deletedPatientReviews.count} patient reviews.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Delete all rows in the `Location` model
async function deleteAllLocations() {
  const prisma = new PrismaClient();

  try {
    const deletedLocations = await prisma.location.deleteMany();
    console.log(`Deleted ${deletedLocations.count} locations.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllPatients();
deleteAllLocations();
deleteAllPatientReview();
deleteAllDoctors();
