// import AuthMiddleware from "../utils/middleware/auth_middleware";
// import postsdb from "../models/user_post";
// import textpostdb from "../models/post_text";
// import imgpostdb from "../models/post_img";
// import videopostdb from "../models/post_video";
// import userDb from "../models/user";
// class UserPostsServices {
//   async addPosts(parent, args, context) {
//     try {
//       AuthMiddleware.Validattion(parent, args, context);
//       const idUser = context.user._id;
//       // const user = await userDb.findOne({ _id: idUser });
//       // if (!user) {
//       //   throw new Error("Invalid Credentials user not found");
//       // }
//       //switch case for type
//       // store in db
//       const postStatus = args.userPost.status;
//       const postType = args.userPost.type;
//       const postArgs = {
//         userId: idUser,
//         type: postType,
//         status: postStatus,
//       };
//       const newPost = new postsdb(postArgs);
//       const savePost = await newPost.save();
//       switch (postType) {
//         case "text":
//           try {
//             const textArgs = {
//               userId: idUser,
//               postId: savePost._id,
//               title: args.userPost.fields.title,
//               description: args.userPost.fields.description,
//             };
//             const newText = new textpostdb(textArgs);
//             const saveText = await newText.save();
//             break;
//           } catch (error) {
//             throw new Error("oops somthing went wrong while saving text");
//           }
//         case "image":
//           try {
//             const imgArgs = {
//               userId: idUser,
//               postId: savePost._id,
//               title: args.userPost.fields.title,
//               description: args.userPost.fields.description,
//               imgUrl: args.userPost.fields.imgUrl,
//             };
//             const newImg = new imgpostdb(imgArgs);
//             const saveImg = await newImg.save();
//             break;
//           } catch (error) {
//             throw new Error("oops somthing went wrong while saving image");
//           }
//         case "video":
//           try {
//             const videoArgs = {
//               userId: idUser,
//               postId: savePost._id,
//               title: args.userPost.fields.title,
//               description: args.userPost.fields.description,
//               videoUrl: args.userPost.fields.video.videoUrl,
//               videoType: args.userPost.fields.video.videoType,
//             };
//             const newVideo = new videopostdb(videoArgs);
//             const saveVideo = await newVideo.save();
//             break;
//           } catch (error) {
//             throw new Error("oops somthing went wrong while saving video");
//           }
//       }
//       return {
//         message: "successfully saved",
//       };
//     } catch (error) {
//       throw new Error("oops something went wrong ");
//     }
//   }
// }
// export default new UserPostsServices();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclBvc3RzLnNlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3VzZXJQb3N0cy5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvRUFBb0U7QUFDcEUsNkNBQTZDO0FBQzdDLGdEQUFnRDtBQUNoRCw4Q0FBOEM7QUFDOUMsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUN2Qyw0QkFBNEI7QUFDNUIsNENBQTRDO0FBQzVDLFlBQVk7QUFDWiwyREFBMkQ7QUFDM0QseUNBQXlDO0FBRXpDLCtEQUErRDtBQUMvRCx3QkFBd0I7QUFDeEIsb0VBQW9FO0FBQ3BFLGFBQWE7QUFDYiwrQkFBK0I7QUFDL0IsdUJBQXVCO0FBQ3ZCLGlEQUFpRDtBQUNqRCw2Q0FBNkM7QUFDN0MsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsOEJBQThCO0FBQzlCLFdBQVc7QUFDWCwrQ0FBK0M7QUFFL0MsK0NBQStDO0FBRS9DLDRCQUE0QjtBQUM1Qix1QkFBdUI7QUFDdkIsa0JBQWtCO0FBQ2xCLGlDQUFpQztBQUNqQyxnQ0FBZ0M7QUFDaEMsc0NBQXNDO0FBQ3RDLG1EQUFtRDtBQUNuRCwrREFBK0Q7QUFDL0QsaUJBQWlCO0FBQ2pCLHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFDckQscUJBQXFCO0FBQ3JCLDhCQUE4QjtBQUM5Qiw2RUFBNkU7QUFDN0UsY0FBYztBQUVkLHdCQUF3QjtBQUN4QixrQkFBa0I7QUFDbEIsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxzQ0FBc0M7QUFDdEMsbURBQW1EO0FBQ25ELCtEQUErRDtBQUMvRCxxREFBcUQ7QUFDckQsaUJBQWlCO0FBQ2pCLHFEQUFxRDtBQUNyRCxtREFBbUQ7QUFDbkQscUJBQXFCO0FBQ3JCLDhCQUE4QjtBQUM5Qiw4RUFBOEU7QUFDOUUsY0FBYztBQUVkLHdCQUF3QjtBQUN4QixrQkFBa0I7QUFDbEIsa0NBQWtDO0FBQ2xDLGdDQUFnQztBQUNoQyxzQ0FBc0M7QUFDdEMsbURBQW1EO0FBQ25ELCtEQUErRDtBQUMvRCwrREFBK0Q7QUFDL0QsaUVBQWlFO0FBQ2pFLGlCQUFpQjtBQUNqQiwyREFBMkQ7QUFDM0QsdURBQXVEO0FBQ3ZELHFCQUFxQjtBQUNyQiw4QkFBOEI7QUFDOUIsOEVBQThFO0FBQzlFLGNBQWM7QUFDZCxVQUFVO0FBQ1YsaUJBQWlCO0FBQ2pCLHlDQUF5QztBQUN6QyxXQUFXO0FBQ1gsd0JBQXdCO0FBQ3hCLHVEQUF1RDtBQUN2RCxRQUFRO0FBQ1IsTUFBTTtBQUVOLElBQUk7QUFFSiwwQ0FBMEMifQ==