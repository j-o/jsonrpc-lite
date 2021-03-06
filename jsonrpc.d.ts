declare type ID = string | number;
declare type defined = string | number | boolean | object | null;
declare type RpcParams = defined | defined[];
/**
 * JsonRpc Class
 *
 * @return {Object} JsonRpc object
 * @api public
 */
interface IJsonRpcType {
    readonly jsonrpc: string;
}
declare class JsonRpc implements IJsonRpcType {
    static VERSION: string;
    static serialize(): string;
    readonly jsonrpc: string;
    constructor();
}
declare class RequestObject extends JsonRpc {
    id: ID;
    method: string;
    params?: RpcParams;
    constructor(id: ID, method: string, params?: RpcParams);
}
declare class NotificationObject extends JsonRpc {
    method: string;
    params?: RpcParams;
    constructor(method: string, params?: RpcParams);
}
declare class SuccessObject extends JsonRpc {
    id: ID;
    result: defined;
    constructor(id: ID, result: defined);
}
declare class ErrorObject extends JsonRpc {
    id: ID;
    error: JsonRpcError;
    constructor(id: ID, error: JsonRpcError);
}
/**
 * JsonRpcParsed Class
 *
 * @param  {JsonRpc|JsonRpcError} payload
 * @param  {type: <Enum, 'request'|'notification'|'success'|'error'|'invalid'>} type
 * @api public
 */
declare enum RpcStatusType {
    request = "request",
    notification = "notification",
    success = "success",
    error = "error",
    invalid = "invalid"
}
/**
 * JsonRpcError Class
 *
 * @param  {String} message
 * @param  {Integer} code
 * @return {String} name: optional
 * @api public
 */
declare class JsonRpcError {
    static invalidRequest: (data: any) => JsonRpcError;
    static methodNotFound: (data: any) => JsonRpcError;
    static invalidParams: (data: any) => JsonRpcError;
    static internalError: (data: any) => JsonRpcError;
    static parseError: (data: any) => JsonRpcError;
    message: string;
    code: number;
    data?: any;
    constructor(message: string, code: number, data?: any);
}
/**
 * Creates a JSON-RPC 2.0 request object
 *
 * @param  {String|Integer} id
 * @param  {String} method
 * @param  {Object|Array} [params]: optional
 * @return {Object} JsonRpc object
 * @api public
 */
export declare function request(id: ID, method: string, params?: RpcParams): RequestObject;
/**
 * Creates a JSON-RPC 2.0 notification object
 *
 * @param  {String} method
 * @param  {Object|Array} [params]: optional
 * @return {Object} JsonRpc object
 * @api public
 */
export declare function notification(method: string, params?: RpcParams): NotificationObject;
/**
 * Creates a JSON-RPC 2.0 success response object
 *
 * @param  {String|Integer} id
 * @param  {Mixed} result
 * @return {Object} JsonRpc object
 * @api public
 */
export declare function success(id: ID, result: defined): SuccessObject;
/**
 * Creates a JSON-RPC 2.0 error response object
 *
 * @param  {String|Integer} id
 * @param  {Object} JsonRpcError error
 * @return {Object} JsonRpc object
 * @api public
 */
export declare function error(id: ID, err: JsonRpcError): ErrorObject;
/**
 * Takes a JSON-RPC 2.0 payload (String) and tries to parse it into a JSON.
 * If successful, determine what object is it (response, notification,
 * success, error, or invalid), and return it's type and properly formatted object.
 *
 * @param  {String} msg
 * @return {Object|Array} an array, or an object of this format:
 *
 *  {
 *    type: <Enum, 'request'|'notification'|'success'|'error'|'invalid'>
 *    payload: <JsonRpc|JsonRpcError>
 *  }
 *
 * @api public
 */
interface IParsedObject {
    type: RpcStatusType;
    payload: JsonRpc | JsonRpcError;
}
export declare function parse(message: string): IParsedObject | IParsedObject[];
/**
 * Takes a JSON-RPC 2.0 payload (Object) and tries to parse it into a JSON.
 * If successful, determine what object is it (response, notification,
 * success, error, or invalid), and return it's type and properly formatted object.
 *
 * @param  {Object} msg
 * @return {Object|Array} an array, or an object of this format:
 *
 *  {
 *    type: <Enum, 'request'|'notification'|'success'|'error'|'invalid'>
 *    payload: <JsonRpc|JsonRpcError>
 *  }
 *
 * @api public
 */
export declare function parseObject(obj: JsonRpc): IParsedObject;
declare const jsonrpc: {
    JsonRpc: typeof JsonRpc;
    JsonRpcError: typeof JsonRpcError;
    request: typeof request;
    notification: typeof notification;
    success: typeof success;
    error: typeof error;
    parse: typeof parse;
    parseObject: typeof parseObject;
};
export default jsonrpc;
export { JsonRpc, JsonRpcError, jsonrpc };
