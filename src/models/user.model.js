import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
    },

    fullname: {
      required: true,
      type: String,
      lowercase: true,
    },

    avatar: {
      required: true,
      type: String, // Cloudinary URL
    },

    coverImage: {
      required: true,
      type: String, // Cloudinary URL
    },

    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// ====== PASSWORD HASHING ======
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// ====== PASSWORD COMPARE ======
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ====== ACCESS TOKEN ======
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// ====== REFRESH TOKEN ======
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
