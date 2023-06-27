import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { auth } from "express-openid-connect";

import { ac_router } from "./routes/ac.routes.js";
import { awc_router } from "./routes/awc.routes.js";
import { airport_router } from "./routes/airport.routes.js";
import { metar_api_router } from "./routes/metar_api.routes.js";

import { config } from "./config/auth.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
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
app.use(auth(config));

app.use("/api/aircraft", ac_router);
app.use("/api/metar", awc_router);
app.use("/api/airport", airport_router);
app.use("/api/metardecoder", metar_api_router);

import pkg from "express-openid-connect";
const { requiresAuth } = pkg;

app.get("/auth0", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
app.get("/auth0/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "build")));

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.resolve(__dirname, "favicon.ico"));
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Metar App listening at http://localhost:${port}`);
});
