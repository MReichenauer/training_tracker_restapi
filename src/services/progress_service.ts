import { PrismaClient } from "@prisma/client";
import { CreateProgress, UpdateProgressResult } from "../types/progress_types";
import Debug from "debug";

const prisma = new PrismaClient();
const debug = Debug("prisma-debug_progress:Hello from progress_service");

export async function createProgress(userId: number, progressData: CreateProgress) {
    const { userId: _, ...rest } = progressData;
    const parsedDate = new Date(progressData.date);

    // Make sure the date is valid
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format. Date should be in the format "YYYY-MM-DD".');
    }

    // Create progress
    return prisma.progress.create({
        data: {
            ...rest,
            date: parsedDate,
            user: { connect: { id: userId } }
        }
    });
}

export async function getUserProgress(userId: number) {
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
}

export async function getProgressById(progressId: number, userId: number) {
    return prisma.progress.findUnique({
        where: {
            id: progressId,
            userId: userId
        },
    });
}

export async function deleteProgressById(progressId: number, userId: number) {
    return prisma.progress.delete({
        where: {
            id: progressId,
            userId: userId
        },
    });
}

export async function updateProgressById(progressId: number, data: CreateProgress, userId: number): Promise<UpdateProgressResult> {
    try {
        // Check if the progress belongs to the user
        const existingProgress = await prisma.progress.findUnique({
            where: { id: progressId },
        });

        if (!existingProgress || existingProgress.userId !== userId) {
            return {
                status: "error",
                message: "Progress not found, or progress doesn't belong to this user",
            };
        }

        const updatedProgress = await prisma.progress.update({
            where: { id: progressId },
            data,
        });
        return { status: "success", data: updatedProgress };
    } catch (error) {
        debug("Error updating progress:", error);
        return { status: "error", message: "Internal server error" };
    }
}
