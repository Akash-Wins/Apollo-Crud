"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import UserServices from "../../services/user/user.service";
const app_service_proxy_1 = __importDefault(require("../../services/app_service_proxy"));
const auth_middleware_1 = __importDefault(require("../../utils/middleware/auth_middleware"));
const StatusCodesEnum_1 = __importDefault(require("../../utils/enum/StatusCodesEnum"));
const apollo_server_express_1 = require("apollo-server-express");
exports.default = {
    Query: {
        //Verfiy_Email API_2
        async verifyEmailOtp(parent, args) {
            const { OTP: { email, otp }, } = args;
            let request = {
                email,
                otp,
            };
            let response;
            try {
                response = await app_service_proxy_1.default.user.verifyEmail(request);
            }
            catch (e) {
                throw new Error("error");
            }
            return response;
        },
        //LogIn_USER API_3
        async login(parent, args) {
            const { email, password } = args;
            let request = {
                email,
                password,
            };
            let response = {
                status: StatusCodesEnum_1.default.UNKNOWN_CODE,
            };
            try {
                let response = await app_service_proxy_1.default.user.login(request);
                if (response.status !== StatusCodesEnum_1.default.OK) {
                    throw new apollo_server_express_1.ApolloError(response.error.message, response.status.toString());
                }
                return response;
            }
            catch (e) {
                throw new Error("error");
            }
        },
        //Get PROFILE
        async getProfile(parent, args, context) {
            await auth_middleware_1.default.Validattion(context);
            const userID = context.user._id;
            let request = { userID };
            let response;
            try {
                response = await app_service_proxy_1.default.user.getProfile(request);
                return response;
            }
            catch (e) {
                throw e;
            }
        },
    },
    Mutation: {
        //userRegister
        async userRegistor(parent, args) {
            const { register: { firstName, lastName, email, password, address, status, roles }, } = args;
            let request = {
                firstName,
                lastName,
                email,
                password,
                address,
                status,
                roles,
            };
            let response;
            try {
                response = await app_service_proxy_1.default.user.userRegister(request);
                if (response.status !== StatusCodesEnum_1.default.OK) {
                    throw new apollo_server_express_1.ApolloError(response.error.message, response.status.toString());
                }
            }
            catch (e) {
                throw e;
            }
            return response;
        },
        // resendVerifyEmail
        async resendVerifyEmail(parent, args) {
            const { resendOTP: { email, password }, } = args;
            let request = {
                email,
                password,
            };
            let response;
            try {
                let response = await app_service_proxy_1.default.user.resendVerifyEmail(request);
                return response;
            }
            catch (e) {
                throw e;
            }
        },
        // resetPassword
        async resetPassword(parent, args) {
            const { resetPassword: { email, newPassword, otp }, } = args;
            let request = {
                email,
                newPassword,
                otp,
            };
            let response;
            try {
                response = await app_service_proxy_1.default.user.resetPassword(request);
                return response;
            }
            catch (e) {
                throw e;
            }
        },
    }
};
// export default userResolvers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3Jlc29sdmVycy91c2VyX3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQStEO0FBQy9ELHlGQUFxRDtBQUVyRCw2RkFBb0U7QUFDcEUsdUZBQTREO0FBQzVELGlFQUFvRDtBQUNwRCxrQkFBZTtJQUNiLEtBQUssRUFBRTtRQUNMLG9CQUFvQjtRQUNwQixLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJO1lBQy9CLE1BQU0sRUFDSixHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQ3BCLEdBQUcsSUFBSSxDQUFDO1lBQ1QsSUFBSSxPQUFPLEdBQW9DO2dCQUM3QyxLQUFLO2dCQUNMLEdBQUc7YUFDSixDQUFDO1lBRUQsSUFBSSxRQUEwQyxDQUFDO1lBQ2hELElBQUk7Z0JBQ0QsUUFBUSxHQUFHLE1BQU0sMkJBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25EO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxrQkFBa0I7UUFDbEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSTtZQUN0QixNQUFNLEVBQ0gsS0FBSyxFQUFFLFFBQVEsRUFDakIsR0FBRyxJQUFJLENBQUM7WUFFVCxJQUFJLE9BQU8sR0FBb0M7Z0JBQzdDLEtBQUs7Z0JBQ0wsUUFBUTthQUVULENBQUM7WUFFRixJQUFJLFFBQVEsR0FBcUM7Z0JBQy9DLE1BQU0sRUFBRSx5QkFBWSxDQUFDLFlBQVk7YUFDbEMsQ0FBQztZQUVGLElBQUk7Z0JBQ0YsSUFBSSxRQUFRLEdBQUcsTUFBTSwyQkFBSyxDQUFDLElBQUksQ0FBQyxL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