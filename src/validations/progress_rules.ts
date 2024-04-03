import { body } from "express-validator";

export const createProgressRules = [
    body("date")
        .isISO8601().withMessage("Date must be in format (yyyy-mm-dd)"),
    body("exercise")
        .isString().withMessage("Exercise must be a string").bail()
        .trim().notEmpty().withMessage("Exercise cannot be empty"),
    body("weight")
        .isFloat({ min: 0 }).withMessage("Weight must be 0 or more"),
    body("reps")
        .isInt({ min: 1 }).withMessage("Reps must be a 1 or more"),
];

export const updateProgressRules = [
    body("date").optional().isISO8601().withMessage("Date must be in format (yyyy-mm-dd)"),
    body("exercise").optional().isString().withMessage("Exercise needs to be a string").trim().notEmpty(),
    body("weight").optional().isFloat({ min: 0 }).withMessage("Weight must be 0 or more"),
    body("reps").optional().isInt({ min: 1 }).withMessage("Reps must be a 1 or more"),
];
