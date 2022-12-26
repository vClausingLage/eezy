import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { kilometersToKts, gallonsToLiters } from './unit_calculators.js'
import { Sequelize, QueryTypes } from 'sequelize'
import routes from './routes.js'
import { Aircraft } from './model.js'

// SERVER INIT
dotenv.config()
const app: Express = express()
const port = process.env.PORT

// DB CONN
const db = process.env.DB!
const user = process.env.USER!
const pass = process.env.PASS!
export const sequelize = new Sequelize(db, user, pass, {
  host: 'localhost', //'host.docker.internal'
  port: 3306,
  dialect: 'mysql'
})
// CHECK FOR DB CONN
try {
  await sequelize.authenticate()
  console.log('DB connected.')
} catch (error) {
  console.error('Error connecting DB:', error)
}
// GET ALL AIRCRAFT FOR SELECTOR 1
// export const aircrat = await sequelize.query("SELECT * FROM `aircraft`", { 
//   type: QueryTypes.SELECT
//   // model: Aircraft,
//   // mapToModel: true
// })

// CONTROLLERS ROUTES

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
})