import jwt from 'jsonwebtoken';
//https://www.npmjs.com/package/jsonwebtoken
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log('Verifying JWT:', token); // Debugging line to check the token
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // add decoded user info to request
        console.log(decoded);
        next();//IMPORTANT
    } catch (err) {
        /* console.error('JWT Verification Error:', err);
        res.status(401).json({ error: 'Invalid or expired token' }); */
        console.error('JWT Verification Error:', err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'TokenExpiredError' });
        }

        res.status(401).json({ error: 'Invalid token' });
    }
};