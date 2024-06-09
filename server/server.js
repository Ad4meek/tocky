import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { connectMongo } from "./helpers/db.js";
import userRouter from "./routes/users.js";

// Config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// DB
connectMongo();

// App
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'))

// Routes
app.use('/users', userRouter);



app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
})