import mongoose from "mongoose";
import { mongoDBUriTest } from "../config/config.js";

export async function mongoDBConnect() {
  try {
    await mongoose.connect(mongoDBUriTest);
  } catch (error) {
    console.log('connection mongoDB failed')
  }
}