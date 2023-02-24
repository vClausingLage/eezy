import mongoose from 'mongoose'
import { mongoDBUri } from '../config/config.js'

try {
  await mongoose.connect(mongoDBUri);
} catch (error) {
  console.log(error);
}