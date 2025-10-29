import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "index";

const api = supertest(app)  


export function generatedEventData() {
    return {
        name: faker.lorem.word(),
        date: faker.date.future()
    }
}

export function eventExpiredData(){
    return {
        id: 1,
        name: faker.lorem.word(),
        date: faker.date.past()
    }
}
