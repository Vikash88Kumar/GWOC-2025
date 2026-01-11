import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    // --- 1. PERSONAL IDENTITY ---
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true, 
    },
    avatar: {
      type: String, // Cloudinary URL
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    // --- 2. BUSINESS IDENTITY (Crucial for Services) ---
    companyName: {
      type: String,
      trim: true,
      default: "", // Can be empty if they are an individual
    },
    website: {
      type: String,
      trim: true,
    },
    industry: {
      type: String, // e.g., "Fashion", "Tech", "F&B"
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    
    // --- 3. SECURITY & ROLES ---
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Never return password in API responses by default
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "CLIENT"], 
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false, // For email verification logic
    },
    refreshToken: {
      type: String,
    },

    // --- 4. OPTIONAL: PAYMENT INFO ---
    // Never store card details directly. Store the Stripe/Razorpay Customer ID.
    paymentCustomerId: {
      type: String,
      select: false,
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// --- HOOKS & METHODS ---

// 1. Encrypt password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  ;
});

// 2. Method to check password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 3. Generate Access Token (Short lived)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// 4. Generate Refresh Token (Long lived)
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);