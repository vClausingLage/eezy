import { Router } from 'express';
import { getMetar, getRawMetar } from '../services/awc.controller.js';
export const awc_router = Router();
awc_router.get('/:metarID', getMetar);
awc_router.get('/raw/:metarID', getRawMetar);
