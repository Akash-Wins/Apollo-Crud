"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
const otp_1 = __importDefault(require("./otp"));
class NodeMailer {
    async mails(parent, args) {
        const transporter = await nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
            service: 'Gmail',
            auth: {
                user: "akashuswelwins@gmail.com",
                pass: "tbirzhxmiyiwhyqu",
            },
        }));
        const mailOption = {
            to: args.register.email,
            from: "akashuswelwins@gmail.com",
            subject: "node mailer OTP",
            html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp_1.default}</h1>
   </div>`
        };
        await transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                throw new Error('message: MESSAGES.NOT_SENT');
            }
        });
    }
}
exports.default = new NodeMailer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2hlbHBlcnMvbWFpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW1DO0FBQ25DLDBGQUFxRDtBQUNyRCxnREFBdUI7QUFDdkIsTUFBTSxVQUFVO0lBQ1osS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsSUFBSTtRQUNuQixNQUFNLFdBQVcsR0FBRyxNQUFNLG9CQUFVLENBQUMsZUFBZSxDQUFDLElBQUEsbUNBQWEsRUFBQztZQUMvRCxPQUFPLEVBQUMsT0FBTztZQUNmLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsMEJBQTBCO2dCQUNoQyxJQUFJLEVBQUUsa0JBQWtCO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixNQUFNLFVBQVUsR0FBRztZQUNqQixFQUFFLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQ3RCLElBQUksRUFBRSwwQkFBMEI7WUFDaEMsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixJQUFJLEVBQUU7Ozs7Ozs7OytFQVE2RCxhQUFHO1VBQ3hFO1NBQ0MsQ0FBQztRQUNILE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxLQUFLLEVBQUUsSUFBSTtZQUN6RCxJQUFJLEtBQUssRUFBRTtnQkFFUixNQUFNLElBQUksS0FBSyxDQUFHLDRCQUE0QixDQUFDLENBQUE7YUFFL0M7UUFFSCxDQUFDLENBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDSjtBQUVELGtCQUFlLElBQUksVUFBVSxDQUFBIn0=