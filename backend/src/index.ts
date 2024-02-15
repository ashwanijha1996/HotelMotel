import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import myHotelRoutes from './routes/myHotels';
import cookieparser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLDNRY_NAME,
    api_key: process.env.CLDNRY_KEY,
    api_secret: process.env.CLDNRY_SECRT
})

mongoose.connect(process.env.MONGO_DB_CONN_STR as string);

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FE_URL,
    credentials: true
}));
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Create Server
app.listen(5500, () => {
    console.log('Server running at port:', 5500);
})