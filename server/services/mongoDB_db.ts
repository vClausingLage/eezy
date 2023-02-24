import mongoose from 'mongoose'
import { mongoDBUri } from '../config/config.js'

export async function connectMongoDB() {
  try {
    await mongoose.connect(mongoDBUri);
    console.log('connected')
  } catch (error) {
    console.log(error);
  }
}