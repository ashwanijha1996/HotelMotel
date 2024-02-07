import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_DB_CONN_STR as string);

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Create Server
app.listen(5500, () => {
    console.log('Server running at port:', 5500);
})