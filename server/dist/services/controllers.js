import { Aircraft } from './models.js';
export async function query(req, res) {
    const result = await Aircraft.findAll();
    try {
        res.send(result);
    }
    catch {
        console.error('error');
    }
}
// const result = await Aircraft.findAll({ 
//   where: {
//     manufacturer: 'Cessna'
//   }
// })
// export async function create(req: Request, res: Response) {
//   const userAircraft = await userAircraft.create({
//     firstName: "Jane", 
//     lastName: "Doe"
//   });
// }
// https://stackoverflow.com/questions/45859745/where-should-i-write-queries-in-model-or-controller-sequelize
// https://stackoverflow.com/questions/62685728/use-model-in-sequelize-from-a-controller
// localhost:4000/api/aircraft
// https://expressjs.com/en/guide/routing.html
