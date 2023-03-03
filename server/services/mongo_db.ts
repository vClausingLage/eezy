import mongoose from "mongoose";
import { mongoUriAircraft } from "../config/config.js";

export async function mongoDBConnect() {
  try {
    if (mongoUriAircraft !== undefined)
      await mongoose.connect(mongoUriAircraft);
  } catch (error) {
    console.log("connection mongoDB failed");
  }
}
