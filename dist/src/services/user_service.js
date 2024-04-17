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
exports.deleteUserProfile = exports.updateUserProfile = exports.getUserByEmail = exports.getUserProfile = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const saltRounds = 10;
function createUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPass = yield bcrypt_1.default.hash(userData.password, saltRounds);
        const { first_name, last_name } = userData, rest = __rest(userData, ["first_name", "last_name"]);
        const createdUser = yield prisma.user.create({
            data: Object.assign(Object.assign({}, rest), { password: hashedPass, first_name,
                last_name }),
        });
        return {
            id: createdUser.id,
            hashedPass,
            first_name,
            last_name,
            email: userData.email,
            weight: userData.weight,
            height: userData.height
        };
    });
}
exports.createUser = createUser;
function getUserProfile(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error("User not found");
        }
        // Return user profile
        return {
            id: user.id,
            password: user.password,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            weight: user.weight,
            height: user.height,
        };
    });
}
exports.getUserProfile = getUserProfile;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.findUnique({
            where: { email },
        });
    });
}
exports.getUserByEmail = getUserByEmail;
const updateUserProfile = (userId, profileData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the update includes password, hash it
        if (profileData.password) {
            const hashedPass = yield bcrypt_1.default.hash(profileData.password, saltRounds);
            // Update the plain text password with the hashed one
            profileData.password = hashedPass;
        }
        // Update the user profile
        yield prisma.user.update({
            where: { id: userId },
            data: Object.assign({}, profileData)
        });
    }
    catch (error) {
        throw new Error("Error updating user profile");
    }
});
exports.updateUserProfile = updateUserProfile;
const deleteUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }
    catch (error) {
        throw new Error(`Error deleting user profile:` + error.message);
    }
});
exports.deleteUserProfile = deleteUserProfile;
