import { AppRequest, AppResponse } from "..";
import { NextFunction } from "express";
export interface Req {
    user: any;
}
export interface Res {
    sendOk: (...body: any[]) => any;
    sendError: (err: Error) => any;
}
export declare type HandlerFunc = (req: AppRequest, res: AppResponse, next: NextFunction) => any;
