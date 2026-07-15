import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // await runMigration();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// const runMigration = async () => {
//   try {
//     console.log("Starting database migration...");

//     // Using the raw collection to safely clean up the string values
//     const result = await Student.collection.updateMany({ group: "not assigned" }, { $set: { group: null } });

//     console.log(`✅ Migration successful! Updated ${result.modifiedCount} students.`);
//   } catch (error) {
//     console.error("❌ Migration failed:", error);
//   }
// };
