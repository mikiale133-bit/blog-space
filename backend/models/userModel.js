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
    profile_img: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    // contacts: {
    //   phone: {
    //     type: String,
    //     required: false,
    //   },
    //   linkedin: {
    //     type: String,
    //     required: false,
    //   },
    //   github: {
    //     type: String,
    //     required: false,
    //   },
    //   website: {
    //     type: String,
    //     required: false,
    //   },
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
