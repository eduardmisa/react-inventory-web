export interface IBaseException {
    code: number;
    message: string;
}

export class ServiceException implements IBaseException {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}
