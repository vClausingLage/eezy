import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { awc_router } from './routes/awc_routes.js';
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors());
// app.use("/aircraft", ac_router);
app.use('/api', awc_router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
