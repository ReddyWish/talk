import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import posts from "./data/posts.js";
import postRoutes from "./routes/postRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is running')
})


app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on post ${port}`))