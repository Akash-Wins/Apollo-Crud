"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user/user.service"));
const post_service_1 = __importDefault(require("./post/post.service"));
class AppServicesProxy {
    constructor() {
        this.user = new user_service_1.default(this),
            this.post = new post_service_1.default(this);
    }
}
exports.default = new AppServicesProxy();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3NlcnZpY2VfcHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYXBwX3NlcnZpY2VfcHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1RUFBK0M7QUFDL0MsdUVBQStDO0FBUS9DLE1BQU0sZ0JBQWdCO0lBR2xCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRSxJQUFJLHNCQUFZLENBQUMsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxzQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BDLENBQUM7Q0FDSjtBQUNELGtCQUFlLElBQUksZ0JBQWdCLEVBQUUsQ0FBQSJ9