import express from 'express';
import { signin, signup } from '../controllers/users.js';
const router = express.Router();

router.post('/', signin);

router.post('/', signup);

export default router;
