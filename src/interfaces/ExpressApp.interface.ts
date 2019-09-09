import { Response, Request } from 'express';

export interface AppResponse extends Response {
    sendOk: (...body) => any;
    sendError: (err: Error) => any;
}

export interface AppRequest extends Request {}
