export enum AppErrorCode {
    TEST = 0,

    /* Rom Errors */
    ROM_VERSION = 1000,
    
}

export enum AppErrorStatus {
    UNREAD,
    READ
}

export interface AppError {
    id?: number;
    code: AppErrorCode;
    status: AppErrorStatus;
    message: string;
}

export const AppErrorMessages = {
    TEST: 'Test Error Message',
    ROM_VERSION: 'The supplied ROM does not match a supported version.',
}