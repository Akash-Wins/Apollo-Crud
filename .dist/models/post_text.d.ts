declare const _default: {
    _id: {
        type: StringConstructor;
        default: () => string;
    };
    userId: {
        type: StringConstructor;
        required: boolean;
    };
    postId: {
        type: StringConstructor;
        required: boolean;
    };
    title: {
        type: StringConstructor;
        required: boolean;
    };
    description: {
        type: StringConstructor;
        required: boolean;
    };
    createdAt: {
        type: DateConstructor;
        default: () => number;
    };
};
export default _default;
