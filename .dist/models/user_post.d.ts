declare const _default: {
    _id: {
        type: StringConstructor;
        default: () => string;
    };
    userId: {
        type: StringConstructor;
        required: boolean;
    };
    type: {
        type: StringConstructor;
        enum: string[];
    };
    status: {
        type: StringConstructor;
        enum: string[];
        default: string;
    };
    createdAt: {
        type: NumberConstructor;
        default: number;
    };
};
export default _default;
