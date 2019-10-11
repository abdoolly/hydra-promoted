export interface Req {
    user: any;
}
export interface Res {
    sendOk: (...body: any[]) => any;
    sendError: (err: Error) => any;
}
