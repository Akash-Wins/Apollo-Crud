declare const fileResolvers: {
    Query: {};
    Mutation: {
        singleUpload: (parent: any, args: any) => Promise<void>;
    };
};
export default fileResolvers;
