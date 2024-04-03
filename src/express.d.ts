import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            userCredentials?: {
                email: string;
                password: string;
				id: number;
            };
        }
    }
}
