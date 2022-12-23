import express from 'express'
import wiki from './wiki.js'

// SERVER INIT
const port = 3300
const app = express()

app.use("/", wiki);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
})

