import StatusCodeEnum from "../enum/StatusCodesEnum";
import ErrorMessageEnum from "../enum/errorMessageEnum";
export interface IResponse {
    status: StatusCodeEnum;
    error?: IError;
}
export interface IError {
    message?: string;
    status?: ErrorMessageEnum;
}
export declare function joiToError(joiError: any): IError;
export declare function toError(message: string): IError;
