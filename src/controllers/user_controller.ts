import Debug from "debug";
import { Request, Response } from "express";
import { createUser, deleteUserProfile, getUserProfile, updateUserProfile } from "../services/user_service";
import { validationResult } from "express-validator";
import { generateTokenForUser } from "../validations/jwt_auth";
import bcrypt from "bcrypt";

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
 * Login a user
 */
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Fetch the user profile including the password
        const user = await getUserProfile(email);

        // If user not found, return 401 Unauthorized
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token for the user
        const token = generateTokenForUser(user);

        // Send token in response
        res.status(200).json({ token });
    } catch (error) {
       	debug("Error logging in:", error);
        return res.status(401).json({ message: "Invalid email or password" });
    }
};

/**
 * Get a users profile
 */
export const getProfile = async (req: Request, res: Response) => {
    try {
        // Extract email from decoded token
        const { email } = req.user;

        // Fetch user profile using email
        const userProfile = await getUserProfile(email);

        // Send the profile as a response
        res.status(200).json({ status: "success", data: userProfile });
    } catch (error) {
        debug("Error getting user profile:", error);
        res.status(404).json({ status: "fail", message: "Can't find profile" });
    }
};

/**
 * Edit a users profile
 */
export const editProfileHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }

        const userId = req.user.id;
        const { email, first_name, last_name, weight, height, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", data: errors.array() });
        }

        await updateUserProfile(userId, { email, first_name, last_name, weight, height, password });

        res.status(200).json({ status: "success", message: "Profile updated successfully" });
    } catch (error) {
        debug("Error updating profile:", error);
        res.status(404).json({ status: "fail", message: "Fail to update profile", error });
    }
};

/**
 * Delete a users profile
 */
export const deleteProfileHandler = async (req: Request, res: Response) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }

        const userId = req.user.id;

        // Delete user profile
        await deleteUserProfile(userId);

        res.status(200).json({ status: "success", message: "Profile deleted successfully" });
    } catch (error) {
        debug("Error deleting profile:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};
