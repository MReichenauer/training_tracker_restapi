import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createProgress, deleteProgressById, getProgressById, getUserProgress, updateProgressById } from "../services/progress_service";
import { getUserProfile } from "../services/user_service";

import Debug from "debug";


const debug = Debug("prisma-debug_progress:Hello from progress_controller");

export const createProgressHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }

        const { email } = req.user;
        const userProfile = await getUserProfile(email);
        const userId = userProfile.id;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", data: errors.array() });
        }

        // Create progress
        const progressData = req.body;
        const createdProgress = await createProgress(userId, progressData);

        res.status(201).json({
            status: "success",
            data: createdProgress,
        });
    } catch (error) {
        debug("Error creating progress:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

export const getUserProgressHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user)
		 { return res.status(401).json({ message: "You need authorization to do this!" }); }

        const { email } = req.user;
        const userProfile = await getUserProfile(email);
        const userId = userProfile.id;

        const userProgress = await getUserProgress(userId);

        res.status(200).json({
            status: "success",
            data: userProgress,
        });
    } catch (error) {
        debug("Error fetching user's progress:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

export const getOneProgressHandler = async (req: Request, res: Response) => {
    try {
        const progressId = parseInt(req.params.progressId);
        const userId = req.user.id;

		if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }

        const progress = await getProgressById(progressId, userId);

        if (!progress) {
            return res.status(404).json({ status: "fail", message: "Progress not found" });
        }

        res.status(200).json({ status: "success", data: progress });
    } catch (error) {
        debug("Error fetching progress by ID:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

export const updateProgressHandler = async (req: Request, res: Response) => {
    try {
		 // Get progressId from request
        const progressId = parseInt(req.params.progressId);

		// Get userId from user credentials
        const userId = req.user.id;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", data: errors.array() });
        }

        const updateProgress = await updateProgressById(progressId, req.body, userId);

        if (updateProgress.status === "error") {
            return res.status(404).json({ status: "fail", message: updateProgress.message });
        }

        res.status(200).json({ status: "success", data: updateProgress.data, });

    } catch (error) {
        debug("Error updating progress:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

export const deleteProgressHandler = async (req: Request, res: Response) => {
    try {
        // Get progressId from request
        const progressId = parseInt(req.params.progressId);

        // Get userId from user credentials
        const userId = req.user.id;

        // Check if the progress belongs to the user
        const progress = await getProgressById(progressId, userId);
        if (!progress) {
            return res.status(401).json({ status:"fail", message: "Unauthorized. Progress does not belong to the user." });
        }

        // Delete the progress
        await deleteProgressById(progressId, userId);

        // Send success response
        res.status(200).json({ status: "success", message: "Progress deleted successfully" });
    } catch (error) {

        debug("Error deleting progress:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};
