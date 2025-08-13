import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      default:"user"
    },
   status:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPasword) {
  return await bcrypt.compare(enteredPasword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
