import { PeopleService } from './people.service';
import { People } from '../types/people';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    find(name: any): Promise<People[]>;
    findWithError(name: any): Promise<People[]>;
    findOne(params: any): Promise<People>;
    findOneWithError(params: any): Promise<People>;
    findRandomName(): Promise<People>;
}
