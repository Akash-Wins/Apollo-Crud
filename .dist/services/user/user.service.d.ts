import * as IUserServices from "./IUserServices";
import { IAppServiceProxy } from "../app_service_proxy";
declare class UserServices implements IUserServices.IUserServiceAPI {
    private userStore;
    private proxy;
    constructor(proxy: IAppServiceProxy);
    userRegister: (request: IUserServices.IuserRegister) => Promise<IUserServices.IRegisterUserResponse>;
    verifyEmail: (request: IUserServices.IUserVerifyRequest) => Promise<IUserServices.IUserVerifyResponse>;
    login: (request: IUserServices.ILoginUserRequest) => Promise<IUserServices.ILoginUserResponse>;
    resendVerifyEmail: (request: IUserServices.IResendVerifyEmailRequest) => Promise<IUserServices.IResendVerifyEmailResponse>;
    resetPassword: (request: IUserServices.IResetPasswordRequest) => Promise<IUserServices.IResetPasswordResponse>;
    getProfile: (request: IUserServices.IGetUserRequest) => Promise<IUserServices.IGetUserResponse>;
}
export default UserServices;
