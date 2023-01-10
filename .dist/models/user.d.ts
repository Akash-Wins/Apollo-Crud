declare const _default: {
    _id: {
        type: StringConstructor;
        default: () => string;
    };
    firstName: {
        type: StringConstructor;
        required: boolean;
    };
    lastName: {
        type: StringConstructor;
        required: boolean;
    };
    email: {
        type: StringConstructor;
        required: boolean;
    };
    password: {
        type: StringConstructor;
        required: boolean;
    };
    address: {
        location: {
            type: StringConstructor;
            required: boolean;
        };
        city: {
            type: StringConstructor;
            required: boolean;
        };
        state: {
            type: StringConstructor;
            required: boolean;
        };
        zipCode: {
            type: StringConstructor;
            required: boolean;
        };
        landMark: {
            type: StringConstructor;
            required: boolean;
        };
        latitute: {
            type: StringConstructor;
            required: boolean;
        };
        longitude: {
            type: StringConstructor;
            required: boolean;
        };
    };
    otp: {
        type: NumberConstructor;
        required: boolean;
    };
    emailVerified: {
        type: NumberConstructor;
        enum: number[];
        default: number;
    };
    status: {
        type: StringConstructor;
        enum: string[];
        default: string;
    };
    roles: {
        type: StringConstructor;
        enum: string[];
        default: string;
    };
    createdAt: {
        type: DateConstructor;
        default: () => number;
    };
};
export default _default;
