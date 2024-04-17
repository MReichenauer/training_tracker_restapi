"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main application routes
 */
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user_controller");
// import { basicAuthMiddleware } from "../validations/basic";
const user_validations_1 = require("../validations/user_validations");
const progress_rules_1 = require("../validations/progress_rules");
const progress_controller_1 = require("../controllers/progress_controller");
const jwt_auth_1 = require("../validations/jwt_auth");
const router = express_1.default.Router();
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
router.post("/register", user_validations_1.createUserRules, user_controller_1.registerUser);
/**
 * Register a user /register
 */
router.post("/login", user_controller_1.loginUser);
/**
 * Get a users profile /profile
 */
router.get("/profile", jwt_auth_1.jwtAuthMiddleware, user_controller_1.getProfile);
/**
 * Edit a users profile /profile/edit
 */
router.patch('/profile/edit', jwt_auth_1.jwtAuthMiddleware, user_validations_1.updateUserRules, user_controller_1.editProfileHandler);
/**
 * Delete a users profile /profile/delete
 */
router.delete("/profile", jwt_auth_1.jwtAuthMiddleware, user_controller_1.deleteProfileHandler);
/**
 * Create a progress /progress
 */
router.post("/progress", jwt_auth_1.jwtAuthMiddleware, progress_rules_1.createProgressRules, progress_controller_1.createProgressHandler);
/**
 * Get all of a users progress /progress
 */
router.get("/progress", jwt_auth_1.jwtAuthMiddleware, progress_controller_1.getUserProgressHandler);
/**
 * Get a single progress of a user /progress/:progressId
 */
router.get("/progress/:progressId", jwt_auth_1.jwtAuthMiddleware, progress_controller_1.getOneProgressHandler);
/**
 * Update a single progress of a user /progress/:progressId
 */
router.patch("/progress/:progressId", jwt_auth_1.jwtAuthMiddleware, progress_rules_1.updateProgressRules, progress_controller_1.updateProgressHandler);
/**
 * Delete a single progress of a user /progress/:progressId
 */
router.delete("/progress/:progressId", jwt_auth_1.jwtAuthMiddleware, progress_controller_1.deleteProgressHandler);
/**
 * Catch-all route handler
 */
router.use((req, res) => {
    // Respond with 404 and a message in JSON-format
    res.status(404).send({
        message: "Not Found",
    });
});
exports.default = router;
