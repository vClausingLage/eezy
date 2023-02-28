import mongoose from "mongoose";
import { mongoUri } from "../config/config.js";

export async function mongoDBConnect() {
  try {
    if (mongoUri !== undefined) await mongoose.connect(mongoUri);
  } catch (error) {
    console.log("connection mongoDB failed");
  }
}
