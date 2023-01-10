import * as IUserServices from "../../services/user/IUserServices";
declare const _default: {
    Query: {
        verifyEmailOtp(parent: any, args: any): Promise<IUserServices.IUserVerifyResponse>;
        login(parent: any, args: any): Promise<IUserServices.ILoginUserResponse>;
        getProfile(parent: any, args: any, context: any): Promise<IUserServices.IGetUserResponse>;
    };
    Mutation: {
        userRegistor(parent: any, args: any): Promise<IUserServices.IRegisterUserResponse>;
        resendVerifyEmail(parent: any, args: any): Promise<IUserServices.IResendVerifyEmailResponse>;
        resetPassword(parent: any, args: any): Promise<IUserServices.IResetPasswordResponse>;
    };
};
export default _default;
