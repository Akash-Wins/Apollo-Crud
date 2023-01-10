"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_store_1 = __importDefault(require("./post.store"));
const user_store_1 = __importDefault(require("../../services/user/user.store"));
class PostServices {
    constructor(proxy) {
        this.userStore = new user_store_1.default();
        this.postStore = new post_store_1.default();
        this.proxy = proxy;
    }
    async addPosts(request) {
        const user = await this.userStore.findOneData({ _id: request.userId });
        // if(user.roles!="admin"){
        //   throw new Error("only admin creates");
        // }
        if (!user) {
            throw new Error("Invalid Credentials user not found");
        }
        //switch case for type
        // store in db
        const postStatus = request.status;
        const postType = request.type;
        const postArgs = {
            userId: request.userId,
            type: postType,
            status: postStatus,
        };
        const savePost = await this.postStore.addPosts(postArgs);
        switch (postType) {
            case "text":
                try {
                    const textArgs = {
                        userId: request.userId,
                        postId: savePost._id,
                        title: request.fields.title,
                        description: request.fields.description,
                    };
                    const saveTextPost = await this.postStore.addTextPosts(textArgs);
                    break;
                }
                catch (error) {
                    throw new Error("oops somthing went wrong while saving text");
                }
            case "image":
                try {
                    const imgArgs = {
                        userId: request === null || request === void 0 ? void 0 : request.userId,
                        postId: savePost === null || savePost === void 0 ? void 0 : savePost._id,
                        title: request === null || request === void 0 ? void 0 : request.fields.title,
                        description: request === null || request === void 0 ? void 0 : request.fields.description,
                        imgUrl: request === null || request === void 0 ? void 0 : request.fields.imgUrl,
                    };
                    const saveImagePost = await this.postStore.addImagePosts(imgArgs);
                    break;
                }
                catch (error) {
                    throw new Error("oops somthing went wrong while saving image");
                }
            case "video":
                try {
                    const videoArgs = {
                        userId: request.userId,
                        postId: savePost._id,
                        title: request.fields.title,
                        description: request.fields.description,
                        videoUrl: request.fields.videoUrl,
                        videoType: request.fields.videoType,
                    };
                    const saveVideoPost = await this.postStore.addVideoPosts(videoArgs);
                    break;
                }
                catch (error) {
                    throw new Error("oops somthing went wrong while saving video");
                }
        }
        return {
            type: savePost.type,
            status: savePost.status,
            message: "successfully saved",
        };
    }
    async updatePost(request) {
        try {
            const userFind = await this.userStore.findOneData({ _id: request.userId });
            const postData = await this.postStore.findOneData({ id: request.id });
            // if(user.roles=="editor1"){
            //   console.log("lol")
            //   const postuserId=request.id
            //   console.log(postuserId)
            //   const findRoles= await this.postStore.findtxtdbdata({_id:postuserId})
            //   console.log(findRoles)
            //   if(findRoles.userId != request.userId){
            //     console.log("eerorrr")
            //     return "you can't update data";
            //   }
            // }
            if (userFind.roles != "admin") {
                if (userFind.roles == "editor1") {
                    if (postData.userId != userFind._id) {
                        throw new Error("Not Authroized Editor_1");
                    }
                    throw new Error("not authroized ");
                }
                if (userFind.roles == "editor2") {
                    if (postData.userId != userFind._id) {
                        throw new Error("Not Authroized Editor_2");
                    }
                    throw new Error("not authroized role");
                }
                throw new Error("not admin ");
            }
            const postStatus = request.status;
            const postType = request.type;
            const postArgs = {
                type: postType,
                status: postStatus,
            };
            const data = await this.postStore.findOneDataAndUpdate({
                _id: request.id,
                type: request.type,
                status: request.status,
            }, { new: true });
            switch (postType) {
                case "text":
                    try {
                        const textArgs = {
                            title: request.fields.title,
                            description: request.fields.description,
                        };
                        const user = await this.postStore.findtxtdbdata({ postId: data._id });
                        const updateTextPost = await this.postStore.textPostUpd(user._id, textArgs);
                        break;
                    }
                    catch (error) {
                        throw new Error("oops somthing went wrong while saving text");
                    }
                case "image":
                    try {
                        const imgArgs = {
                            title: request === null || request === void 0 ? void 0 : request.fields.title,
                            description: request === null || request === void 0 ? void 0 : request.fields.description,
                            imgUrl: request === null || request === void 0 ? void 0 : request.fields.imgUrl,
                        };
                        const user = await this.postStore.findimagedbdata({ postId: data._id });
                        const updateTextPost = await this.postStore.imagePostUpd(user._id, imgArgs);
                        break;
                    }
                    catch (error) {
                        throw new Error("oops somthing went wrong while saving image");
                    }
                case "video":
                    try {
                        const videoArgs = {
                            title: request.fields.title,
                            description: request.fields.description,
                            videoUrl: request.fields.videoUrl,
                            videoType: request.fields.videoType,
                        };
                        const user = await this.postStore.findvideodbdata({ postId: data._id });
                        const updateTextPost = await this.postStore.videoPostUpd(user._id, videoArgs);
                        break;
                    }
                    catch (error) {
                        throw new Error("oops somthing went wrong while saving video");
                    }
            }
            return {
                type: data.type,
                status: data.status,
                message: "successfully saved",
            };
        }
        catch (err) {
            return err;
        }
    }
    async getTimeLine(request) {
        const user = await this.postStore.find();
        return user;
    }
}
exports.default = PostServices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3Bvc3QvcG9zdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsOERBQStFO0FBQy9FLGdGQUF1RDtBQUV2RCxNQUFNLFlBQVk7SUFJaEIsWUFBWSxLQUF1QjtRQUgzQixjQUFTLEdBQUcsSUFBSSxvQkFBUyxFQUFFLENBQUM7UUFDNUIsY0FBUyxHQUFHLElBQUksb0JBQVMsRUFBRSxDQUFDO1FBR2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQVk7UUFDekIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2RSwyQkFBMkI7UUFDM0IsMkNBQTJDO1FBQzNDLElBQUk7UUFDSixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0Qsc0JBQXNCO1FBQ3RCLGNBQWM7UUFDZCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFFOUIsTUFBTSxRQUFRLEdBQUc7WUFDZixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsVUFBVTtTQUNuQixDQUFDO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxRQUFRLFFBQVEsRUFBRTtZQUNoQixLQUFLLE1BQU07Z0JBQ1QsSUFBSTtvQkFDRixNQUFNLFFBQVEs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