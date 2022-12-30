import { Router } from 'express';
import { query } from '../services/controllers.js';
export const router = Router();
router.get('/aircraft', query);
// router.post('/create', create)
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
