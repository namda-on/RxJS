import { People } from '../types/people';
export declare class PeopleService {
    people: People[];
    findAllPeople(): People[];
    findPeopleByNameLike(keyword: string): People[];
    findPeopleById(id: number): People;
    findRandomName(): People;
}
