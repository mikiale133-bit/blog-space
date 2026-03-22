import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    // profileImg: {
    //   public_id: { type: String, required: true },
    //   url: { type: String, required: true },
    // },
    // plan: {
    //   type: Array,
    //   enum: ["daily", "weekely", "monthly", "yearly"],
    // },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;
