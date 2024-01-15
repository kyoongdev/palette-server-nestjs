"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("../jwt/jwt");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(configService, jwt) {
        this.configService = configService;
        this.jwt = jwt;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authorization = req.headers.authorization;
        if (!authorization)
            throw new common_1.UnauthorizedException('TOKEN_EMPTY');
        const splittedHeader = authorization.split(' ');
        if (splittedHeader.length !== 2 && splittedHeader[0] !== 'Bearer')
            throw new common_1.UnauthorizedException();
        const decoded = this.jwt.verifyJwt(splittedHeader[1]);
        if (decoded instanceof jsonwebtoken_1.JsonWebTokenError)
            throw new common_1.UnauthorizedException('TOKEN_EXPIRED');
        return true;
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtProvider])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt.guard.js.map