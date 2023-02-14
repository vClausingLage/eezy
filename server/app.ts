import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import { ac_router } from './routes/aircraft.js'
import { awc_router } from './routes/awc_routes.js'
const app = express();
dotenv.config()
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors())

// app.use("/aircraft", ac_router);
app.use('/api', awc_router)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});