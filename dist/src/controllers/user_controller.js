"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfileHandler = exports.editProfileHandler = exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const debug_1 = __importDefault(require("debug"));
const user_service_1 = require("../services/user_service");
const express_validator_1 = require("express-validator");
const jwt_auth_1 = require("../validations/jwt_auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Create a new debug instance
const debug = (0, debug_1.default)("prisma-debug_pic:Hello from user_controller");
/**
 * Register a user
 */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", data: errors.array() });
        }
        // Creating the user's profile (if it made thru validation)
        const { id, first_name, last_name, email, weight, height } = yield (0, user_service_1.createUser)(req.body);
        const data = { id, first_name, last_name, email, weight, height };
        res.status(201).json({ status: "Success", data: data });
    }
    catch (error) {
        debug("Error creating user:", error);
        res.status(500).send("Internal server error");
    }
});
exports.registerUser = registerUser;
/**
 * Login a user
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Fetch the user profile including the password
        const user = yield (0, user_service_1.getUserProfile)(email);
        // If user not found, return 401 Unauthorized
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Verify password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Generate JWT token for the user
        const token = (0, jwt_auth_1.generateTokenForUser)(user);
        // Send token in response
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(401).json({ message: "Invalid email or password" });
    }
});
exports.loginUser = loginUser;
/**
 * Get a users profile
 */
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract email from decoded token
        const { email } = req.user;
        // Fetch user profile using email
        const userProfile = yield (0, user_service_1.getUserProfile)(email);
        // Send the profile as a response
        res.status(200).json({ status: "success", data: userProfile });
    }
    catch (error) {
        debug("Error getting user profile:", error);
        res.status(404).json({ status: "fail", message: "Can't find profile" });
    }
});
exports.getProfile = getProfile;
/**
 * Edit a users profile
 */
const editProfileHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }
        const userId = req.user.id;
        const { email, first_name, last_name, weight, height, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", data: errors.array() });
        }
        yield (0, user_service_1.updateUserProfile)(userId, { email, first_name, last_name, weight, height, password });
        res.status(200).json({ status: "success", message: "Profile updated successfully" });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(404).json({ status: "fail", message: "Fail to update profile", error });
    }
});
exports.editProfileHandler = editProfileHandler;
/**
 * Delete a users profile
 */
const deleteProfileHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }
        const userId = req.user.id;
        // Delete user profile
        yield (0, user_service_1.deleteUserProfile)(userId);
        res.status(200).json({ status: "success", message: "Profile deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
exports.deleteProfileHandler = deleteProfileHandler;
