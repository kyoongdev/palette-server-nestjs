"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const provider_1 = require("./provider");
dotenv_1.default.config();
exports.default = new typeorm_1.DataSource((0, provider_1.buildDataSourceOption)(new config_1.ConfigService()));
//# sourceMappingURL=data-source.js.map