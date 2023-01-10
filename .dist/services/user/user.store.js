"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDb = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("../../models/user"));
exports.userSchema = new mongoose_1.Schema(user_1.default);
exports.UserDb = (0, mongoose_1.model)("user", exports.userSchema);
class UserStore {
    /**
     * creating new user and saving in Database
     */
    /* user register  */
    async userRegister(userInput) {
        const user = new exports.UserDb(userInput);
        let savedUser;
        try {
            savedUser = await user.save();
        }
        catch (e) {
            return e;
        }
        return savedUser;
    }
    async findOneData(attributes) {
        try {
            const a = await exports.UserDb.findOne(attributes).lean();
            return a;
        }
        catch (e) {
            return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
        }
    }
    async findOneDataAndUpdate(attributes, toUpdate) {
        return await exports.UserDb.findOneAndUpdate(attributes, toUpdate).lean();
    }
}
exports.default = UserStore;
UserStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super("An error occured while processing the request.");
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2VyL3VzZXIuc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsdUNBQWdEO0FBQ2hELDZEQUE2QztBQUtoQyxRQUFBLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQUMsY0FBWSxDQUFDLENBQUM7QUFDdEMsUUFBQSxNQUFNLEdBQXNCLElBQUEsZ0JBQUssRUFBYSxNQUFNLEVBQUUsa0JBQVUsQ0FBQyxDQUFDO0FBRS9FLE1BQXFCLFNBQVM7SUFPNUI7O09BRUc7SUFDSCxvQkFBb0I7SUFDcEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFnQjtRQUNqQyxNQUFNLElBQUksR0FBRyxJQUFJLGNBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLFNBQWdCLENBQUM7UUFDckIsSUFBSTtZQUNGLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQWtCO1FBQ3pDLElBQUc7WUFDRCxNQUFNLENBQUMsR0FBRyxNQUFNLGNBQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEQsT0FBTyxDQUFDLENBQUE7U0FDVDtRQUFBLE9BQU0sQ0FBQyxFQUFDO1lBQ1AsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsb0JBQW9CLENBQUMsVUFBa0IsRUFBRSxRQUFnQjtRQUNwRSxPQUFPLE1BQU0sY0FBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwRSxDQUFDOztBQWpDSCw0QkFrQ0M7QUFqQ2UsZ0NBQXNCLEdBQUcsS0FBTSxTQUFRLEtBQUs7SUFDeEQ7UUFDRSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0YsQ0FBQyJ9