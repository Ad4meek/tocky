import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { connectMongo } from './helpers/db.js';
import { initializeStripe } from './helpers/stripe.js';
import userRouter from './routes/users.js';
import moneyRouter from './routes/money.js';
import webhookRouter from './routes/webhook.js';

// Config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// DB
connectMongo();
initializeStripe();

// App
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'))

// Routes
app.use('/users', userRouter);
app.use('/money', moneyRouter);
app.use('/webhook', webhookRouter);



app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
})