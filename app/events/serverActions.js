"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bycrpt from "bcrypt";
export async function registerUser({ email, password }) {
  try {
    await connectDB();
    const prevUser = await User.findOne({ email: email }).select("email");
    console.log("prevUser", prevUser);
    const hashedPassword = await bycrpt.hash(password, 10);
    if (prevUser) return { error: "User already exists" };
    const res = User.create({
      email: email,
      password: hashedPassword,
    });
    if (!res) return { error: "Error creating user" };
    return { success: "User created successfully" };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getMatch(matchId) {
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const res = await fetch(`${backendUrl}/match/${matchId}`);
    return res.json();
  } catch (error) {
    return { error: error.message };
  }
}
