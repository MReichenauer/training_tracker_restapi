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
exports.deleteProgressHandler = exports.updateProgressHandler = exports.getOneProgressHandler = exports.getUserProgressHandler = exports.createProgressHandler = void 0;
const express_validator_1 = require("express-validator");
const progress_service_1 = require("../services/progress_service");
const user_service_1 = require("../services/user_service");
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("prisma-debug_progress:Hello from progress_controller");
const createProgressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }
        const { email } = req.user;
        const userProfile = yield (0, user_service_1.getUserProfile)(email);
        const userId = userProfile.id;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", data: errors.array() });
        }
        // Create progress
        const progressData = req.body;
        const createdProgress = yield (0, progress_service_1.createProgress)(userId, progressData);
        res.status(201).json({
            status: "success",
            data: createdProgress,
        });
    }
    catch (error) {
        debug("Error creating progress:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
exports.createProgressHandler = createProgressHandler;
const getUserProgressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }
        const { email } = req.user;
        const userProfile = yield (0, user_service_1.getUserProfile)(email);
        const userId = userProfile.id;
        const userProgress = yield (0, progress_service_1.getUserProgress)(userId);
        res.status(200).json({
            status: "success",
            data: userProgress,
        });
    }
    catch (error) {
        debug("Error fetching user's progress:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
exports.getUserProgressHandler = getUserProgressHandler;
const getOneProgressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progressId = parseInt(req.params.progressId);
        const userId = req.user.id;
        if (!req.user) {
            return res.status(401).json({ message: "You need authorization to do this!" });
        }
        const progress = yield (0, progress_service_1.getProgressById)(progressId, userId);
        if (!progress) {
            return res.status(404).json({ status: "fail", message: "Progress not found" });
        }
        res.status(200).json({ status: "success", data: progress });
    }
    catch (error) {
        debug("Error fetching progress by ID:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
exports.getOneProgressHandler = getOneProgressHandler;
const updateProgressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get progressId from request
        const progressId = parseInt(req.params.progressId);
        // Get userId from user credentials
        const userId = req.user.id;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", data: errors.array() });
        }
        const updateProgress = yield (0, progress_service_1.updateProgressById)(progressId, req.body, userId);
        if (updateProgress.status === "error") {
            return res.status(404).json({ status: "fail", message: updateProgress.message });
        }
        res.status(200).json({ status: "success", data: updateProgress.data, });
    }
    catch (error) {
        debug("Error updating progress:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
exports.updateProgressHandler = updateProgressHandler;
const deleteProgressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get progressId from request
        const progressId = parseInt(req.params.progressId);
        // Get userId from user credentials
        const userId = req.user.id;
        // Check if the progress belongs to the user
        const progress = yield (0, progress_service_1.getProgressById)(progressId, userId);
        if (!progress) {
            return res.status(401).json({ status: "fail", message: "Unauthorized. Progress does not belong to the user." });
        }
        // Delete the progress
        yield (0, progress_service_1.deleteProgressById)(progressId, userId);
        // Send success response
        res.status(200).json({ status: "success", message: "Progress deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting progress:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
exports.deleteProgressHandler = deleteProgressHandler;
