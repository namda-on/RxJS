"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const people_module_1 = require("./people.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(people_module_1.PeopleModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map