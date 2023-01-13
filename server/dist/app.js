import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/aircraft.js';
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors());
app.use("/api", router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
