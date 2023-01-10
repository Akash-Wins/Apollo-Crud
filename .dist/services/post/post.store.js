"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPostDb = exports.videoPostSchema = exports.ImagePostDb = exports.imagePostSchema = exports.TextPostDb = exports.textPostSchema = exports.PostDb = exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const user_post_1 = __importDefault(require("../../models/user_post"));
const post_img_1 = __importDefault(require("../../models/post_img"));
const post_text_1 = __importDefault(require("../../models/post_text"));
const post_video_1 = __importDefault(require("../../models/post_video"));
exports.postSchema = new mongoose_1.Schema(user_post_1.default);
exports.PostDb = (0, mongoose_1.model)("post", exports.postSchema);
exports.textPostSchema = new mongoose_1.Schema(post_text_1.default);
exports.TextPostDb = (0, mongoose_1.model)("textpost", exports.textPostSchema);
exports.imagePostSchema = new mongoose_1.Schema(post_img_1.default);
exports.ImagePostDb = (0, mongoose_1.model)("imagepost", exports.imagePostSchema);
exports.videoPostSchema = new mongoose_1.Schema(post_video_1.default);
exports.VideoPostDb = (0, mongoose_1.model)("videopost", exports.videoPostSchema);
class PostStore {
    /* createPost  */
    async addPosts(postInput) {
        const post = new exports.PostDb(postInput);
        let savedPost;
        savedPost = await post.save();
        return savedPost;
    }
    //TextPost
    async addTextPosts(postTextInput) {
        const postText = new exports.TextPostDb(postTextInput);
        let savedPost;
        savedPost = await postText.save();
        return savedPost;
    }
    //ImagePost
    async addImagePosts(postImageInput) {
        const postImage = new exports.ImagePostDb(postImageInput);
        let savedPost;
        savedPost = await postImage.save();
        return savedPost;
    }
    //VideoPost
    async addVideoPosts(postVideoInput) {
        const postVideo = new exports.VideoPostDb(postVideoInput);
        let savedPost;
        savedPost = await postVideo.save();
        return savedPost;
    }
    async findOneData(attributes) {
        return await exports.PostDb.findOne(attributes).lean();
    }
    async findtxtdbdata(attributes) {
        return await exports.TextPostDb.findOne(attributes).lean();
    }
    async findimagedbdata(attributes) {
        return await exports.ImagePostDb.findOne(attributes).lean();
    }
    async findvideodbdata(attributes) {
        return await exports.VideoPostDb.findOne(attributes).lean();
    }
    async find() {
        return await exports.PostDb.find().lean();
    }
    async findOneDataAndUpdate(attributes, toUpdate) {
        return await exports.PostDb.findByIdAndUpdate(attributes, toUpdate).lean();
    }
    async textPostUpd(_id, attributes) {
        let textData = await exports.TextPostDb.findByIdAndUpdate({ _id }, { $set: attributes }, { new: true }).lean();
        return textData;
    }
    async imagePostUpd(_id, attributes) {
        let imgData = await exports.ImagePostDb.findByIdAndUpdate({ _id }, { $set: attributes }, { new: true }).lean();
        return imgData;
    }
    async videoPostUpd(_id, attributes) {
        let videoData = await exports.VideoPostDb.findByIdAndUpdate({ _id }, { $set: attributes }, { new: true }).lean();
        return videoData;
    }
}
exports.default = PostStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9wb3N0L3Bvc3Quc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsdUNBQWdEO0FBQ2hELHVFQUFrRDtBQUNsRCxxRUFBOEM7QUFDOUMsdUVBQThDO0FBQzlDLHlFQUFnRDtBQWlCbkMsUUFBQSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUFDLG1CQUFZLENBQUMsQ0FBQztBQUN0QyxRQUFBLE1BQU0sR0FBc0IsSUFBQSxnQkFBSyxFQUFhLE1BQU0sRUFBRSxrQkFBVSxDQUFDLENBQUM7QUFFbEUsUUFBQSxjQUFjLEdBQUcsSUFBSSxpQkFBTSxDQUFDLG1CQUFRLENBQUMsQ0FBQztBQUN0QyxRQUFBLFVBQVUsR0FBMEIsSUFBQSxnQkFBSyxFQUNwRCxVQUFVLEVBQ1Ysc0JBQWMsQ0FDZixDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQUcsSUFBSSxpQkFBTSxDQUFDLGtCQUFTLENBQUMsQ0FBQztBQUN4QyxRQUFBLFdBQVcsR0FBMkIsSUFBQSxnQkFBSyxFQUN0RCxXQUFXLEVBQ1gsdUJBQWUsQ0FDaEIsQ0FBQztBQUVXLFFBQUEsZUFBZSxHQUFHLElBQUksaUJBQU0sQ0FBQyxvQkFBUyxDQUFDLENBQUM7QUFDeEMsUUFBQSxXQUFXLEdBQTJCLElBQUEsZ0JBQUssRUFDdEQsV0FBVyxFQUNYLHVCQUFlLENBQ2hCLENBQUM7QUFFRixNQUFxQixTQUFTO0lBQzVCLGlCQUFpQjtJQUNqQixLQUFLLENBQUMsUUFBUSxDQUFDLFNBQWdCO1FBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksU0FBZ0IsQ0FBQztRQUNyQixTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVU7SUFDVixL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