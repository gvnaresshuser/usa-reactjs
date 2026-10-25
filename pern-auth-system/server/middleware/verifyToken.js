import jwt from "jsonwebtoken";
//https://www.npmjs.com/package/jsonwebtoken
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("Verifying JWT:", token); // Debugging line to check the token
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // add decoded user info to request
    console.log(decoded);
    next(); //IMPORTANT
  } catch (err) {
    /* console.error('JWT Verification Error:', err);
        res.status(401).json({ error: 'Invalid or expired token' }); */
    console.error("JWT Verification Error:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "TokenExpiredError" });
    }

    res.status(401).json({ error: "Invalid token" });
  }
};
/*
jwt.verify() automatically checks the JWT expiration time, provided the token contains an 
exp (expiration) claim.
1. How does it work?
const decoded = jwt.verify(token, process.env.JWT_SECRET);


jwt.verify() automatically checks:
1. Signature — whether the token was signed using the expected secret or public key.
2. Expiration (exp) — whether the token has expired.
3. Not Before (nbf) — whether the token is being used before its permitted start time, 
if this claim exists.
If the token is valid, it returns the decoded payload. If the token has expired, it throws 
a TokenExpiredError.
2. Example: Creating a token with an expiry
const token = jwt.sign(
    { id: 101, username: "Naresh" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
);


The token expires after 15 minutes.
3. Your error-handling code
Your existing code handles expiration correctly:
catch (err) {
    console.error("JWT Verification Error:", err);

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            error: "TokenExpiredError"
        });
    }

    return res.status(401).json({
        error: "Invalid token"
    });
}


Situation	Result
Valid token	jwt.verify() returns decoded payload
Expired token	Throws TokenExpiredError
Invalid signature	Throws JsonWebTokenError
Malformed token	Throws JsonWebTokenError
Token used before its nbf time	Throws NotBeforeError

4. Important point
If you create a token without an expiration claim, jwt.verify() does not automatically 
impose an expiry time.

For example:
const token = jwt.sign(
    { id: 101 },
    process.env.JWT_SECRET
);


This token has no expiry by default.

Best practice: Set expiresIn when creating access tokens, and let jwt.verify() validate 
their expiration automatically.
*/
