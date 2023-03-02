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

// GOOGLE UDEMY

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import { googleClientID, googleClientSecret } from "./config/config.js";

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken: any) => console.log(accessToken)
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
