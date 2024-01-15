"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonInterceptor = void 0;
const common_1 = require("@nestjs/common");
let JsonInterceptor = class JsonInterceptor {
    intercept(context, next) {
        this.parseJson(context.switchToHttp().getRequest().body);
        return next.handle();
    }
    parseJson(body) {
        Object.entries(body).forEach(([key, value]) => {
            if (typeof value === 'undefined' || value === null || (typeof value === 'string' && value.length === 0)) {
                body[key] = undefined;
            }
            else if (typeof value === 'object') {
                this.parseJson(value);
            }
        });
    }
};
JsonInterceptor = __decorate([
    (0, common_1.Injectable)()
], JsonInterceptor);
exports.JsonInterceptor = JsonInterceptor;
//# sourceMappingURL=json.interceptor.js.map