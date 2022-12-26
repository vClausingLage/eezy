import express from 'express';
import dotenv from 'dotenv';
// import { kilometersToKts, gallonsToLiters } from './unit_calculators.js'
// SERVER INIT
dotenv.config();
const app = express();
const port = process.env.PORT;
import routes from './routes.js';
// CONTROLLERS ROUTES
app.use('/api', routes);
app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
