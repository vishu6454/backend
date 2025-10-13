import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';



import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`);
})





