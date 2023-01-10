"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
exports.default = {
    _id: {
        type: String,
        default: () => (0, nanoid_1.nanoid)(),
    },
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false
    },
    videoType: {
        type: String,
        enum: ['youtube', 'dailymotion', 'local'],
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now }
};
// import mongoose from "mongoose";
// import {nanoid} from "nanoid";
// const videoPostSchema =new mongoose.Schema({
//   _id: {
//     type: String,
//     default: () => nanoid(),
//   },
//   userId: {
//     type: String,
//     required: true,
//   },
//   postId:{
//     type: String,
//     required: true,
//   },
//   title:{
//     type:String,
//     required: false,
//   },
//   description:{
//     type:String,
//     required: false
//   },
//   videoType:{
//     type:String,
//     enum : ['youtube','dailymotion','local'],
//     required: true
//   },
//   videoUrl:{
//     type:String,
//     required:true
//   }
// },{timestamps:true})
// const videopostdb=mongoose.model('videopostdb',videoPostSchema)
// export default videopostdb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF92aWRlby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcG9zdF92aWRlby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFnQztBQUNoQyxrQkFBZ0I7SUFDZCxHQUFHLEVBQUU7UUFDQyxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFBLGVBQU0sR0FBRTtLQUN4QjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELE1BQU0sRUFBQztRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELEtBQUssRUFBQztRQUNKLElBQUksRUFBQyxNQUFNO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxXQUFXLEVBQUM7UUFDVixJQUFJLEVBQUMsTUFBTTtRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsU0FBUyxFQUFDO1FBQ1IsSUFBSSxFQUFDLE1BQU07UUFDWCxJQUFJLEVBQUcsQ0FBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLE9BQU8sQ0FBQztRQUN4QyxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFDO1FBQ1AsSUFBSSxFQUFDLE1BQU07UUFDWCxRQUFRLEVBQUMsSUFBSTtLQUNkO0lBQ0QsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQztDQUMvQyxDQUFBO0FBQ0QsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywrQ0FBK0M7QUFDL0MsV0FBVztBQUNYLG9CQUFvQjtBQUNwQiwrQkFBK0I7QUFDL0IsT0FBTztBQUNQLGNBQWM7QUFDZCxvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCLE9BQU87QUFDUCxhQUFhO0FBQ2Isb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0QixPQUFPO0FBQ1AsWUFBWTtBQUNaLG1CQUFtQjtBQUNuQix1QkFBdUI7QUFDdkIsT0FBTztBQUNQLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLE9BQU87QUFDUCxnQkFBZ0I7QUFDaEIsbUJBQW1CO0FBQ25CLGdEQUFnRDtBQUNoRCxxQkFBcUI7QUFDckIsT0FBTztBQUNQLGVBQWU7QUFDZixtQkFBbUI7QUFDbkIsb0JBQW9CO0FBQ3BCLE1BQU07QUFDTix1QkFBdUI7QUFDdkIsa0VBQWtFO0FBQ2xFLDhCQUE4QiJ9