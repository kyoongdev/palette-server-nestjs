"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const appConfig_1 = __importDefault(require("./appConfig"));
const filter_1 = require("./common/filter");
const interceptor_1 = __importDefault(require("./common/interceptor"));
const jwt_1 = require("./common/jwt/jwt");
const modules_1 = __importDefault(require("./modules"));
const global_1 = require("./modules/global");
const providers = [...filter_1.Filters, ...interceptor_1.default, jwt_1.JwtProvider, appConfig_1.default];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            global_1.GlobalModule,
            ...modules_1.default,
        ],
        controllers: [app_controller_1.AppController],
        providers: [...providers],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map