import * as IPostServices from "./IPostService";
import { IAppServiceProxy } from "../app_service_proxy";
import PostStore, { ImagePostDb, TextPostDb, VideoPostDb } from "./post.store";
import UserStore from "../../services/user/user.store";

class PostServices implements IPostServices.IPostServiceAPI {
  private userStore = new UserStore();
  private postStore = new PostStore();
  private proxy: IAppServiceProxy;
  constructor(proxy: IAppServiceProxy) {
    this.proxy = proxy;
  }

  async addPosts(request: any) {
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
        } catch (error) {
          throw new Error("oops somthing went wrong while saving text");
        }

      case "image":
        try {
          const imgArgs = {
            userId: request?.userId,
            postId: savePost?._id,
            title: request?.fields.title,
            description: request?.fields.description,
            imgUrl: request?.fields.imgUrl,
          };
          const saveImagePost = await this.postStore.addImagePosts(imgArgs);
          break;
        } catch (error) {
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
        } catch (error) {
          throw new Error("oops somthing went wrong while saving video");
        }
    }
    return {
      type: savePost.type,
      status: savePost.status,
      message: "successfully saved",
    };
  }

  async updatePost(request: any) {
    try{
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
      const data = await this.postStore.findOneDataAndUpdate(
        {
          _id: request.id,
          type: request.type,
          status: request.status,
        },
        { new: true }
      );
  
      switch (postType) {
        case "text":
          try {
            const textArgs = {
              title: request.fields.title,
              description: request.fields.description,
            };
    
            const user = await this.postStore.findtxtdbdata({ postId: data._id });
            const updateTextPost = await this.postStore.textPostUpd(user._id,textArgs);
            break;
          } catch (error) {
            throw new Error("oops somthing went wrong while saving text");
          }
  
        case "image":
          try {
            const imgArgs = {
              title: request?.fields.title,
              description: request?.fields.description,
              imgUrl: request?.fields.imgUrl,
            };
            const user = await this.postStore.findimagedbdata({ postId: data._id });
            const updateTextPost = await this.postStore.imagePostUpd(user._id,imgArgs);
            break;
          } catch (error) {
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
            const updateTextPost = await this.postStore.videoPostUpd(user._id,videoArgs);
            break;
          } catch (error) {
            throw new Error("oops somthing went wrong while saving video");
          }
      }
      return {
        type: data.type,
        status: data.status,
        message: "successfully saved",
      };
    }
    catch(err){
      return err
    }
  }

  async getTimeLine(request: any) {
    const user = await this.postStore.find();
    return user;
  }
}
export default PostServices;
