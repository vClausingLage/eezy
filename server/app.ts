import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { ac_router } from "./routes/ac_routes.js";
import { awc_router } from "./routes/awc_routes.js";
import { airportDB_router } from "./routes/airportDB_routes.js";
import { AUTH0_SECRET } from "./config/config.js";

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
morgan("tiny");

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

// AUTH0

import { auth } from "express-openid-connect";

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: "http://localhost:3000",
  clientID: "6WL3Wo72krfCLT8mMdyf0Md1BZgsiKDI",
  issuerBaseURL: "https://dev-lcqbfmwjn2s35t2q.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/auth0", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// AUTH0

// UDEMY
// import mongoose from "mongoose";
// import { mongoUriUsers } from "./config/config.js";
// import { authRoutes } from "./routes/authRoutes.js";
// import "./models/user.js";
// import "./services/passport.js";
// authRoutes(app);
// mongoose.connect(mongoUriUsers);
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
