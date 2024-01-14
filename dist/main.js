"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
(async function () {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(8000, () => console.log('SERVER STARTED'));
})();
//# sourceMappingURL=main.js.map