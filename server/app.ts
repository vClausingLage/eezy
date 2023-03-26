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
import { auth_router } from "./routes/auth.routes.js";

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

app.use("/api/aircraft", ac_router);
app.use("/api/metar", awc_router);
app.use("/api/airport", airportDB_router);
app.use("/api/metardecoder", metar_api_router);
app.use("/auth", auth_router);

// AUTH

// import { Auth0Api } from "./config/config.js";
// import { auth } from "express-openid-connect";
// import pkg from "express-openid-connect";
// const { requiresAuth } = pkg;

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: Auth0Api,
//   baseURL: "http://localhost:4000",
//   clientID: "QrRkDZOKZLrPbeVA6TDOx0n8s5bMIbnQ",
//   issuerBaseURL: "https://dev-lcqbfmwjn2s35t2q.us.auth0.com",
// };

// app.use(auth(config));

// app.get("/auth", (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// });
// app.get("/auth/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// https://developer.auth0.com/resources/code-samples/full-stack/hello-world/basic-role-based-access-control/spa/react-javascript/express-javascript

// AUTH

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "build")));

// app.get("/favicon.ico", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "favicon.ico"));
// });

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.use("/metarapp", express.static(path.join(__dirname, "metarapp/build")));
// app.get("metarapp/*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/metarapp/build/index.html"));
// });

app.use("/metarapp", express.static(path.join(__dirname, "metarapp/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/metarapp/build/index.html"));
});

app.use(express.static(path.join(__dirname, "prtklr/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/prtklr/build/index.html"));
});

app.listen(port, () => {
  // console.log(`Metar App listening at http://localhost:${port}`);
});
