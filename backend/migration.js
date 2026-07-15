import Student from "./models/students.js";

const migrateUnassignedStudents = async () => {
  try {
    // We use Student.collection.updateMany to bypass Mongoose's strict ObjectId validation
    // for this one-time cleanup.
    const result = await Student.collection.updateMany({ group: "not assigned" }, { $set: { group: null } });

    console.log(` Migration successful! Updated ${result.modifiedCount} students.`);
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

// Call this once after your database connects successfully
migrateUnassignedStudents();
