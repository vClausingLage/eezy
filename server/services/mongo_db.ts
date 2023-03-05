import mongoose from "mongoose";
import { MONGO_CONN_STRING } from "../config/config.js";

export async function mongoDBConnect() {
  try {
    if (MONGO_CONN_STRING !== undefined)
      await mongoose.connect(MONGO_CONN_STRING);
  } catch (error) {
    console.log("connection mongoDB failed");
  }
}
