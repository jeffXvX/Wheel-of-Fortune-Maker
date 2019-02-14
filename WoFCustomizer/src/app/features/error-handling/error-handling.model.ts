import { AppError } from "./error/error.model";

export interface AppErrorHandling {
    errors: AppError[];
    nextId: number;
}

