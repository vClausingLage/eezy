import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
import { auth } from 'express-oauth2-jwt-bearer';

import { aircraftRouter } from './routes/aircraft.routes.js'
import { airportRouter } from './routes/airport.routes.js'
import { metarRouter } from './routes/metar.routes.js'
// import { awc_router } from './routes/awc.routes.js'
// import { metar_api_router } from './routes/metar_api.routes.js'

const port = process.env.PORT || 4001
const app = express()
dotenv.config()
morgan('tiny')

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cors())
app.use(helmet())
app.disable('x-powered-by')

// const jwtCheck = auth({
//   audience: 'https://dev-lcqbfmwjn2s35t2q.us.auth0.com/api/v2/',
//   issuerBaseURL: 'https://dev-lcqbfmwjn2s35t2q.us.auth0.com/',
//   tokenSigningAlg: 'RS256',
//   jwksUri: 'https://dev-lcqbfmwjn2s35t2q.us.auth0.com/.well-known/jwks.json',
// });

// app.use(jwtCheck);

app.get('/auth-metar', function (req, res) {
  let user = req.body.user;
  res.send({ message: 'Metar Authenticated' });
})

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
})
app.use(limiter)

app.use('/api/aircraft', aircraftRouter)
app.use('/api/airport', airportRouter)
app.use('/api/metar', metarRouter)
// app.use('/api/awc', awc_router)
// app.use('/api/metardecoder', metar_api_router)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'build')))

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'favicon.ico'))
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Metar App listening at http://localhost:${port}`)
})
