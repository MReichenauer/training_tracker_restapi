"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgressRules = exports.createProgressRules = void 0;
const express_validator_1 = require("express-validator");
exports.createProgressRules = [
    (0, express_validator_1.body)("date")
        .isISO8601().withMessage("Date must be in format (yyyy-mm-dd)"),
    (0, express_validator_1.body)("exercise")
        .isString().withMessage("Exercise must be a string").bail()
        .trim().notEmpty().withMessage("Exercise cannot be empty"),
    (0, express_validator_1.body)("weight")
        .isFloat({ min: 0 }).withMessage("Weight must be 0 or more"),
    (0, express_validator_1.body)("reps")
        .isInt({ min: 1 }).withMessage("Reps must be a 1 or more"),
];
exports.updateProgressRules = [
    (0, express_validator_1.body)("date").optional().isISO8601().withMessage("Date must be in format (yyyy-mm-dd)"),
    (0, express_validator_1.body)("exercise").optional().isString().withMessage("Exercise needs to be a string").trim().notEmpty(),
    (0, express_validator_1.body)("weight").optional().isFloat({ min: 0 }).withMessage("Weight must be 0 or more"),
    (0, express_validator_1.body)("reps").optional().isInt({ min: 1 }).withMessage("Reps must be a 1 or more"),
];
