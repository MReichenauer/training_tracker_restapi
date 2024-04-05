/**
 * Main application routes
 */
import express from "express";
import { registerUser, getProfile, loginUser, editProfileHandler, deleteProfileHandler } from "../controllers/user_controller";
// import { basicAuthMiddleware } from "../validations/basic";
import { createUserRules } from "../validations/user_validations";
import { createProgressRules, updateProgressRules } from "../validations/progress_rules";
import { createProgressHandler, getOneProgressHandler, getUserProgressHandler, updateProgressHandler, deleteProgressHandler } from "../controllers/progress_controller";
import { jwtAuthMiddleware } from "../validations/jwt_auth";

const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "It's alive!🦖",
	});
});

/**
 * Register a user /register
 */
router.post("/register", createUserRules, registerUser);

/**
 * Register a user /register
 */
router.post("/login", loginUser);

/**
 * Get a users profile /profile
 */
router.get("/profile", jwtAuthMiddleware, getProfile);

/**
 * Edit a users profile /profile/edit
 */
router.patch('/profile/edit', jwtAuthMiddleware, editProfileHandler);

/**
 * Delete a users profile /profile/delete
 */
router.delete("/profile", jwtAuthMiddleware, deleteProfileHandler);

/**
 * Create a progress /progress
 */
router.post("/progress", jwtAuthMiddleware, createProgressRules, createProgressHandler);

/**
 * Get all of a users progress /progress
 */
router.get("/progress", jwtAuthMiddleware, getUserProgressHandler);

/**
 * Get a single progress of a user /progress/:progressId
 */
router.get("/progress/:progressId", jwtAuthMiddleware, getOneProgressHandler);

/**
 * Update a single progress of a user /progress/:progressId
 */
router.patch("/progress/:progressId", jwtAuthMiddleware, updateProgressRules, updateProgressHandler);

/**
 * Delete a single progress of a user /progress/:progressId
 */
router.delete("/progress/:progressId", jwtAuthMiddleware, deleteProgressHandler);

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
