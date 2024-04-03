import { Progress } from "@prisma/client";

export type CreateProgress = Omit<Progress, "id">;

export type UpdateProgressResult =
  | { status: "success"; data: Progress }
  | { status: "error"; message: string };
