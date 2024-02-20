const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    minlength: 3,
    trim: true,
    unique: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  age: {
    type: Number,
    required: [true, "Please enter your Age"],
    minlength: 1,
    maxlength: 3,
  },
  gender: {
    type: String,
    requires: [true, "Please enter Your Gender"],
    enum: ["male", "female", "other"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number"],
    minlength: 10,
    maxlength: 10,
  },
  address: {
    type: String,
    required: [true, "Please enter your Address"],
    minlength: 3,
    maxlength: 100,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minlength: 3,
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter your Confirm Password"],
    minlength: 3,
    trim: true,
    select: false,
    vlidate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min
  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
