"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_upload_1 = __importDefault(require("../../services/file_upload"));
const fileResolvers = {
    Query: {
    //hello: () => 'world'
    },
    Mutation: {
        singleUpload: file_upload_1.default.singleUpload
    }
};
exports.default = fileResolvers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZV91cGxvYWRfcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMvZmlsZV91cGxvYWRfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2RUFBbUQ7QUFDbEQsTUFBTSxhQUFhLEdBQUc7SUFDbkIsS0FBSyxFQUFFO0lBQ0wsc0JBQXNCO0tBQ3ZCO0lBQ0QsUUFBUSxFQUFDO1FBQ0wsWUFBWSxFQUFDLHFCQUFVLENBQUMsWUFBWTtLQUV2QztDQUNGLENBQUM7QUFDRixrQkFBZ0IsYUFBYSxDQUFBIn0=