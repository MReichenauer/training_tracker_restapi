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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRules = exports.createUserRules = void 0;
const express_validator_1 = require("express-validator");
const user_service_1 = require("../services/user_service");
exports.createUserRules = [
    // Checking so the first name is indeed a string with at least 3 characters
    (0, express_validator_1.body)("first_name")
        .isString().withMessage("Name has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("First name need to have at least 3 characters!"),
    // Checking so the last name is indeed a string with at least 3 characters
    (0, express_validator_1.body)("last_name")
        .isString().withMessage("Name has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("Last name need to have at least 3 characters!"),
    // Checking so it is indeed a valid email and not a already registered one
    (0, express_validator_1.body)("email")
        .isString().withMessage("Email needs to be a string!")
        .trim().isEmail().withMessage("That email was not a valid one!").bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_service_1.getUserByEmail)(value);
        if (user) {
            throw new Error("The email you tried to enter is already a registered one!");
        }
    })),
    // Checking so the password is a string with at least 6 characters
    (0, express_validator_1.body)("password")
        .isString().withMessage("Password needs to be a string").bail()
        .trim().isLength({ min: 6 }).withMessage("Password needs to have at least 6 characters"),
];
exports.updateUserRules = [
    // Checking so the first name is indeed a string with at least 3 characters
    (0, express_validator_1.body)("first_name").optional()
        .isString().withMessage("Name has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("First name need to have at least 3 characters!"),
    // Checking so the last name is indeed a string with at least 3 characters
    (0, express_validator_1.body)("last_name").optional()
        .isString().withMessage("Name has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("Last name need to have at least 3 characters!"),
    // Checking so it is indeed a valid email and not a already registered one
    (0, express_validator_1.body)("email").optional()
        .isString().withMessage("Email needs to be a string!")
        .trim().isEmail().withMessage("That email was not a valid one!").bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_service_1.getUserByEmail)(value);
        if (user) {
            throw new Error("The email you tried to enter is already a registered one!");
        }
    })),
    // Checking so the password is a string with at least 6 characters
    (0, express_validator_1.body)("password").optional()
        .isString().withMessage("Password needs to be a string").bail()
        .trim().isLength({ min: 6 }).withMessage("Password needs to have at least 6 characters"),
];
