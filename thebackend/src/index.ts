import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import cartRoutes from './routes/cartRoutes';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});