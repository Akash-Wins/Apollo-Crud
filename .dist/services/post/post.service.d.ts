/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import * as IPostServices from "./IPostService";
import { IAppServiceProxy } from "../app_service_proxy";
declare class PostServices implements IPostServices.IPostServiceAPI {
    private userStore;
    private postStore;
    private proxy;
    constructor(proxy: IAppServiceProxy);
    addPosts(request: any): Promise<{
        type: string;
        status: string;
        message: string;
    }>;
    updatePost(request: any): Promise<any>;
    getTimeLine(request: any): Promise<import("mongoose").LeanDocument<import("./post.store").IPostModel & Required<{
        _id: string;
    }>>[]>;
}
export default PostServices;
