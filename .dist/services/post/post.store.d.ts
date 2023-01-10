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
/// <reference types="mongoose/types/inferschematype" />
import IPOST from "../../utils/interface/IPost";
import { Schema, Model } from "mongoose";
import ITEXTPOST from "../../utils/interface/ITextPost";
import IIMAGEPOST from "../../utils/interface/IImagePost";
import IVIDEOPOST from "../../utils/interface/IVideoPost";
export interface IPostModel extends IPOST {
    _id: string;
}
export interface ITextPostModel extends ITEXTPOST {
    _id: string;
}
export interface IImagePostModel extends IIMAGEPOST {
    _id: string;
}
export interface IVideoPostModel extends IVIDEOPOST {
    _id: string;
}
export declare const postSchema: Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    status: string;
    _id: string;
    createdAt: number;
    userId: string;
    type?: string;
}>;
export declare const PostDb: Model<IPostModel>;
export declare const textPostSchema: Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    title: string;
    description: string;
    _id: string;
    createdAt: Date;
    userId: string;
    postId: string;
}>;
export declare const TextPostDb: Model<ITextPostModel>;
export declare const imagePostSchema: Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    title: string;
    description: string;
    _id: string;
    createdAt: Date;
    userId: string;
    postId: string;
    imgUrl: string;
}>;
export declare const ImagePostDb: Model<IImagePostModel>;
export declare const videoPostSchema: Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    title: string;
    description: string;
    _id: string;
    createdAt: Date;
    userId: string;
    postId: string;
    videoType: string;
    videoUrl: string;
}>;
export declare const VideoPostDb: Model<IVideoPostModel>;
export default class PostStore {
    addPosts(postInput: IPOST): Promise<IPOST>;
    addTextPosts(postTextInput: ITEXTPOST): Promise<ITEXTPOST>;
    addImagePosts(postImageInput: IIMAGEPOST): Promise<IIMAGEPOST>;
    addVideoPosts(postVideoInput: IVIDEOPOST): Promise<IVIDEOPOST>;
    findOneData(attributes: object): Promise<import("mongoose").LeanDocument<IPostModel & Required<{
        _id: string;
    }>>>;
    findtxtdbdata(attributes: object): Promise<import("mongoose").LeanDocument<ITextPostModel & Required<{
        _id: string;
    }>>>;
    findimagedbdata(attributes: object): Promise<import("mongoose").LeanDocument<IImagePostModel & Required<{
        _id: string;
    }>>>;
    findvideodbdata(attributes: object): Promise<import("mongoose").LeanDocument<IVideoPostModel & Required<{
        _id: string;
    }>>>;
    find(): Promise<import("mongoose").LeanDocument<IPostModel & Required<{
        _id: string;
    }>>[]>;
    findOneDataAndUpdate(attributes: object, toUpdate: object): Promise<import("mongoose").LeanDocument<IPostModel & Required<{
        _id: string;
    }>>>;
    textPostUpd(_id: string, attributes: object): Promise<import("mongoose").LeanDocument<ITextPostModel & Required<{
        _id: string;
    }>>>;
    imagePostUpd(_id: string, attributes: object): Promise<import("mongoose").LeanDocument<IImagePostModel & Required<{
        _id: string;
    }>>>;
    videoPostUpd(_id: string, attributes: object): Promise<import("mongoose").LeanDocument<IVideoPostModel & Required<{
        _id: string;
    }>>>;
}
