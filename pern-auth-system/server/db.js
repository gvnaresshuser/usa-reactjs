import pkg from 'pg';
const { Pool } = pkg;
//https://node-postgres.com/apis/pool
import dotenv from 'dotenv';
dotenv.config();// ✅ Loads variables into process.env
console.log(process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Render PostgreSQL
    },
});

export default pool;
//Without dotenv.config(), process.env.PORT or process.env.JWT_SECRET would be undefined.