import { mongoURIDev } from "./dev.js";
import { mongoURIProd } from "./prod.js";

import dotenv from "dotenv";
dotenv.config();

export let mongoUri: string | undefined;

if (process.env.NODE_ENV === "production") {
  mongoUri = mongoURIProd;
} else {
  mongoUri = mongoURIDev;
}
