"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import PostServices from "../../services/post/post.service";
const app_service_proxy_1 = __importDefault(require("../../services/app_service_proxy"));
const auth_middleware_1 = __importDefault(require("../../utils/middleware/auth_middleware"));
//  const userPostResolvers = {
exports.default = {
    Query: {
        //hello: () => 'world'
        async getTimeLine(parent, args, context) {
            await auth_middleware_1.default.Validattion(context);
            const userId = context.user._id;
            let request = { userId };
            try {
                let displayData = await app_service_proxy_1.default.post.getTimeLine(request);
                return displayData;
            }
            catch (e) {
                throw e;
            }
        },
    },
    Mutation: {
        //Addpost
        async addPosts(parent, args, context) {
            await auth_middleware_1.default.Validattion(context);
            const userId = context.user._id;
            const { userPost: { fields: { description, imgUrl, title, videoType, videoUrl }, status, type, }, } = args;
            let request = {
                fields: {
                    description,
                    title,
                    imgUrl,
                    videoType,
                    videoUrl,
                },
                status,
                type,
                userId,
            };
            let myresponse;
            try {
                myresponse = await app_service_proxy_1.default.post.addPosts(request);
            }
            catch (e) {
                throw new Error("error");
            }
            return myresponse;
        },
        //update post
        async updatePost(parent, args, context) {
            await auth_middleware_1.default.Validattion(context);
            const userId = context.user._id;
            const { userPost: { fields: { description, imgUrl, title, videoType, videoUrl }, status, type, id }, } = args;
            let request = {
                fields: {
                    description,
                    title,
                    imgUrl,
                    videoType,
                    videoUrl,
                },
                status,
                type,
                userId,
                id
            };
            let myresponse;
            try {
                myresponse = await app_service_proxy_1.default.post.updatePost(request);
            }
            catch (e) {
                throw new Error("error");
            }
            return myresponse;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9wb3N0c19yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3Jlc29sdmVycy91c2VyX3Bvc3RzX3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQStEO0FBQy9ELHlGQUFxRDtBQUVyRCw2RkFBb0U7QUFDcEUsK0JBQStCO0FBRS9CLGtCQUFlO0lBQ2IsS0FBSyxFQUFFO1FBQ0wsc0JBQXNCO1FBQ3RCLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPO1lBQ3JDLE1BQU0seUJBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFFaEMsSUFBSSxPQUFPLEdBQTJCLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDakQsSUFBSTtnQkFDRixJQUFJLFdBQVcsR0FBRyxNQUFNLDJCQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEQsT0FBTyxXQUFXLENBQUM7YUFDcEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLENBQUMsQ0FBQzthQUNUO1FBQ0gsQ0FBQztLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsU0FBUztRQUNULEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPO1lBQ2xDLE1BQU0seUJBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDaEMsTUFBTSxFQUNKLFFBQVEsRUFBRSxFQUNSLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsRUFDM0QsTUFBTSxFQUNOLElBQUksR0FDTCxHQUNGLEdBQUcsSUFBSSxDQUFDO1lBQ1QsSUFBSSxPQUFPLEdBQTJCO2dCQUNwQyxNQUFNLEVBQUU7b0JBQ04sV0FBVztvQkFDWCxLQUFLO29CQUNMLE1BQU07b0JBQ04sU0FBUztvQkFDVCxRQUFRO2lCQUNUO2dCQUNELE1BQU07Z0JBQ04sSUFBSTtnQkFDSixNQUFNO2FBQ1AsQ0FBQztZQUVGLElBQUksVUFBVSxDQUFDO1lBQ2YsSUFBSTtnQkFDRixVQUFVLEdBQUcsTUFBTSwyQkFBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQztRQUdELGFBQWE7UUFDYixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTztZQUNwQyxNQUFNLHlCQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ2hDLE1BQU0sRUFDSixRQUFRLEVBQUUsRUFDUixNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEVBQzNELE1BQU0sRUFDTixJQUFJLEVBQ0osRUFBRSxFQUNILEdBQ0YsR0FBRyxJQUFJLENBQUM7WUFDVCxJQUFJLE9BQU8sR0FBOEI7Z0JBQ3ZDLE1BQU0sRUFBRTtvQkFDTixXQUFXO29CQUNYLEtBQUs7b0JBQ0wsTUFBTTtvQkFDTixTQUFTO29CQUNULFFBQVE7aUJBQ1Q7Z0JBQ0QsTUFBTTtnQkFDTixJQUFJO2dCQUNKLE1BQU07Z0JBQ04sRUFBRTthQUNILENBQUM7WUFDRixJQUFJLFVBQVUsQ0FBQztZQUNmLElBQUk7Z0JBQ0YsVUFBVSxHQUFHLE1BQU0sMkJBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25EO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQjtZQUNELE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7S0FDRjtDQUNGLENBQUEifQ==