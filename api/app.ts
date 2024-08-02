import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
import { auth } from 'express-oauth2-jwt-bearer';

// DB AND GRAPHQL
import { sequelize } from './connections/dbConnection.js'
import { metarDecoderLogs } from './models/metarDecoder.sequelize.model.js'
import { aircraft } from './models/aircraft.sequelize.model.js'
import { user } from './models/user.sequelize.js'
import { createHandler } from "graphql-http/lib/use/express" // ES6
import { schema } from './graphql/schema.js'
import { resolvers } from './graphql/resolvers.js'

// ROUTER
import { metarRouter } from './routes/metar.routes.js'
import { aircraftRouter } from './routes/aircraft.routes.js'
// import { airportRouter } from './routes/airport.routes.js'
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

const jwtCheck = auth({
  // audience: 'https://dev-lcqbfmwjn2s35t2q.us.auth0.com/api/v2/',
  audience: 'https://clausing-lage.de',
  issuerBaseURL: 'https://dev-lcqbfmwjn2s35t2q.us.auth0.com/',
  tokenSigningAlg: 'RS256',
  // jwksUri: 'https://dev-lcqbfmwjn2s35t2q.us.auth0.com/.well-known/jwks.json',
});

app.use(jwtCheck);

// register user via middleware => all sequelize methods can be used on it
// app.use((req, res, next) => {
//   user.findByPk('id')
//     .then(user => {
//       req.user = user
//       next()
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })

app.use('/graphql', createHandler({
  schema: schema,
  rootValue: resolvers,
  context: {},
  formatError: (err) => {
    console.error(err)
    return err
  },
  validationRules: [],
}))
// http://localhost:4001/graphql => GraphiQL

app.get('/auth-metar', (req, res) => {
  let user = req.body.user;
  res.send({ message: 'Metar Authenticated' });
})

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})
app.use(limiter)

app.use('/api/metar', metarRouter)
app.use('/api/aircraft', aircraftRouter)
// app.use('/api/airport', airportRouter)
// app.use('/api/awc', awc_router)
// app.use('/api/metardecoder', metar_api_router)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// app.use(express.static(path.join(__dirname, 'build')))

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'favicon.ico'))
})

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

metarDecoderLogs.belongsTo(user, {
  constraints: true,
  onDelete: 'CASCADE',
})
aircraft.belongsTo(user, {
  constraints: true,
  onDelete: 'CASCADE',
})
user.hasMany(metarDecoderLogs)
user.hasMany(aircraft)

try {
  await sequelize.sync()
  // await sequelize.sync({ force: true })
  console.log('All models were synchronized successfully.')
  app.listen(port, () => {
    console.log(`🚀 http://localhost:${port}`)
  })
} catch (error) {
  console.error('Unable to connect to DB; Server not started:', error)
}


