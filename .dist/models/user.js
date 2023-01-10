"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
exports.default = {
    _id: {
        type: String,
        default: () => (0, nanoid_1.nanoid)(),
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        location: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        zipCode: {
            type: String,
            required: false,
        },
        landMark: {
            type: String,
            required: false
        },
        latitute: {
            type: String,
            required: false
        },
        longitude: {
            type: String,
            required: false
        },
    },
    otp: {
        type: Number,
        required: false
    },
    emailVerified: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    status: {
        type: String,
        enum: ['public', 'private'],
        default: 'private'
    },
    roles: {
        type: String,
        enum: ['admin', 'editor1', "editor2"],
        default: 'admin'
    },
    createdAt: { type: Date, default: Date.now }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFnQztBQUNoQyxrQkFBZ0I7SUFDZCxHQUFHLEVBQUM7UUFDQSxJQUFJLEVBQUMsTUFBTTtRQUNYLE9BQU8sRUFBQyxHQUFFLEVBQUUsQ0FBQSxJQUFBLGVBQU0sR0FBRTtLQUN2QjtJQUNELFNBQVMsRUFBQztRQUNOLElBQUksRUFBQyxNQUFNO1FBQ1gsUUFBUSxFQUFDLEtBQUs7S0FDakI7SUFDRCxRQUFRLEVBQUM7UUFDTCxJQUFJLEVBQUMsTUFBTTtRQUNYLFFBQVEsRUFBQyxLQUFLO0tBQ2pCO0lBQ0QsS0FBSyxFQUFDO1FBQ0YsSUFBSSxFQUFDLE1BQU07UUFDWCxRQUFRLEVBQUMsSUFBSTtLQUNoQjtJQUNELFFBQVEsRUFBQztRQUNMLElBQUksRUFBQyxNQUFNO1FBQ1gsUUFBUSxFQUFDLElBQUk7S0FDaEI7SUFDRCxPQUFPLEVBQUU7UUFDTCxRQUFRLEVBQUM7WUFDUCxJQUFJLEVBQUMsTUFBTTtZQUNYLFFBQVEsRUFBQyxLQUFLO1NBQ2Y7UUFFRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxLQUFLO1NBQ2hCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsS0FBSztTQUNoQjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLEtBQUs7U0FDaEI7UUFDRCxRQUFRLEVBQUM7WUFDTCxJQUFJLEVBQUMsTUFBTTtZQUNYLFFBQVEsRUFBQyxLQUFLO1NBQ2pCO1FBQ0QsUUFBUSxFQUFDO1lBQ1AsSUFBSSxFQUFDLE1BQU07WUFDWCxRQUFRLEVBQUMsS0FBSztTQUNqQjtRQUNELFNBQVMsRUFBQztZQUNSLElBQUksRUFBQyxNQUFNO1lBQ1gsUUFBUSxFQUFDLEtBQUs7U0FDakI7S0FDQTtJQUNELEdBQUcsRUFBQztRQUNGLElBQUksRUFBQyxNQUFNO1FBQ1gsUUFBUSxFQUFDLEtBQUs7S0FDZjtJQUNELGFBQWEsRUFBQztRQUNaLElBQUksRUFBQyxNQUFNO1FBQ1gsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNWLE9BQU8sRUFBQyxDQUFDO0tBQ1Y7SUFDRCxNQUFNLEVBQUM7UUFDTCxJQUFJLEVBQUMsTUFBTTtRQUNYLElBQUksRUFBQyxDQUFDLFFBQVEsRUFBQyxTQUFTLENBQUM7UUFDekIsT0FBTyxFQUFDLFNBQVM7S0FDbEI7SUFDRCxLQUFLLEVBQUM7UUFDSixJQUFJLEVBQUMsTUFBTTtRQUNYLElBQUksRUFBQyxDQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsU0FBUyxDQUFDO1FBQ2xDLE9BQU8sRUFBQyxPQUFPO0tBQ2hCO0lBQ0QsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQztDQUUzQyxDQUFDIn0=