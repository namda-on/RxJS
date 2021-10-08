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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleController = void 0;
const common_1 = require("@nestjs/common");
const people_service_1 = require("./people.service");
let PeopleController = class PeopleController {
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    async find(name) {
        return await new Promise((resolve) => {
            setTimeout(() => {
                if (!name) {
                    resolve(this.peopleService.findAllPeople());
                }
                else {
                    resolve(this.peopleService.findPeopleByNameLike(name));
                }
            }, 500 + (Math.random() * 500));
        });
    }
    async findWithError(name) {
        const result = await new Promise((resolve) => {
            setTimeout(() => {
                if (Math.random() < 0.25) {
                    resolve(null);
                }
                else {
                    if (!name) {
                        resolve(this.peopleService.findAllPeople());
                    }
                    else {
                        resolve(this.peopleService.findPeopleByNameLike(name));
                    }
                }
            }, 500 + (Math.random() * 500));
        });
        if (result === null) {
            throw new common_1.HttpException('error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }
    async findOne(params) {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.peopleService.findPeopleById(params.id));
            }, 500 + Math.random() * 500);
        });
    }
    async findOneWithError(params) {
        const result = await new Promise((resolve) => {
            setTimeout(() => {
                if (Math.random() < 0.25) {
                    resolve(null);
                }
                else {
                    resolve(this.peopleService.findPeopleById(params.id));
                }
            }, 500 + Math.random() * 500);
        });
        if (result === null) {
            throw new common_1.HttpException('error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }
    async findRandomName() {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.peopleService.findRandomName());
            }, 1000);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "find", null);
__decorate([
    common_1.Get('/quarter-error'),
    __param(0, common_1.Query('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "findWithError", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "findOne", null);
__decorate([
    common_1.Get('/quarter-error/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "findOneWithError", null);
__decorate([
    common_1.Get('/name/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "findRandomName", null);
PeopleController = __decorate([
    common_1.Controller('people'),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], PeopleController);
exports.PeopleController = PeopleController;
//# sourceMappingURL=people.controller.js.map