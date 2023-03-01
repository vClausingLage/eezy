import { Request, Response, Router } from "express";

import {
  createAircraft,
  queryAircraftManufacturer,
  insertModelAC,
} from "../services/controllersMongoDB.js";

export const ac_router = Router();

ac_router.get("/:manufacturer", queryAircraftManufacturer);
ac_router.post("/", createAircraft);
ac_router.post("/modelinsert", insertModelAC);

// for LOGGING ONLY

import fs from "fs";

ac_router.post("/logs", (req: Request, res: Response) => {
  const content = JSON.stringify(req.body);

  // fs.readFile('./log/logFile.json', (err, data) => {   //! refactor!
  //   let json = JSON.parse(data.toString())
  //   json.push(content)

  //   fs.writeFile('./log/logFile.json', JSON.stringify(json), err => {
  //     if (err)
  //       console.log(err);
  //     else {
  //       console.log("File written successfully\n");
  //   }
  //   })
  // })

  res.send(content);
});

// https://www.robinwieruch.de/node-express-server-rest-api/

// router.route('/create').post(function (req: Request, res) {
//   let aircraft = new Aircraft();
//   aircraft.save()
//       .then(aircraft => {
//         res.status(200).json({'umfrage': 'added successfully'});
//       })
//       .catch(err => {
//         res.status(400).send("unable to save to database");
//   });
// });
