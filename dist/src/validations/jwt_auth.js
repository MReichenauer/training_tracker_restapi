"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenForUser = exports.jwtAuthMiddleware = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Get the secret key 🗝️
const secretKey = process.env.JWT_SECRET || "notSosecretlol";
// Generate token
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "24h" });
};
exports.generateToken = generateToken;
// verify token
const jwtAuthMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ status: "fail", message: "No token provided" });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: "fail", message: "Failed to authenticate token" });
        }
        // verify the tokens content
        console.log("Decoded token:", decoded);
        // Attach decoded user data to the request object
        req.user = decoded;
        next();
    });
};
exports.jwtAuthMiddleware = jwtAuthMiddleware;
const generateTokenForUser = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };
    return (0, exports.generateToken)(payload);
};
exports.generateTokenForUser = generateTokenForUser;
