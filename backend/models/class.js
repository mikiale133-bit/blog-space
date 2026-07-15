import mongoose from "mongoose";

const classSchema = mongoose.Schema(
  {
    section: String,
    department: String,
  },
  { timestamps: true },
);
const Class = mongoose.model("Class", classSchema);
export default Class;
