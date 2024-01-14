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
exports.MusicianEntity = void 0;
const typeorm_1 = require("typeorm");
let MusicianEntity = class MusicianEntity {
};
exports.MusicianEntity = MusicianEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MusicianEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false }),
    __metadata("design:type", String)
], MusicianEntity.prototype, "stageName", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false }),
    __metadata("design:type", String)
], MusicianEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { nullable: false }),
    __metadata("design:type", Number)
], MusicianEntity.prototype, "groupType", void 0);
__decorate([
    (0, typeorm_1.Column)('mediumtext', { nullable: false }),
    __metadata("design:type", String)
], MusicianEntity.prototype, "introduction", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true, nullable: false }),
    __metadata("design:type", Boolean)
], MusicianEntity.prototype, "isPending", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false, nullable: false }),
    __metadata("design:type", Boolean)
], MusicianEntity.prototype, "isAuthorized", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MusicianEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MusicianEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], MusicianEntity.prototype, "deletedAt", void 0);
exports.MusicianEntity = MusicianEntity = __decorate([
    (0, typeorm_1.Entity)()
], MusicianEntity);
//# sourceMappingURL=musicain.entity.js.map