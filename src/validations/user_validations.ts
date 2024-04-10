import { body } from "express-validator";
import { getUserByEmail } from "../services/user_service";

export const createUserRules = [
    // Checking so the first name is indeed a string with at least 3 characters
    body("first_name")
        .isString().withMessage("Name has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("First name need to have at least 3 characters!"),

	// Checking so the last name is indeed a string with at least 3 characters
	body("last_name")
		.isString().withMessage("Name has to be a string").bail()
		.trim().isLength({ min: 3 }).withMessage("Last name need to have at least 3 characters!"),

    // Checking so it is indeed a valid email and not a already registered one
    body("email")
		.isString().withMessage("Email needs to be a string!")
        .trim().isEmail().withMessage("That email was not a valid one!").bail()
        .custom(async (value) => {
            const user = await getUserByEmail(value);
            if (user) {
                throw new Error("The email you tried to enter is already a registered one!");
            }
        }),

    // Checking so the password is a string with at least 6 characters
    body("password")
        .isString().withMessage("Password needs to be a string").bail()
        .trim().isLength({ min: 6 }).withMessage("Password needs to have at least 6 characters"),
];

export const updateUserRules = [
    // Checking so the first name is indeed a string with at least 3 characters
    body("first_name").optional()
        .isString().withMessage("Name has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("First name need to have at least 3 characters!"),

	// Checking so the last name is indeed a string with at least 3 characters
	body("last_name").optional()
		.isString().withMessage("Name has to be a string").bail()
		.trim().isLength({ min: 3 }).withMessage("Last name need to have at least 3 characters!"),

    // Checking so it is indeed a valid email and not a already registered one
    body("email").optional()
		.isString().withMessage("Email needs to be a string!")
        .trim().isEmail().withMessage("That email was not a valid one!").bail()
        .custom(async (value) => {
            const user = await getUserByEmail(value);
            if (user) {
                throw new Error("The email you tried to enter is already a registered one!");
            }
        }),

    // Checking so the password is a string with at least 6 characters
    body("password").optional()
        .isString().withMessage("Password needs to be a string").bail()
        .trim().isLength({ min: 6 }).withMessage("Password needs to have at least 6 characters"),
];
