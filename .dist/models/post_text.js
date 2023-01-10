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
    createdAt: { type: Date, default: Date.now }
};
// import mongoose from "mongoose";
// import {nanoid} from "nanoid";
// const textPostSchema =new mongoose.Schema({
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
//   }
// },{timestamps:true})
// const textpostdb=mongoose.model('textpostdb',textPostSchema)
// export default textpostdb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF90ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9wb3N0X3RleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBZ0M7QUFDaEMsa0JBQWdCO0lBQ2QsR0FBRyxFQUFFO1FBQ0MsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBQSxlQUFNLEdBQUU7S0FDeEI7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxNQUFNLEVBQUM7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxLQUFLLEVBQUM7UUFDSixJQUFJLEVBQUMsTUFBTTtRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsV0FBVyxFQUFDO1FBQ1YsSUFBSSxFQUFDLE1BQU07UUFDWCxRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNELFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUM7Q0FDL0MsQ0FBQTtBQUNELG1DQUFtQztBQUNuQyxpQ0FBaUM7QUFDakMsOENBQThDO0FBQzlDLFdBQVc7QUFDWCxvQkFBb0I7QUFDcEIsK0JBQStCO0FBQy9CLE9BQU87QUFDUCxjQUFjO0FBQ2Qsb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0QixPQUFPO0FBQ1AsYUFBYTtBQUNiLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEIsT0FBTztBQUNQLFlBQVk7QUFDWixtQkFBbUI7QUFDbkIsdUJBQXVCO0FBQ3ZCLE9BQU87QUFDUCxrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sdUJBQXVCO0FBQ3ZCLCtEQUErRDtBQUMvRCw2QkFBNkIifQ==