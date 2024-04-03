import Debug from "debug";
import { Request, Response } from "express";
import { createUser, getUserProfile } from "../services/user_service";
import { validationResult } from "express-validator";

// Create a new debug instance
const debug = Debug("prisma-debug_pic:Hello from user_controller");


/**
 * Register a user
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status:"fail", data: errors.array() });
        }

        // Creating the user's profile (if it made thru validation)
		const { id, first_name, last_name, email, weight, height  } = await createUser(req.body);
		const data = { id, first_name, last_name, email, weight, height };
        res.status(201).json({ status: "Success", data: data });
    } catch (error) {
        debug("Error creating user:", error);
        res.status(500).send("Internal server error");
    }
}
/**
 * Get a users profile
 */
export const getProfile = async (req: Request, res: Response) => {
    try {
        const userCredentials = req.userCredentials;
        if (!userCredentials) {
            throw new Error("User credentials not found");
        }

        // Getting the email and password
        const { email, password } = userCredentials;

        // Validate email and password, fetch user profile
        const userProfile = await getUserProfile(email, password);

        // Send the profile as a response
        res.status(200).json({ status: "success", data: userProfile });
    	} catch (error) {
        debug("Error getting user profile:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
   		}
};
