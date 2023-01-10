"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthValidation {
    Validattion(context) {
        let authorization = context.token;
        const token = authorization.replace("Bearer ", "");
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "mykey");
            context.user = decoded;
        }
        catch (Error) {
            throw new Error('Invalid Credentials jwt token ');
        }
    }
}
exports.default = new AuthValidation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aF9taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL21pZGRsZXdhcmUvYXV0aF9taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQStCO0FBQy9CLE1BQU0sY0FBYztJQUNoQixXQUFXLENBQUMsT0FBTztRQUVmLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7UUFDakMsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDbEQsSUFBSTtZQUNBLE1BQU0sT0FBTyxHQUFHLHNCQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUMxQyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtTQUN6QjtRQUNELE9BQU8sS0FBSyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1NBQ3BEO0lBQ0wsQ0FBQztDQUNKO0FBQ0Qsa0JBQWUsSUFBSSxjQUFjLENBQUMifQ==