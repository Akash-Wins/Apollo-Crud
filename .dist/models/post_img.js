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
    imgUrl: {
        type: String,
        required: false
    },
    createdAt: { type: Date, default: Date.now }
};
// import mongoose from "mongoose";
// import {nanoid} from "nanoid";
// const imgPostSchema =new mongoose.Schema({
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
//   imgUrl:{
//     type:String,
//     required: false
//   }
// },{timestamps:true})
// const imgpostdb=mongoose.model('imgpostdb',imgPostSchema)
// export default imgpostdb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF9pbWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3Bvc3RfaW1nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWdDO0FBQ2hDLGtCQUFnQjtJQUNkLEdBQUcsRUFBRTtRQUNDLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUEsZUFBTSxHQUFFO0tBQ3hCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsTUFBTSxFQUFDO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsS0FBSyxFQUFDO1FBQ0osSUFBSSxFQUFDLE1BQU07UUFDWCxRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNELFdBQVcsRUFBQztRQUNWLElBQUksRUFBQyxNQUFNO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxNQUFNLEVBQUM7UUFDTCxJQUFJLEVBQUMsTUFBTTtRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQztDQUMvQyxDQUFBO0FBQ0QsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQyw2Q0FBNkM7QUFDN0MsV0FBVztBQUNYLG9CQUFvQjtBQUNwQiwrQkFBK0I7QUFDL0IsT0FBTztBQUNQLGNBQWM7QUFDZCxvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCLE9BQU87QUFDUCxhQUFhO0FBQ2Isb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0QixPQUFPO0FBQ1AsWUFBWTtBQUNaLG1CQUFtQjtBQUNuQix1QkFBdUI7QUFDdkIsT0FBTztBQUNQLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLE9BQU87QUFDUCxhQUFhO0FBQ2IsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sdUJBQXVCO0FBQ3ZCLDREQUE0RDtBQUM1RCw0QkFBNEIifQ==