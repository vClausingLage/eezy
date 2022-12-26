import { Sequelize } from "sequelize"

const db = process.env.DB!
const user = process.env.USER!
const pass = process.env.PASS!

const sequelize = new Sequelize(db, user, pass, {
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

export default sequelize