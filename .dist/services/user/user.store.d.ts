/// <reference types="node" />
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
import IUSER from "../../utils/interface/IUser";
import { Schema, Model } from "mongoose";
export interface IUserModel extends IUSER {
    _id: string;
}
export declare const userSchema: Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    status: string;
    roles: string;
    _id: string;
    email: string;
    password: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    otp: number;
    emailVerified: number;
    address?: {
        location: string;
        state: string;
        city: string;
        zipCode: string;
        landMark: string;
        latitute: string;
        longitude: string;
    };
}>;
export declare const UserDb: Model<IUserModel>;
export default class UserStore {
    static OPERATION_UNSUCCESSFUL: {
        new (): {
            name: string;
            message: string;
            stack?: string;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
        stackTraceLimit: number;
    };
    /**
     * creating new user and saving in Database
     */
    userRegister(userInput: IUSER): Promise<IUSER>;
    findOneData(attributes: object): Promise<import("mongoose").LeanDocument<IUserModel & Required<{
        _id: string;
    }>>>;
    findOneDataAndUpdate(attributes: object, toUpdate: object): Promise<import("mongoose").LeanDocument<IUserModel & Required<{
        _id: string;
    }>>>;
}
