
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUser } from "../types/user_types";

const prisma = new PrismaClient();
const saltRounds = 10;

export async function createUser(userData: CreateUser):
  Promise<{
    id: number;
    hashedPass: string;
    first_name: string;
    last_name: string;
    email: string,
    weight?: number;
    height?: number;
  }> {
    const hashedPass = await bcrypt.hash(userData.password, saltRounds);
    const { first_name, last_name, ...rest } = userData;
    const createdUser = await prisma.user.create({
      data: {
        ...rest,
        password: hashedPass,
        first_name,
        last_name
      },
    });
    return {
      id: createdUser.id,
      hashedPass,
      first_name,
      last_name,
      email: userData.email,
      weight: userData.weight as number,
      height: userData.height as number
    };
}

export async function getUserProfile(email: string) {
    const user = await prisma.user.findUnique({
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
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export const updateUserProfile = async (userId: number, profileData: any) => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { ...profileData }
        });
    } catch (error:any) {
        throw new Error("Error updating user profile: " + error.message);
    }
};

export const deleteUserProfile = async (userId: number) => {
    try {
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });
    } catch (error:any) {
        throw new Error(`Error deleting user profile:` + error.message);
    }
};
