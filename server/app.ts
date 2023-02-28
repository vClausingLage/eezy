import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { ac_router } from "./routes/ac_routes.js";
import { awc_router } from "./routes/awc_routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(helmet()); //! https://stackoverflow.com/questions/68607669/react-app-served-with-express-and-helmet-cannot-make-api-requests
app.disable("x-powered-by");

app.use("/aircraft", ac_router);
app.use("/api", awc_router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
