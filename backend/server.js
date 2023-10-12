import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));


  app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on post ${port}`))