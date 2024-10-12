import express from 'express';
import userRoutes from './routes/userRoutes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
app.use(express.json())

app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};
connectDB();

app.listen(PORT, () => {
    console.log('server started')
})