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
        required: false,
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video']
    },
    status: {
        type: String,
        enum: ['public', 'private', 'deleted'],
        default: 'public',
    },
    createdAt: { type: Number, default: Date.now() }
};
// import mongoose from "mongoose";
// import {nanoid} from "nanoid";
// const postSchema =new mongoose.Schema({
//   _id: {
//     type: String,
//     default: () => nanoid(),
//   },
//   userId: {
//     type: String,
//     required: false,
//   },
//   type: {
//     type: String,
//     enum : ['text','image','video']
//   },
//   status: {
//     type: String,
//     enum : ['public','private','deleted'],
//     default:'public',
//   },
// }, { timestamps: true } )
// const postsdb=mongoose.model('postsdb',postSchema)
// export default postsdb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9wb3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy91c2VyX3Bvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBZ0M7QUFDaEMsa0JBQWdCO0lBQ2QsR0FBRyxFQUFFO1FBQ0MsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBQSxlQUFNLEdBQUU7S0FDeEI7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUcsQ0FBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQztLQUNoQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFHLENBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxTQUFTLENBQUM7UUFDckMsT0FBTyxFQUFDLFFBQVE7S0FDakI7SUFDRCxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUM7Q0FDbkQsQ0FBQTtBQUNELG1DQUFtQztBQUNuQyxpQ0FBaUM7QUFDakMsMENBQTBDO0FBQzFDLFdBQVc7QUFDWCxvQkFBb0I7QUFDcEIsK0JBQStCO0FBQy9CLE9BQU87QUFDUCxjQUFjO0FBQ2Qsb0JBQW9CO0FBQ3BCLHVCQUF1QjtBQUN2QixPQUFPO0FBQ1AsWUFBWTtBQUNaLG9CQUFvQjtBQUNwQixzQ0FBc0M7QUFDdEMsT0FBTztBQUNQLGNBQWM7QUFDZCxvQkFBb0I7QUFDcEIsNkNBQTZDO0FBQzdDLHdCQUF3QjtBQUN4QixPQUFPO0FBQ1AsNEJBQTRCO0FBRTVCLHFEQUFxRDtBQUNyRCwwQkFBMEIifQ==