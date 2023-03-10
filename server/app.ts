import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { ac_router } from "./routes/ac.routes.js";
import { awc_router } from "./routes/awc.routes.js";
import { airportDB_router } from "./routes/airport.routes.js";
import { metar_api_router } from "./routes/metar_api.routes.js";

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
app.use("/api/metardecoder", metar_api_router);

// AUTH

import { auth } from "express-openid-connect";

import { AUTH0_SECRET } from "./config/config.js";

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: "http://localhost:4000",
  clientID: "QrRkDZOKZLrPbeVA6TDOx0n8s5bMIbnQ",
  issuerBaseURL: "https://dev-lcqbfmwjn2s35t2q.us.auth0.com",
};

app.use(auth(config));

app.get("/auth", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// https://manage.auth0.com/dashboard/us/dev-lcqbfmwjn2s35t2q/applications/QrRkDZOKZLrPbeVA6TDOx0n8s5bMIbnQ/quickstart/express/steps/4

// AUTH

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
