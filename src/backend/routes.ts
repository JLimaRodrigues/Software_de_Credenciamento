import { pessoal } from './controllers/apiController';

import express from 'express';
const route = express.Router();

route.get('/pessoas', pessoal);

export default route;