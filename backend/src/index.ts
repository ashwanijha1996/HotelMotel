import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';

mongoose.connect(process.env.MONGO_DB_CONN_STR as string);

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Create Server
app.listen(5500, () => {
    console.log('Server running at port:', 5500);
})