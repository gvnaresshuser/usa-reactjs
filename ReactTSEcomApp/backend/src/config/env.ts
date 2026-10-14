import dotenv from "dotenv";

dotenv.config();


export const env = {

    port:
        Number(
            process.env.PORT || 5000
        ),

    nodeEnv:
        process.env.NODE_ENV ||
        "development",

    databaseUrl:
        process.env.DATABASE_URL ||
        "",

    frontendUrl:
        process.env.FRONTEND_URL ||
        "http://localhost:5173",

    jwtSecret:
        process.env.JWT_SECRET ||
        "",

    razorpayKeyId:
        process.env.RAZORPAY_KEY_ID!,

    razorpayKeySecret:
        process.env.RAZORPAY_SECRET_KEY!,

};