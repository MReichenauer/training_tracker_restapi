/**
 * Main application routes
 */
import express from "express";
import { registerUser, getProfile } from "../controllers/user_controller";
import { basicAuthMiddleware } from "../validations/basic";
import { createUserRules } from "../validations/user_validations";
import { createProgressRules, updateProgressRules } from "../validations/progress_rules";
import { createProgressHandler, getOneProgressHandler, getUserProgressHandler, updateProgressHandler, deleteProgressHandler } from "../controllers/progress_controller";

const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "But first, let me take a selfie 🤳 https://www.youtube.com/watch?v=kdemFfbS5H0",
	});
});

/**
 * Register a user /register
 */
router.post("/register", createUserRules, registerUser);

/**
 * Get a users profile /profile
 */
router.get("/profile", basicAuthMiddleware, getProfile);

/**
 * Create a progress /progress
 */
router.post("/progress", basicAuthMiddleware, createProgressRules, createProgressHandler);

/**
 * Get all of a users progress /progress
 */
router.get("/progress", basicAuthMiddleware, getUserProgressHandler);

/**
 * Get a single progress of a user /progress/:progressId
 */
router.get("/progress/:progressId", basicAuthMiddleware, getOneProgressHandler);

/**
 * Update a single progress of a user /progress/:progressId
 */
router.patch("/progress/:progressId", basicAuthMiddleware, updateProgressRules, updateProgressHandler);

/**
 * Delete a single progress of a user /progress/:progressId
 */
router.delete("/progress/:progressId", basicAuthMiddleware, deleteProgressHandler);

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});

export default router;
