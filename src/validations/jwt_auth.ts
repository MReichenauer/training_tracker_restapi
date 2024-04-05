import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


// Get the secret key 🗝️
const secretKey = process.env.JWT_SECRET || "notSosecretlol";

// Generate token
export const generateToken = (payload: any): string => {
    return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

// verify token
export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ status:"fail", message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ status:"fail", message: "Failed to authenticate token" });
        }

        // verify the tokens content
        console.log("Decoded token:", decoded);

        // Attach decoded user data to the request object
        req.user = decoded;
        next();
    });
};

export const generateTokenForUser = (user: any): string => {
    const payload = {
        id: user.id,
        email: user.email,
    };
    return generateToken(payload);
};
