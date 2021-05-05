import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.use('/posts', postRoutes);

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); })
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);