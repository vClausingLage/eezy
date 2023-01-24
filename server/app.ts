import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './routes/aircraft.js'
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

fetch('https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=csv&hoursBeforeNow=3&mostRecent=true&stationString=edds')
	.then((response) => response.text())
  .then((data) => console.log(data));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});