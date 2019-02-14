import { AppError, AppErrorStatus } from "./error/error.model";

export class NewError {
    static type = "[AppError] New Error";
    constructor(public payload: AppError ) {}    
}

export class ClearErrors {
    static type = "[AppError] Clear Errors";
}

export class SetErrorStatus {
    static type = "[AppError] Set Status";
    constructor(public payload: { id: number, status: AppErrorStatus} ) {}
}
