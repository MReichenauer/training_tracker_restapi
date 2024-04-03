import { Request, Response, NextFunction } from "express";
import { getUserProfile } from "../services/user_service";

export const basicAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ status: "fail", message: "Make sure authentication is basic, dummy..." });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [email, password] = credentials.split(":");

    try {
        // Fetch the profile
        const userProfile = await getUserProfile(email, password);

        // If profile is not found
        if (!userProfile) {
            return res.status(401).json({ status: "fail", message: "Could not find profile, is the username and password correct?" });
        }

        // Set user credentials
        req.userCredentials = { email, password, id: userProfile.id };

        next();
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(401).json({ status: "fail", message: "Could not find profile, is the username and password correct?" });
    }
};
