/// <reference types="node" />
import { EventEmitter } from 'events';
import { Application } from 'express';
export interface Hydra extends EventEmitter {
    mcMessageChannelClient: any;
    mcDirectMessageChannelClient: any;
    messageChannelPool: any;
    config: any;
    serviceName: string;
    serviceDescription: string;
    serviceVersion: string;
    isService: boolean;
    initialized: boolean;
    redisdb: any;
    registeredRoutes: any[];
    registeredPlugins: any[];
    /**
     * @name init
     * @summary Initialize Hydra with config object.
     * @param {mixed} config - a string with a path to a configuration file or an
     *                         object containing hydra specific keys/values
     * @param {boolean} testMode - whether hydra is being started in unit test mode
     * @return {object} promise - resolving if init success or rejecting otherwise
     */
    init(config: any | string, testMode: boolean): any;
    /**
     * @name use
     * @summary Use plugins
     * @param {array} plugins - plugins to process
     * @return {undefined}
     */
    use(...plugins: any[]): any;
    /**
     * @name _shutdown
     * @summary Shutdown hydra safely.
     * @return {undefined}
     */
    shutdown(): any;
    /**
     * @name registerService
     * @summary Registers this machine as a Hydra instance.
     * @description This is an optional call as this module might just be used to monitor and query instances.
     * @return {object} promise - resolving if registration success or rejecting otherwise
     */
    registerService(): any;
    /**
     * @name getServiceName
     * @summary Retrieves the service name of the current instance.
     * @throws Throws an error if this machine isn't a instance.
     * @return {string} serviceName - returns the service name.
     */
    getServiceName(): any;
    /**
     * @name getServices
     * @summary Retrieve a list of available instance services.
     * @return {promise} promise - returns a promise which resolves to an array of objects.
     */
    getServices(): any;
    /**
     * @name getServiceNodes
     * @summary Retrieve a list of services even if inactive.
     * @return {promise} promise - returns a promise
     */
    getServiceNodes(): any;
    /**
     * @name findService
     * @summary Find a service.
     * @param {string} name - service name - note service name is case insensitive
     * @return {promise} promise - which resolves with service
     */
    findService(name: any): any;
    /**
     * @name getServicePresence
     * @summary Retrieve a service / instance's presence info.
     * @param {string} name - service name - note service name is case insensitive
     * @return {promise} promise - which resolves with service presence
     */
    getServicePresence(name: any): any;
    /**
     * @name getInstanceID
     * @summary Return the instance id for this process
     * @return {number} id - instanceID
     */
    getInstanceID(): any;
    /**
     * @name getInstanceVersion
     * @summary Return the version of this instance
     * @return {number} version - instance version
     */
    getInstanceVersion(): any;
    /**
     * @name getHealth
     * @summary Retrieve service health info.
     * @private
     * @return {object} obj - object containing service health info
     */
    getHealth(): any;
    /**
     * @name sendToHealthLog
     * @summary Log a message to the service instance's health log queue.
     * @private
     * @throws Throws an error if this machine isn't a instance.
     * @param {string} type - type of message ('error', 'info', 'debug' or user defined)
     * @param {string} message - message to log
     * @param {boolean} suppressEmit - false by default. If true then suppress log emit
     * @return {undefined}
     */
    sendToHealthLog(type: any, message: any, suppressEmit: any): any;
    /**
     * @name getServiceHealthLog
     * @summary Get this service's health log.
     * @throws Throws an error if this machine isn't a instance
     * @param {string} name - name of instance, use getName() if current service is the target.
     *                        note service name is case insensitive.
     * @return {promise} promise - resolves to log entries
     */
    getServiceHealthLog(name: any): any;
    /**
     * @name getServiceHealthAll
     * @summary Retrieve the health status of all instance services.
     * @return {promise} promise - resolves with an array of objects containing instance health information.
     */
    getServiceHealthAll(): any;
    /**
     * @name createUMFMessage
     * @summary Create a UMF style message.
     * @description This is a helper function which helps format a UMF style message.
     *              The caller is responsible for ensuring that required fields such as
     *              "to", "from" and "body" are provided either before or after using
     *              this function.
     * @param {object} message - optional message overrides.
     * @return {object} message - a UMF formatted message.
     */
    createUMFMessage(message: any): any;
    /**
     * @name makeAPIRequest
     * @summary Makes an API request to a hydra service.
     * @description If the service isn't present and the message object has its
     *              message.body.fallbackToQueue value set to true, then the
     *              message will be sent to the services message queue.
     * @param {object} message - UMF formatted message
     * @param {object} sendOpts - serverResponse.send options
     * @return {promise} promise - response from API in resolved promise or
     *                   error in rejected promise.
     */
    makeAPIRequest(message: any, sendOpts?: any): any;
    /**
     * @name sendMessage
     * @summary Sends a message to all present instances of a  hydra service.
     * @param {string | object} message - Plain string or UMF formatted message object
     * @return {object} promise - resolved promise if sent or
     *                   error in rejected promise.
     */
    sendMessage(message: any): any;
    /**
     * @name sendReplyMessage
     * @summary Sends a reply message based on the original message received.
     * @param {object} originalMessage - UMF formatted message object
     * @param {object} messageResponse - UMF formatted message object
     * @return {object} promise - resolved promise if sent or
     *                   error in rejected promise.
     */
    sendReplyMessage(originalMessage: any, messageResponse: any): any;
    /**
     * @name sendBroadcastMessage
     * @summary Sends a message to all present instances of a  hydra service.
     * @param {string | object} message - Plain string or UMF formatted message object
     * @return {object} promise - resolved promise if sent or
     *                   error in rejected promise.
     */
    sendBroadcastMessage(message: any): any;
    /**
     * @name registerRoutes
     * @summary Register routes
     * @description Routes must be formatted as UMF To routes. https://github.com/cjus/umf#%20To%20field%20(routing)
     * @param {array} routes - array of routes
     * @return {object} Promise - resolving or rejecting
     */
    registerRoutes(routes: any): any;
    /**
     * @name getAllServiceRoutes
     * @summary Retrieve all service routes.
     * @return {object} Promise - resolving to an object with keys and arrays of routes
     */
    getAllServiceRoutes(): any;
    /**
     * @name matchRoute
     * @summary Matches a route path to a list of registered routes
     * @private
     * @param {string} routePath - a URL path to match
     * @return {boolean} match - true if match, false if not
     */
    matchRoute(routePath: any): any;
    /**
     * @name queueMessage
     * @summary Queue a message
     * @param {object} message - UMF message to queue
     * @return {promise} promise - resolving to the message that was queued or a rejection.
     */
    queueMessage(message: any): any;
    /**
     * @name getQueuedMessage
     * @summary retrieve a queued message
     * @param {string} serviceName who's queue might provide a message
     * @return {promise} promise - resolving to the message that was dequeued or a rejection.
     */
    getQueuedMessage(serviceName: any): any;
    /**
     * @name markQueueMessage
     * @summary Mark a queued message as either completed or not
     * @param {object} message - message in question
     * @param {boolean} completed - (true / false)
     * @param {string} reason - if not completed this is the reason processing failed
     * @return {promise} promise - resolving to the message that was dequeued or a rejection.
     */
    markQueueMessage(message: any, completed: any, reason: any): any;
    /**
     * @name _getConfig
     * @summary retrieve a stored configuration file
     * @param {string} label - service label containing servicename and version: such as myservice:0.0.1
     * @return {promise} promise - resolving to a configuration file in object format
     */
    getConfig(label: any): any;
    /**
     * @name _putConfig
     * @summary store a configuration file
     * @param {string} label - service label containing servicename and version: such as myservice:0.0.1
     * @param {object} config - configuration object
     * @return {promise} promise - resolving or rejecting.
     */
    putConfig(label: any, config: any): any;
    /**
     * @name listConfig
     * @summary Return a list of config keys
     * @param {string} serviceName - name of service
     * @return {promise} promise - resolving or rejecting.
     */
    listConfig(serviceName: any): any;
    /**
     * @name hasServicePresence
     * @summary Indicate if a service has presence.
     * @description Indicates if a service has presence, meaning the
     *              service is running in at least one node.
     * @param {string} name - service name - note service name is case insensitive
     * @return {promise} promise - which resolves with TRUE if presence is found, FALSE otherwise
     */
    hasServicePresence(name: any): any;
    /**
     * @name getClonedRedisClient
     * @summary get a Redis client connection which points to the same Redis server that hydra is using
     * @return {object} - Redis Client
     */
    getClonedRedisClient(): any;
    /**
     * @name getUMFMessageHelper
     * @summary returns UMF object helper
     * @return {object} helper - UMF helper
     */
    getUMFMessageHelper(): any;
    /**
     * @name getServerRequestHelper
     * @summary returns ServerRequest helper
     * @return {object} helper - service request helper
     */
    getServerRequestHelper(): any;
    /**
     * @name getServerResponseHelper
     * @summary returns ServerResponse helper
     * @return {object} helper - service response helper
     */
    getServerResponseHelper(): any;
    /**
     * @name getUtilsHelper
     * @summary returns a Utils helper
     * @return {object} helper - utils helper
     */
    getUtilsHelper(): any;
    /**
     * @name getConfigHelper
     * @summary returns a config helper
     * @return {object} helper - config helper
     */
    getConfigHelper(): any;
}
export interface HydraExpress {
    config: any;
    server: any;
    testMode: boolean;
    appLogger: any;
    registeredPlugins: any[];
    /**
     * @name getExpressApp
     * @summary Retrieve the ExpressJS app object
     * @return {object} app - express app object
     */
    getExpressApp(): Application;
    /**
     * @name init
     * @summary Initializes the HydraExpress module
     * @param {object} config - application configuration object
     * @param {string} version - version of application
     * @param {function} registerRoutesCallback - callback function to register routes
     * @param {function} registerMiddlewareCallback - callback function to register middleware
     * @return {object} Promise - promise resolving to hydraexpress ready or failure
     */
    init(config: any, version: string, registerRoutesCallback: Function, registerMiddlewareCallback?: Function): Promise<any>;
    /**
     * @name shutdown
     * @summary Shutdown hydra-express safely.
     * @return {object} Promise - promise resolving to hydraexpress ready or failure
     */
    shutdown(): Promise<any>;
    /**
     * @name getExpress
     * @summary Retrieve the underlying ExpressJS object
     * @return {object} express - expressjs object
     */
    getExpress(): any;
    /**
     * @name getHydra
     * @summary Retrieve the underlying Hydra object
     * @return {object} hydra - hydra object
     */
    getHydra(): Hydra;
    /**
     * @name getRuntimeConfig
     * @summary Retrieve loaded configuration object
     * @return {object} config - immutable object
     */
    getRuntimeConfig(): any;
    /**
     * @name log
     * @summary Logger. Use to log messages
     * @param {string} type - type of message: 'fatal', 'error', 'debug', 'info'
     * @param {string} str - string message to log
     * @return {undefined}
     */
    log(type: string | 'fatal' | 'error' | 'debug' | 'info', str: string): undefined;
    /**
     * @name registerRoutes
     * @summary Register API routes.
     * @param {string} routeBaseUrl - route base url, ex: /v1/offers
     * @param {object} api - express api object
     * @return {undefined}
     */
    registerRoutes(routes: {
        [key: string]: string;
    }): undefined;
    /**
     * @name sendResponse
     * @summary Send a server response to caller.
     * @param {number} httpCode - HTTP response code
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {undefined}
     */
    sendResponse(httpCode: number, res: any, data: any): undefined;
    /**
     * ------------------------------------------------------------
     */
    /**
     * @name use
     * @summary Adds plugins to Hydra
     * @param {...object} plugins - plugins to register
     * @return {object} - Promise which will resolve when all plugins are registered
     */
    use(...plugins: any[]): any;
    /**
     * @name validateConfig
     * @summary Validates a configuration object to ensure all required fields are present
     * @private
     * @param {object} config - config object
     * @return {array} array - of missing fields or empty array
     */
    validateConfig(config: any): any;
    /**
     * @name start
     * @summary Starts the HydraExpress server
     * @param {function} resolve - promise resolve
     * @param {function} _reject - promise reject
     * @private
     * @return {undefined}
     */
    start(resolve: any, _reject: any): undefined;
    /**
     * @name initService
     * @summary Initialize service
     * @private
     * @return {undefined}
     */
    initService(): undefined;
}
export interface UMFMessage {
    to: string;
    from: string;
    body: any;
}
interface StatusArray {
    [key: string]: [string, string];
}
export interface FWSPServerResponse {
    setTestMode(): undefined;
    /**
    * @name enableCORS
    * @summary Enable / Disable CORS support
    * @param {boolean} state - true if CORS should be enabled
    */
    enableCORS(state: any): undefined;
    /**
    * @name createResponseObject
    * @summary Create a data response object.
    * @description This creates a consistently formatted HTTP response. It can be used
    *              with any of the server-response send methods in the data param.
    * @param {number} httpCode - HTTP code (Ex. 404)
    * @param {object} resultPayload - object with {result: somevalue}
    * @return {object} response - object suitable for sending via HTTP
    */
    createResponseObject(httpCode: any, resultPayload: any): any;
    /**
     * @name sendResponse
     * @summary Send a server response to caller.
     * @param {number} code - HTTP response code
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendResponse(code: any, res: any, data: any): any;
    /**
     * @name sendOk
     * @summary Send an HTTP_OK server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendOk(res: any, data: any): any;
    /**
     * @name sendCreated
     * @summary Send an HTTP_CREATED server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendCreated(res: any, data: any): any;
    /**
     * @name sendMovedPermanently
     * @summary Send an HTTP_MOVED_PERMANENTLY server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendMovedPermanently(res: any, data: any): any;
    /**
     * @name sendInvalidRequest
     * @summary Send an HTTP_BAD_REQUEST server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendInvalidRequest(res: any, data: any): any;
    /**
     * @name sendInvalidUserCredentials
     * @summary Send an HTTP_UNAUTHORIZED server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendInvalidUserCredentials(res: any, data: any): any;
    /**
     * @name sendPaymentRequired
     * @summary Send an HTTP_PAYMENT_REQUIRED server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendPaymentRequired(res: any, data: any): any;
    /**
     * @name sendNotFound
     * @summary Send an HTTP_NOT_FOUND server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendNotFound(res: any, data: any): any;
    /**
     * @name sendInvalidSession
     * @summary Send an HTTP_BAD_REQUEST server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendInvalidSession(res: any, data: any): any;
    /**
     * @name sendRequestFailed
     * @summary Send an HTTP_SERVER_ERROR server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendRequestFailed(res: any, data: any): any;
    /**
     * @name sendDataConflict
     * @summary Send an HTTP_CONFLICT server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendDataConflict(res: any, data: any): any;
    /**
     * @name sendTooLarge
     * @summary Send an HTTP_TOO_LARGE server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendTooLarge(res: any, data: any): any;
    /**
     * @name sendTooManyRequests
     * @summary Send an HTTP_TOO_MANY_REQUEST server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendTooManyRequests(res: any, data: any): any;
    /**
     * @name sendServerError
     * @summary Send an HTTP_SERVER_ERROR server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendServerError(res: any, data: any): any;
    /**
     * @name sendInternalError
     * @summary Alias for sendServerError
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendInternalError(res: any, data: any): any;
    /**
     * @name sendMethodNotImplemented
     * @summary Send an HTTP_METHOD_NOT_IMPLEMENTED server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendMethodNotImplemented(res: any, data: any): any;
    /**
     * @name sendConnectionRefused
     * @summary Send an HTTP_CONNECTION_REFUSED server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendUnavailableError(res: any, data: any): any;
    /**
     * @name sendUnavailableError
     * @summary Send an HTTP_METHOD_NOT_IMPLEMENTED server response to caller.
     * @param {object} res - Node HTTP response object
     * @param {object} data - An object to send
     * @return {object} res - Returns the (res) response object when in test mode, else undefined
     */
    sendUnavailableError(res: any, data: any): any;
    HTTP_OK: number;
    HTTP_CREATED: number;
    HTTP_MOVED_PERMANENTLY: number;
    HTTP_BAD_REQUEST: number;
    HTTP_UNAUTHORIZED: number;
    HTTP_PAYMENT_REQUIRED: number;
    HTTP_NOT_FOUND: number;
    HTTP_METHOD_NOT_ALLOWED: number;
    NOT_ACCEPTABLE: number;
    HTTP_CONFLICT: number;
    HTTP_TOO_LARGE: number;
    HTTP_TOO_MANY_REQUEST: number;
    HTTP_SERVER_ERROR: number;
    HTTP_METHOD_NOT_IMPLEMENTED: number;
    HTTP_CONNECTION_REFUSED: number;
    HTTP_SERVICE_UNAVAILABLE: number;
    STATUSMESSAGE: number;
    STATUSDESCRIPTION: number;
    STATUS: {
        '200': StatusArray;
        '201': StatusArray;
        '301': StatusArray;
        '400': StatusArray;
        '401': StatusArray;
        '402': StatusArray;
        '404': StatusArray;
        '405': StatusArray;
        '406': StatusArray;
        '409': StatusArray;
        '413': StatusArray;
        '429': StatusArray;
        '500': StatusArray;
        '501': StatusArray;
        '502': StatusArray;
        '503': StatusArray;
    };
}
export {};
