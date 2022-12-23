import mysql from 'mysql2'

// const db = process.env.DB!
const user = process.env.USER!
const pass = process.env.PASS!

// CREATE

function createDB() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: pass,
  })
  
  connection.query(
    'CREATE DATABASE IF NOT EXISTS eezy',
      (err, results) => {
        console.log(results)
        console.log(err)
    }
  )
  
  connection.end()
}

// POPULATE

let newTable = `
CREATE TABLE 'aircraft' (
  'id' mediumint NOT NULL,
  'manufacturer' varchar(100) NOT NULL,
  'model' varchar(100) NOT NULL,
  'fuel_type' varchar(100) NOT NULL,
  'fuel_capacity' int NOT NULL,
  'cruise_speed' int NOT NULL,
  'cruise_fuel_consumption' int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`

let populateTable = `
INSERT INTO 'aircraft' ('id', 'manufacturer', 'model', 'fuel_type', 'fuel_capacity', 'cruise_speed', 'cruise_fuel_consumption') VALUES
(1, 'Cessna', 'C150', 'AVGAS', 144, 196, 22),
(2, 'Cessna', 'C172', 'AVGAS', 163, 226, 26);
`

function populateDB() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: user,
    password: pass,
  })
  
  connection.query(
    newTable,
      (err, results) => {
        console.log(results)
        console.log(err)
    }
  )

  connection.query(
    populateTable,
      (err, results) => {
        console.log(results)
        console.log(err)
    }
  )
  
  connection.end()
}