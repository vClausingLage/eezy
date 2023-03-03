import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { ac_router } from "./routes/ac_routes.js";
import { awc_router } from "./routes/awc_routes.js";
import { airportDB_router } from "./routes/airportDB_routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");

app.use("/api/aircraft", ac_router);
app.use("/api/metar", awc_router);
app.use("/api/airport", airportDB_router);

// UDEMY

import mongoose from "mongoose";
import { mongoUriUsers } from "./config/config.js";
import { authRoutes } from "./routes/authRoutes.js";
import "./models/user.js";
import "./services/passport.js";

authRoutes(app);
mongoose.connect(mongoUriUsers);

// UDEMY

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
