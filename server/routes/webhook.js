import express from 'express';
import { stripeMainWebhook } from '../controllers/webhook.js';

const router = express.Router();


router.post('/', stripeMainWebhook);


export default router;