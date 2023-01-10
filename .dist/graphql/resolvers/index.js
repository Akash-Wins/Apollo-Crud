"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const user_posts_resolver_1 = __importDefault(require("./user_posts_resolver"));
const file_upload_resolver_1 = __importDefault(require("./file_upload_resolver"));
const user_resolver_1 = __importDefault(require("./user_resolver"));
const resolvers = (0, merge_1.mergeResolvers)([
    user_resolver_1.default,
    user_posts_resolver_1.default,
    file_upload_resolver_1.default,
]);
exports.default = resolvers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBc0Q7QUFDdEQsZ0ZBQXNEO0FBQ3RELGtGQUFrRDtBQUNsRCxvRUFBNEM7QUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBQSxzQkFBYyxFQUFFO0lBQzlCLHVCQUFhO0lBQ2IsNkJBQWlCO0lBQ2pCLDhCQUFhO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLGtCQUFlLFNBQVMsQ0FBQSJ9