"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var devkit_1 = require("@nrwl/devkit");
var util_1 = require("util");
var child_process_1 = require("child_process");
process.env['DATABASE_URL'] = 'postgresql://test:test@localhost:5433/test?schema=public';
process.env['JWT_ACCESS_TOKEN_SECRET'] = 'asdfiusd3823qhf39hqfd823nbajksdfuaoqh83';
process.env['JWT_ACCESS_TOKEN_EXPIRATION_TIME'] = '1h';
process.env['JWT_REFRESH_TOKEN_SECRET'] = 'asdfiusd3823qhf39hqfd823nbajksdfuaoqh94';
process.env['JWT_REFRESH_TOKEN_EXPIRATION_TIME'] = '14d';
process.env['JWT_REFRESH_TOKEN_EXPIRATION_DAY'] = '14';
process.env['SALT'] = '10';
process.env['BASE_URL'] = 'http://localhost:4200/';
process.env['SALT'] = '10';
process.env['JWT_VERIFICATION_TOKEN_SECRET'] = '7AnEd5epLmdaJfUrokkR';
process.env['JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'] = '21600';
process.env['EMAIL_CONFIRMATION_URL'] = 'http://localhost:4200/confirm-email';
process.env['JWT_SECRET'] = 'akdjfsdkfsdf';
var DOCKER_UP = "./tools/executors/api-e2e/docker-run.sh";
var DOCKER_DOWN = 'docker stop plantpay-test';
function echoExecutor(options, context) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var stderr, result, result_1, result_1_1, res, _b, stdout, stderr_1, e_1_1, success;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.info("Run \"api e2e tests\"...");
                    console.info("Run docker, migrations and seed...");
                    return [4 /*yield*/, (0, util_1.promisify)(child_process_1.exec)(DOCKER_UP)];
                case 1:
                    stderr = (_c.sent()).stderr;
                    if (!stderr) return [3 /*break*/, 3];
                    console.error(stderr);
                    return [4 /*yield*/, (0, util_1.promisify)(child_process_1.exec)(DOCKER_DOWN)];
                case 2:
                    _c.sent();
                    return [2 /*return*/, { success: false }];
                case 3: return [4 /*yield*/, (0, devkit_1.runExecutor)({ project: 'server', target: 'test-e2e' }, { detectOpenHandles: true, verbose: true }, context)];
                case 4:
                    result = _c.sent();
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 11, 12, 17]);
                    result_1 = __asyncValues(result);
                    _c.label = 6;
                case 6: return [4 /*yield*/, result_1.next()];
                case 7:
                    if (!(result_1_1 = _c.sent(), !result_1_1.done)) return [3 /*break*/, 10];
                    res = result_1_1.value;
                    if (!!res.success) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, util_1.promisify)(child_process_1.exec)(DOCKER_DOWN)];
                case 8:
                    _b = _c.sent(), stdout = _b.stdout, stderr_1 = _b.stderr;
                    console.log(stdout);
                    console.log(stderr_1);
                    return [2 /*return*/, res];
                case 9: return [3 /*break*/, 6];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _c.trys.push([12, , 15, 16]);
                    if (!(result_1_1 && !result_1_1.done && (_a = result_1["return"]))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _a.call(result_1)];
                case 13:
                    _c.sent();
                    _c.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [4 /*yield*/, (0, util_1.promisify)(child_process_1.exec)(DOCKER_DOWN)];
                case 18:
                    _c.sent();
                    success = true;
                    return [2 /*return*/, { success: success }];
            }
        });
    });
}
exports["default"] = echoExecutor;
