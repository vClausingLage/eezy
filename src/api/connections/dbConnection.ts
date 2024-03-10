import { Sequelize } from 'sequelize'

export const dbConnection = new Sequelize(
  process.env.DB_NAME || "eezyApp",
  process.env.DB_USER || "eezy_usr",
  process.env.DB_PASSWORD || "eezy_Password",
  {
    host: 'mysql', //! set host in docker env //! mariadb localhost settings : '127.0.0.1'
    port: 3306,
    dialect: 'mariadb'
  }
)

try {
  await dbConnection.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
