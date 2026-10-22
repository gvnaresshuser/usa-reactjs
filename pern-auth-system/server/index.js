import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';//npm i dotenv
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js'; // 👈 Add this line

dotenv.config();
console.log('Loaded DB_URL:', process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // 👈 Add this line


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
