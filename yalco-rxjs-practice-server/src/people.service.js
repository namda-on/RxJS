"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const peopleJson = require("../database/people.json");
let PeopleService = class PeopleService {
    constructor() {
        this.people = peopleJson;
    }
    findAllPeople() {
        return this.people;
    }
    findPeopleByNameLike(keyword) {
        return this.people.filter(p => {
            return (p.first_name.toLowerCase().includes(keyword.toLowerCase())
                || p.last_name.toLowerCase().includes(keyword.toLowerCase()));
        });
    }
    findPeopleById(id) {
        return this.people.filter(p => { return p.id == id; })[0];
    }
    findRandomName() {
        return this.people[Math.floor(Math.random() * this.people.length)];
    }
};
PeopleService = __decorate([
    common_1.Injectable()
], PeopleService);
exports.PeopleService = PeopleService;
//# sourceMappingURL=people.service.js.map