import mongoose, { Schema } from "mongoose";


const AdminUserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["SUPER_ADMIN", "ADMIN", "EDITOR"], default: "ADMIN" },
  },
  { timestamps: true }
);

AdminUserSchema.index({ email: 1 }, { unique: true });

