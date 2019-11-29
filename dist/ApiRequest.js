"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var RsaManager_1 = require("./RsaManager");
/**
 * @description hydraApiRequest is a function that wraps the hydra makeApiRequest to ease it's use
 * and also acting as a repository.
 * @param object RequestMsg
 */
exports.HydraApiRequest = function (object) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // if body was string an error happens thats why we will handle that 
                if (typeof object.body === 'string')
                    object.body = { message: object.body };
                return [4 /*yield*/, _1.Hydra.makeAPIRequest(__assign({ from: _1.Hydra.getServiceName() }, object))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * @description this will just be a wrapper for the hydraApiRequest
 * but will send the body encrypted and receive then decrypt it
 * so , the user may not have any burdon of handling any encryption or decryptions logic
 * @param object SecureRequestMsg
 */
exports.HydraSecureApiRequest = function (object) { return __awaiter(_this, void 0, void 0, function () {
    var _a, publicKey, response, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(object.body && Object.keys(object.body).length)) return [3 /*break*/, 2];
                _a = object;
                return [4 /*yield*/, RsaManager_1.RsaEncryptWithPublic(JSON.stringify(object.body), object.publicKey)];
            case 1:
                _a.body = _c.sent();
                _c.label = 2;
            case 2:
                publicKey = object.publicKey;
                // deleting the private and public key objects before sending 
                delete object.publicKey;
                return [4 /*yield*/, exports.HydraApiRequest(object)];
            case 3:
                response = _c.sent();
                if (!(response.statusCode === 200)) return [3 /*break*/, 5];
                _b = response;
                return [4 /*yield*/, RsaManager_1.RsaDecryptWithPublic(response.result, publicKey)];
            case 4:
                _b.result = _c.sent();
                // handling if the response result was a string the parse will throw an error
                // so we just need to catch it and do nothing then return as it is
                // otherwise if it's an object then just parse it to a normal javascript object
                try {
                    response.result = JSON.parse(response.result);
                }
                catch (err) { }
                _c.label = 5;
            case 5: return [2 /*return*/, response];
        }
    });
}); };
/**
 * @description HandleRsaRequest returns a middleware which handles incoming Rsa encrypted requests and decrypt it
 * so that receiving routers may get the request directly
 * @param privateKeyPath This should be the private key path or object that represent the private key place
 * @returns middleware function
 */
exports.HandleRsaRequest = function (privateKeyPath) {
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var body, decryptedBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body.message;
                    return [4 /*yield*/, RsaManager_1.RsaDecryptWithPrivate(body, privateKeyPath)];
                case 1:
                    decryptedBody = _a.sent();
                    // replacing the new decrypted body instead of the body
                    req.body = JSON.parse(decryptedBody);
                    return [2 /*return*/, next()];
            }
        });
    }); };
};
/**
 *
 * @param object
 * @param object.body the body you want to respond with
 * @param object.res the express response
 * @param object.privateKey this should be the private key path or the private key object
 */
exports.SendSecure = function (_a) {
    var body = _a.body, res = _a.res, privateKey = _a.privateKey;
    return __awaiter(_this, void 0, void 0, function () {
        var encryptedBody;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(body && Object.keys(body).length))
                        return [2 /*return*/, body];
                    // handle of the body was a string we dont need to pass it on JSON.stringify
                    if (typeof body === 'object')
                        body = JSON.stringify(body);
                    return [4 /*yield*/, RsaManager_1.RsaEncryptWithPrivate(body, privateKey)];
                case 1:
                    encryptedBody = _b.sent();
                    return [2 /*return*/, res.sendOk(encryptedBody)];
            }
        });
    });
};
//# sourceMappingURL=ApiRequest.js.map