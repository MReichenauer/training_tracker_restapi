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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgressById = exports.deleteProgressById = exports.getProgressById = exports.getUserProgress = exports.createProgress = void 0;
const client_1 = require("@prisma/client");
const debug_1 = __importDefault(require("debug"));
const prisma = new client_1.PrismaClient();
const debug = (0, debug_1.default)("prisma-debug_progress:Hello from progress_service");
function createProgress(userId, progressData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId: _ } = progressData, rest = __rest(progressData, ["userId"]);
        const parsedDate = new Date(progressData.date);
        // Make sure the date is valid
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format. Date should be in the format "YYYY-MM-DD".');
        }
        // Create progress
        return prisma.progress.create({
            data: Object.assign(Object.assign({}, rest), { date: parsedDate, user: { connect: { id: userId } } })
        });
    });
}
exports.createProgress = createProgress;
function getUserProgress(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.progress.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                date: true,
                exercise: true,
                weight: true,
                reps: true,
            },
        });
    });
}
exports.getUserProgress = getUserProgress;
function getProgressById(progressId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.progress.findUnique({
            where: {
                id: progressId,
                userId: userId
            },
        });
    });
}
exports.getProgressById = getProgressById;
function deleteProgressById(progressId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.progress.delete({
            where: {
                id: progressId,
                userId: userId
            },
        });
    });
}
exports.deleteProgressById = deleteProgressById;
function updateProgressById(progressId, data, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the progress belongs to the user
            const existingProgress = yield prisma.progress.findUnique({
                where: { id: progressId },
            });
            if (!existingProgress || existingProgress.userId !== userId) {
                return {
                    status: "error",
                    message: "Progress not found, or progress doesn't belong to this user",
                };
            }
            const updatedProgress = yield prisma.progress.update({
                where: { id: progressId },
                data,
            });
            return { status: "success", data: updatedProgress };
        }
        catch (error) {
            debug("Error updating progress:", error);
            return { status: "error", message: "Internal server error" };
        }
    });
}
exports.updateProgressById = updateProgressById;
