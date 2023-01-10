"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otp_1 = __importDefault(require("../../utils/helpers/otp"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
const user_store_1 = __importDefault(require("./user.store"));
const StatusCodesEnum_1 = __importDefault(require("../../utils/enum/StatusCodesEnum"));
const common_1 = require("../../utils/interface/common");
const errorMessageEnum_1 = __importDefault(require("../../utils/enum/errorMessageEnum"));
const joi_1 = __importDefault(require("joi"));
class UserServices {
    constructor(proxy) {
        this.userStore = new user_store_1.default();
        // User Register API_1
        this.userRegister = async (request) => {
            const response = {
                status: StatusCodesEnum_1.default.UNKNOWN_CODE,
                message: "",
            };
            const schema = joi_1.default.object().keys({
                firstName: joi_1.default.string().required(),
                lastName: joi_1.default.string().required(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().required(),
                address: joi_1.default.object({
                    location: joi_1.default.string().max(15).optional(),
                    city: joi_1.default.string().max(15).optional(),
                    state: joi_1.default.string().max(15).optional(),
                    zipCode: joi_1.default.string().max(15).optional(),
                    landMark: joi_1.default.string().max(15).optional(),
                    latitute: joi_1.default.string().max(15).optional(),
                    longitude: joi_1.default.string().max(15).optional(),
                }).optional(),
                status: joi_1.default.string().optional(),
                roles: joi_1.default.string().optional(),
            });
            const params = schema.validate(request);
            if (params.error) {
                response.status = StatusCodesEnum_1.default.UNPROCESSABLE_ENTITY;
                response.error = (0, common_1.toError)(params.error.details[0].message);
                return response;
            }
            const { firstName, lastName, email, password, address, status, roles } = params.value;
            // Check if email is already registered
            let existingUser;
            try {
                const existingUser = await this.userStore.findOneData({ email });
                if (existingUser && (existingUser === null || existingUser === void 0 ? void 0 : existingUser.email)) {
                    const errorMsg = errorMessageEnum_1.default.EMAIL_ALREADY_EXIST;
                    response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                    response.error = (0, common_1.toError)(errorMsg);
                    return response;
                }
            }
            catch (e) {
                console.error(e);
                response.status = StatusCodesEnum_1.default.INTERNAL_SERVER_ERROR;
                response.error = (0, common_1.toError)(e.message);
                return response;
            }
            /// password hash
            const salt = await bcrypt_1.default.genSalt(10);
            const passwordhash = await bcrypt_1.default.hash(request.password, salt);
            //request.password = passwordhash;
            //Save the user to storage
            const attributes = {
                firstName,
                lastName,
                email,
                password: passwordhash,
                status,
                address,
                otp: (0, otp_1.default)(999999),
                roles,
            };
            // node mailer
            const transporter = await nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
                service: "Gmail",
                auth: {
                    user: "akashuswelwins@gmail.com",
                    pass: "tbirzhxmiyiwhyqu",
                },
            }));
            const mailOption = {
                to: request.email,
                from: "akashuswelwins@gmail.com",
                subject: "node mailer OTP",
                html: `
     <div
       class="container"
       style="max-width: 90%; margin: auto; padding-top: 20px"
     >
       <h2>Welcome </h2>
       <h4>You are officially In ✔</h4>
       <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
       <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${attributes.otp}</h1>
  </div>`,
            };
            await transporter.sendMail(mailOption, function (error, info) {
                if (error) {
                    throw new Error("email not send check email");
                }
            });
            // save
            let user;
            try {
                user = await this.userStore.userRegister(attributes);
            }
            catch (e) {
                console.error(e);
                response.status = StatusCodesEnum_1.default.INTERNAL_SERVER_ERROR;
                response.error = (0, common_1.toError)(e.message);
                return response;
            }
            response.status = StatusCodesEnum_1.default.OK;
            response.message = "Success";
            response.user = user;
            console.log(response, "service response");
            return response;
        };
        //Verfiy_Email API_2
        this.verifyEmail = async (request) => {
            const response = {
                status: StatusCodesEnum_1.default.UNKNOWN_CODE,
                email: "",
                otp: undefined,
                message: "",
            };
            const extUser = await this.userStore.findOneData({ email: request.email });
            if (!extUser) {
                //throw new Error("Email donesnot exist");
                const errorMsg = errorMessageEnum_1.default.EmailInvalid;
                response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                response.error = (0, common_1.toError)(errorMsg);
                return response;
            }
            if (extUser.emailVerified == 1) {
                //throw new Error("Email allready Verified");
                const errorMsg = errorMessageEnum_1.default.Email_Allready_Verified;
                response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                response.error = (0, common_1.toError)(errorMsg);
                return response;
            }
            const userOTP = request.otp;
            if (extUser.otp !== userOTP) {
                // throw new Error("invalid Otp");
                const errorMsg = errorMessageEnum_1.default.Invalid_Otp;
                response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                response.error = (0, common_1.toError)(errorMsg);
                return response;
            }
            let updateVerifyCheck;
            try {
                updateVerifyCheck = await this.userStore.findOneDataAndUpdate({ email: request === null || request === void 0 ? void 0 : request.email }, { emailVerified: 1 });
            }
            catch (e) {
                console.error(e);
                response.status = StatusCodesEnum_1.default.INTERNAL_SERVER_ERROR;
                response.error = (0, common_1.toError)(e.message);
                return response;
            }
            response.status = StatusCodesEnum_1.default.OK;
            response.user = updateVerifyCheck;
            response.message = "Success";
            // console.log(response, "test response data");
            return response;
        };
        //LogIn_USER API_3
        this.login = async (request) => {
            const response = {
                status: StatusCodesEnum_1.default.UNKNOWN_CODE,
            };
            const schema = joi_1.default.object().keys({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().required(),
            });
            const params = schema.validate(request);
            if (params.error) {
                response.status = StatusCodesEnum_1.default.UNPROCESSABLE_ENTITY;
                response.error = (0, common_1.toError)(params.error.details[0].message);
                return response;
            }
            // const { email, password } = params.value;
            const { email, password } = params.value;
            let data;
            let token;
            try {
                //get user bu email id to check it exist or not
                data = await this.userStore.findOneData({ email, });
                token = await jsonwebtoken_1.default.sign({ _id: data._id, roles: data.roles }, "mykey", {
                    expiresIn: "1d",
                });
                // check email is verified or not
                if (data.emailVerified == 0) {
                    //throw new Error("Email is not verified");
                    const errorMsg = errorMessageEnum_1.default.Email_Not_Verified;
                    response.status = StatusCodesEnum_1.default.UNAUTHORIZED;
                    response.error = (0, common_1.toError)(errorMsg);
                    return response;
                }
                //if credentials are incorrect
                if (!data) {
                    const errorMsg = errorMessageEnum_1.default.INVALID_CREDENTIALS;
                    response.status = StatusCodesEnum_1.default.UNAUTHORIZED;
                    response.error = (0, common_1.toError)(errorMsg);
                    return response;
                }
            }
            catch (e) {
                response.status = StatusCodesEnum_1.default.INTERNAL_SERVER_ERROR;
                response.error = (0, common_1.toError)(e.message);
                return response;
            }
            //comparing password to insure that password is correct
            const isValid = await bcrypt_1.default.compare(password, data === null || data === void 0 ? void 0 : data.password);
            //if isValid or user.password is null
            if (!isValid || !(data === null || data === void 0 ? void 0 : data.password)) {
                const errorMsg = errorMessageEnum_1.default.INVALID_CREDENTIALS;
                response.status = StatusCodesEnum_1.default.UNAUTHORIZED;
                response.error = (0, common_1.toError)(errorMsg);
                return response;
            }
            response.status = StatusCodesEnum_1.default.OK;
            response.message = "Success";
            response.token = token;
            response.user = data;
            return response;
        };
        //resendVerifyEmail API_4
        this.resendVerifyEmail = async (request) => {
            const response = {
                status: StatusCodesEnum_1.default.UNKNOWN_CODE,
                message: "",
            };
            const extUser = await this.userStore.findOneData({
                email: request === null || request === void 0 ? void 0 : request.email,
            });
            if (!extUser) {
                //throw new Error("Email dont exist");
                const errorMsg = errorMessageEnum_1.default.EmailInvalid;
                response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                response.error = (0, common_1.toError)(errorMsg);
                return response;
            }
            // check email is verified or not
            if (extUser.emailVerified == 1) {
                //throw new Error("Ooops Email is verified");
                const errorMsg = errorMessageEnum_1.default.Email_Allready_Verified;
                response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                response.error = (0, common_1.toError)(errorMsg);
                return response;
            }
            // compare user input password with existing password
            const validPassword = await bcrypt_1.default.compare(request === null || request === void 0 ? void 0 : request.password, extUser.password);
            // in case of invalid password throw error
            if (!validPassword) {
                //throw new Error("Invalid Credentials ");
                const errorMsg = errorMessageEnum_1.default.Invalid_Credentials;
                response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                response.error = (0, common_1.toError)(errorMsg);
                return response;
            }
            const newOTP = (0, otp_1.default)(999999);
            // console.log(newOTP, "servotp");
            // node mailer
            const transporter = await nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
                service: "Gmail",
                auth: {
                    user: "akashuswelwins@gmail.com",
                    pass: "tbirzhxmiyiwhyqu",
                },
            }));
            const mailOption = {
                to: request.email,
                from: "akashuswelwins@gmail.com",
                subject: "node mailer OTP",
                html: `
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
            <h2>Welcome </h2>
            <h4>You are officially In ✔</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${newOTP}</h1>
       </div>`,
            };
            await transporter.sendMail(mailOption, function (error, info) {
                if (error) {
                    throw new Error("Email Error transporter");
                }
            });
            let data;
            try {
                data = await this.userStore.findOneDataAndUpdate({ email: request === null || request === void 0 ? void 0 : request.email }, { otp: newOTP });
            }
            catch (e) {
                response.status = StatusCodesEnum_1.default.INTERNAL_SERVER_ERROR;
                response.error = (0, common_1.toError)(e.message);
                return response;
            }
            response.status = StatusCodesEnum_1.default.OK;
            response.user = data;
            response.message = "Success";
            return response;
        };
        // resetPassword
        this.resetPassword = async (request) => {
            const response = {
                status: StatusCodesEnum_1.default.UNKNOWN_CODE,
                data: undefined,
                email: "",
                otp: undefined,
                message: "",
            };
            try {
                const extUser = await this.userStore.findOneData({
                    email: request.email,
                });
                //check if email exixt or not
                if (!extUser) {
                    // throw new Error("Invalid Credentials ");
                    const errorMsg = errorMessageEnum_1.default.Invalid_Credentials;
                    response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                    response.error = (0, common_1.toError)(errorMsg);
                    return response;
                }
                //OTP form user input
                const userOTP = request.otp;
                let upwd = request.newPassword;
                const passwordhash = await bcrypt_1.default.hash(upwd, 10);
                upwd = passwordhash;
                // compaire otp for input and existing otp in db
                if (extUser.otp !== userOTP) {
                    //throw new Error("invalid Otp");
                    const errorMsg = errorMessageEnum_1.default.Invalid_Otp;
                    response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                    response.error = (0, common_1.toError)(errorMsg);
                    return response;
                }
                let data;
                try {
                    const data = await this.userStore.findOneDataAndUpdate({ email: request.email }, { password: upwd });
                }
                catch (e) {
                    response.status = StatusCodesEnum_1.default.INTERNAL_SERVER_ERROR;
                    response.error = (0, common_1.toError)(e.message);
                    return response;
                }
                response.status = StatusCodesEnum_1.default.OK;
                response.data = data;
                response.message = "Success";
                return response;
            }
            catch (e) {
                return e;
            }
        };
        //getProfile
        this.getProfile = async (request) => {
            const response = {
                status: StatusCodesEnum_1.default.UNKNOWN_CODE,
                message: "",
            };
            let user;
            try {
                // user = await this.userStore.getByAttributes({ _id });
                const user = await this.userStore.findOneData({ _id: request === null || request === void 0 ? void 0 : request.userID });
                //if user's id is incorrect
                if (!user) {
                    const errorMsg = errorMessageEnum_1.default.INVALID_USER_ID;
                    response.status = StatusCodesEnum_1.default.BAD_REQUEST;
                    response.error = (0, common_1.toError)(errorMsg);
                    return response;
                }
            }
            catch (e) {
                response.status = StatusCodesEnum_1.default.INTERNAL_SERVER_ERROR;
                response.error = (0, common_1.toError)(e.message);
                return response;
            }
            response.status = StatusCodesEnum_1.default.OK;
            response.user = user;
            response.message = "Success";
            return response;
        };
        this.proxy = proxy;
    }
}
exports.default = UserServices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3VzZXIvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTBDO0FBQzFDLG9EQUE0QjtBQUM1QixnRUFBK0I7QUFDL0IsNERBQW9DO0FBQ3BDLDBGQUFzRDtBQUd0RCw4REFBcUM7QUFDckMsdUZBQTREO0FBRTVELHlEQUF1RDtBQUN2RCx5RkFBaUU7QUFDakUsOENBQXNCO0FBQ3RCLE1BQU0sWUFBWTtJQUdoQixZQUFZLEtBQXVCO1FBRjNCLGNBQVMsR0FBRyxJQUFJLG9CQUFTLEVBQUUsQ0FBQztRQU1wQyxzQkFBc0I7UUFDZixpQkFBWSxHQUFHLEtBQUssRUFDekIsT0FBb0MsRUFDVSxFQUFFO1lBQ2hELE1BQU0sUUFBUSxHQUF3QztnQkFDcEQsTUFBTSxFQUFFLHlCQUFZLENBQUMsWUFBWTtnQkFDakMsT0FBTyxFQUFFLEVBQUU7YUFDWixDQUFDO1lBRUYsTUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDL0IsU0FBUyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xDLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO2dCQUNqQyxLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDdEMsUUFBUSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pDLE9BQU8sRUFBRSxhQUFHLENBQUMsTUFBTSxDQUFDO29CQUNsQixRQUFRLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7b0JBQ3pDLElBQUksRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDckMsS0FBSyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO29CQUN0QyxPQUFPLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7b0JBQ3hDLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDekMsUUFBUSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO29CQUN6QyxTQUFTLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7aUJBQzNDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQy9CLEtBQUssRUFBQyxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO2FBQzlCLENBQUMsQ0FBQztZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNoQixRQUFRLENBQUMsTUFBTSxHQUFHLHlCQUFZLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3BELFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBQSxnQkFBTyxFQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUNELE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsR0FDbkUsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUVmLHVDQUF1QztZQUN2QyxJQUFJLFlBQW1CLENBQUM7WUFDeEIsSUFBSTtnQkFDRixNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDakUsSUFBSSxZQUFZLEtBQUksWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssQ0FBQSxFQUFFO29CQUN2QyxNQUFNLFFBQVEsR0FBRywwQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDdEQsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFdBQVcsQ0FBQztvQkFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25DLE9BQU8sUUFBUSxDQUFDO2lCQUNqQjthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyRCxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBRUQsaUJBQWlCO1lBQ2pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9ELGtDQUFrQztZQUVsQywwQkFBMEI7WUFDMUIsTUFBTSxVQUFVLEdBQVU7Z0JBQ3hCLFNBQVM7Z0JBQ1QsUUFBUTtnQkFDUixLQUFLO2dCQUNMLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixNQUFNO2dCQUNOLE9BQU87Z0JBQ1AsR0FBRyxFQUFFLElBQUEsYUFBRyxFQUFDLE1BQU0sQ0FBQztnQkFDaEIsS0FBSzthQUNOLENBQUM7WUFFRixjQUFjO1lBQ2QsTUFBTSxXQUFXLEdBQUcsTUFBTSxvQkFBVSxDQUFDLGVBQWUsQ0FDbEQsSUFBQSxtQ0FBYSxFQUFDO2dCQUNaLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLDBCQUEwQjtvQkFDaEMsSUFBSSxFQUFFLGtCQUFrQjtpQkFDekI7YUFDRixDQUFDLENBQ0gsQ0FBQztZQUNGLE1BQU0sVUFBVSxHQUFHO2dCQUNqQixFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSwwQkFBMEI7Z0JBQ2hDLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLElBQUksRUFBRTs7Ozs7Ozs7OEVBUWtFLFVBQVUsQ0FBQyxHQUFHO1NBQ25GO2FBQ0osQ0FBQztZQUVGLE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxLQUFLLEVBQUUsSUFBSTtnQkFDMUQsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUMvQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTztZQUNQLElBQUksSUFBVyxDQUFDO1lBQ2hCLElBQUk7Z0JBQ0YsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixRQUFRLENBQUMsTUFBTSxHQUFHLHlCQUFZLENBQUMscUJBQXFCLENBQUM7Z0JBQ3JELFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBQSxnQkFBTyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxRQUFRLENBQUM7YUFDakI7WUFDRCxRQUFRLENBQUMsTUFBTSxHQUFHLHlCQUFZLENBQUMsRUFBRSxDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFFMUMsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxDQUFDO1FBRUYsb0JBQW9CO1FBQ2IsZ0JBQVcsR0FBRyxLQUFLLEVBQ3hCLE9BQXlDLEVBQ0csRUFBRTtZQUM5QyxNQUFNLFFBQVEsR0FBc0M7Z0JBQ2xELE1BQU0sRUFBRSx5QkFBWSxDQUFDLFlBQVk7Z0JBQ2pDLEtBQUssRUFBRSxFQUFFO2dCQUNULEdBQUcsRUFBRSxTQUFTO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ1osQ0FBQztZQUVGLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWiwwQ0FBMEM7Z0JBQzFDLE1BQU0sUUFBUSxHQUFHLDBCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDL0MsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFdBQVcsQ0FBQztnQkFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRTtnQkFDOUIsNkNBQTZDO2dCQUM3QyxNQUFNLFFBQVEsR0FBRywwQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDMUQsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFdBQVcsQ0FBQztnQkFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQ0QsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUU1QixJQUFJLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO2dCQUMzQixrQ0FBa0M7Z0JBQ2xDLE1BQU0sUUFBUSxHQUFHLDBCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDOUMsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFdBQVcsQ0FBQztnQkFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBRUQsSUFBSSxpQkFBd0IsQ0FBQztZQUM3QixJQUFJO2dCQUNGLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FDM0QsRUFBRSxLQUFLLEVBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEtBQUssRUFBRSxFQUN6QixFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FDckIsQ0FBQzthQUNIO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyRCxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQ0QsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxRQUFRLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQzdCLCtDQUErQztZQUMvQyxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUM7UUFFRixrQkFBa0I7UUFDWCxVQUFLLEdBQUcsS0FBSyxFQUNsQixPQUF3QyxFQUNHLEVBQUU7WUFDN0MsTUFBTSxRQUFRLEdBQXFDO2dCQUNqRCxNQUFNLEVBQUUseUJBQVksQ0FBQyxZQUFZO2FBQ2xDLENBQUM7WUFDRixNQUFNLE1BQU0sR0FBRyxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUMvQixLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDdEMsUUFBUSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7YUFDbEMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLFFBQVEsQ0FBQyxNQUFNLEdBQUcseUJBQVksQ0FBQyxvQkFBb0IsQ0FBQztnQkFDcEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFELE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQ0QsNENBQTRDO1lBQzVDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUV6QyxJQUFJLElBQVcsQ0FBQztZQUNoQixJQUFJLEtBQUssQ0FBQztZQUNWLElBQUk7Z0JBQ0YsK0NBQStDO2dCQUMvQyxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssR0FBSSxDQUFDLENBQUM7Z0JBRXJELEtBQUssR0FBRyxNQUFNLHNCQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsRUFBRSxPQUFPLEVBQUU7b0JBQ2xFLFNBQVMsRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUM7Z0JBRUgsaUNBQWlDO2dCQUNqQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFO29CQUMzQiwyQ0FBMkM7b0JBQzNDLE1BQU0sUUFBUSxHQUFHLDBCQUFnQixDQUFDLGtCQUFrQixDQUFDO29CQUNyRCxRQUFRLENBQUMsTUFBTSxHQUFHLHlCQUFZLENBQUMsWUFBWSxDQUFDO29CQUM1QyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxRQUFRLENBQUMsQ0FBQztvQkFDbkMsT0FBTyxRQUFRLENBQUM7aUJBQ2pCO2dCQUVELDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxNQUFNLFFBQVEsR0FBRywwQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDdEQsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFlBQVksQ0FBQztvQkFDNUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25DLE9BQU8sUUFBUSxDQUFDO2lCQUNqQjthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyRCxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBRUQsdURBQXVEO1lBQ3ZELE1BQU0sT0FBTyxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUMsQ0FBQztZQUUvRCxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsQ0FBQSxFQUFFO2dCQUMvQixNQUFNLFFBQVEsR0FBRywwQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDdEQsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFlBQVksQ0FBQztnQkFDNUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQ0QsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxRQUFRLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUM3QixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNyQixPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUM7UUFFRix5QkFBeUI7UUFDbEIsc0JBQWlCLEdBQUcsS0FBSyxFQUM5QixPQUFnRCxFQUNHLEVBQUU7WUFDckQsTUFBTSxRQUFRLEdBQTZDO2dCQUN6RCxNQUFNLEVBQUUseUJBQVksQ0FBQyxZQUFZO2dCQUNqQyxPQUFPLEVBQUUsRUFBRTthQUNaLENBQUM7WUFFRixNQUFNLE9BQU8sR0FBUSxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO2dCQUNwRCxLQUFLLEVBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEtBQUs7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixzQ0FBc0M7Z0JBQ3RDLE1BQU0sUUFBUSxHQUFHLDBCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDL0MsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFdBQVcsQ0FBQztnQkFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBRUQsaUNBQWlDO1lBQ2pDLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLDZDQUE2QztnQkFDN0MsTUFBTSxRQUFRLEdBQUcsMEJBQWdCLENBQUMsdUJBQXVCLENBQUM7Z0JBQzFELFFBQVEsQ0FBQyxNQUFNLEdBQUcseUJBQVksQ0FBQyxXQUFXLENBQUM7Z0JBQzNDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBQSxnQkFBTyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUVELHFEQUFxRDtZQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLGdCQUFNLENBQUMsT0FBTyxDQUN4QyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxFQUNqQixPQUFPLENBQUMsUUFBUSxDQUNqQixDQUFDO1lBRUYsMENBQTBDO1lBQzFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLDBDQUEwQztnQkFDMUMsTUFBTSxRQUFRLEdBQUcsMEJBQWdCLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3RELFFBQVEsQ0FBQyxNQUFNLEdBQUcseUJBQVksQ0FBQyxXQUFXLENBQUM7Z0JBQzNDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBQSxnQkFBTyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUNELE1BQU0sTUFBTSxHQUFHLElBQUEsYUFBRyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTNCLGtDQUFrQztZQUVsQyxjQUFjO1lBQ2QsTUFBTSxXQUFXLEdBQUcsTUFBTSxvQkFBVSxDQUFDLGVBQWUsQ0FDbEQsSUFBQSxtQ0FBYSxFQUFDO2dCQUNaLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLDBCQUEwQjtvQkFDaEMsSUFBSSxFQUFFLGtCQUFrQjtpQkFDekI7YUFDRixDQUFDLENBQ0gsQ0FBQztZQUNGLE1BQU0sVUFBVSxHQUFHO2dCQUNqQixFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSwwQkFBMEI7Z0JBQ2hDLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLElBQUksRUFBRTs7Ozs7Ozs7bUZBUXVFLE1BQU07Y0FDM0U7YUFDVCxDQUFDO1lBQ0YsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxVQUFVLEtBQUssRUFBRSxJQUFJO2dCQUMxRCxJQUFJLEtBQUssRUFBRTtvQkFDVCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7aUJBQzVDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQVcsQ0FBQztZQUNoQixJQUFJO2dCQUNGLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQzlDLEVBQUUsS0FBSyxFQUFFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLEVBQUUsRUFDekIsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQ2hCLENBQUM7YUFDSDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLFFBQVEsQ0FBQyxNQUFNLEdBQUcseUJBQVksQ0FBQyxxQkFBcUIsQ0FBQztnQkFDckQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUVELFFBQVEsQ0FBQyxNQUFNLEdBQUcseUJBQVksQ0FBQyxFQUFFLENBQUM7WUFDbEMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDckIsUUFBUSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFFN0IsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxDQUFDO1FBRUYsZ0JBQWdCO1FBQ1Qsa0JBQWEsR0FBRyxLQUFLLEVBQzFCLE9BQTRDLEVBQ0csRUFBRTtZQUNqRCxNQUFNLFFBQVEsR0FBeUM7Z0JBQ3JELE1BQU0sRUFBRSx5QkFBWSxDQUFDLFlBQVk7Z0JBQ2pDLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxFQUFFO2dCQUNULEdBQUcsRUFBRSxTQUFTO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ1osQ0FBQztZQUNGLElBQUk7Z0JBQ0YsTUFBTSxPQUFPLEdBQVEsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztvQkFDcEQsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2lCQUNyQixDQUFDLENBQUM7Z0JBRUgsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNaLDJDQUEyQztvQkFDM0MsTUFBTSxRQUFRLEdBQUcsMEJBQWdCLENBQUMsbUJBQW1CLENBQUM7b0JBQ3RELFFBQVEsQ0FBQyxNQUFNLEdBQUcseUJBQVksQ0FBQyxXQUFXLENBQUM7b0JBQzNDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBQSxnQkFBTyxFQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuQyxPQUFPLFFBQVEsQ0FBQztpQkFDakI7Z0JBRUQscUJBQXFCO2dCQUNyQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUM1QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUMvQixNQUFNLFlBQVksR0FBRyxNQUFNLGdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDakQsSUFBSSxHQUFHLFlBQVksQ0FBQztnQkFFcEIsZ0RBQWdEO2dCQUNoRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO29CQUMzQixpQ0FBaUM7b0JBQ2pDLE1BQU0sUUFBUSxHQUFHLDBCQUFnQixDQUFDLFdBQVcsQ0FBQztvQkFDOUMsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFdBQVcsQ0FBQztvQkFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25DLE9BQU8sUUFBUSxDQUFDO2lCQUNqQjtnQkFFRCxJQUFJLElBQVcsQ0FBQztnQkFDaEIsSUFBSTtvQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQ3BELEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFDeEIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQ25CLENBQUM7aUJBQ0g7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLHFCQUFxQixDQUFDO29CQUNyRCxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3BDLE9BQU8sUUFBUSxDQUFDO2lCQUNqQjtnQkFDRCxRQUFRLENBQUMsTUFBTSxHQUFHLHlCQUFZLENBQUMsRUFBRSxDQUFDO2dCQUNsQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDckIsUUFBUSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQzdCLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLENBQUM7YUFDVjtRQUNILENBQUMsQ0FBQztRQUVGLFlBQVk7UUFDTCxlQUFVLEdBQUcsS0FBSyxFQUN2QixPQUFzQyxFQUNHLEVBQUU7WUFDM0MsTUFBTSxRQUFRLEdBQW1DO2dCQUMvQyxNQUFNLEVBQUUseUJBQVksQ0FBQyxZQUFZO2dCQUNqQyxPQUFPLEVBQUUsRUFBRTthQUNaLENBQUM7WUFDRixJQUFJLElBQVcsQ0FBQztZQUNoQixJQUFJO2dCQUNGLHdEQUF3RDtnQkFDeEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFeEUsMkJBQTJCO2dCQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNULE1BQU0sUUFBUSxHQUFHLDBCQUFnQixDQUFDLGVBQWUsQ0FBQztvQkFDbEQsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLFdBQVcsQ0FBQztvQkFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25DLE9BQU8sUUFBUSxDQUFDO2lCQUNqQjthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyRCxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQ0QsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBWSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNyQixRQUFRLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUM3QixPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUM7UUFsYkEsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQWtiRjtBQUNELGtCQUFlLFlBQVksQ0FBQyJ9