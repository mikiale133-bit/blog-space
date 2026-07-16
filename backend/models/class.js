import mongoose from "mongoose";

const classSchema = mongoose.Schema(
  {
    // teacherId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Teacher",
    //   required: true,
    // },
    section: String,
    department: String,
    // subjects: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Subject",
    //     required: true,
    //   },
    // ],
  },
  { timestamps: true },
);
const Class = mongoose.model("Class", classSchema);
export default Class;

/*
  const classSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: String,
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    }],
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    academicYear: String,
    isActive: {
      type: Boolean,
      default: true
    }
  }, { timestamps: true });
*/
