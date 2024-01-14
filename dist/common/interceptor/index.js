"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const json_interceptor_1 = require("./json.interceptor");
const Interceptors = [json_interceptor_1.JsonInterceptor].map((interceptor) => ({
    useClass: interceptor,
    provide: core_1.APP_INTERCEPTOR,
}));
exports.default = Interceptors;
//# sourceMappingURL=index.js.map