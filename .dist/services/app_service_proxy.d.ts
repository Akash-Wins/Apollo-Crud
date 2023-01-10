import * as IUserService from './user/IUserServices';
import * as IPostService from './post/IPostService';
export interface IAppServiceProxy {
    user: IUserService.IUserServiceAPI;
    post: IPostService.IPostServiceAPI;
}
declare class AppServicesProxy implements IAppServiceProxy {
    user: IUserService.IUserServiceAPI;
    post: IPostService.IPostServiceAPI;
    constructor();
}
declare const _default: AppServicesProxy;
export default _default;
