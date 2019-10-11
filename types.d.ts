
declare namespace Express {
    export interface Request {
        user: any;
    }
    export interface Response {
        sendOk: (...body) => any;
        sendError: (err: Error) => any;
    }
}
