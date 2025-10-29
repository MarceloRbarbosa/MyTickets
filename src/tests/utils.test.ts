import supertest from "supertest";
import app from "../index";
import { cleanDb } from "./factories/tickets.factory";
import { isIdParamValid } from "../utils";

const api = supertest(app);

describe("Utils - is paramValid", () => {
    beforeAll(async () => {
        await cleanDb()
    })

    it("should return a number when give a valid numeric string", () => {
        const result  = isIdParamValid("30")
        expect(result).toBe(30)
    })

    it("should throw an error when given a non numeric string", () => { 
        expect(() => isIdParamValid("aeiou")).toThrow("Invalid id.")    
    })

    it("should throw an error when given a negative number", () => { 
        expect(() => isIdParamValid("-20")).toThrow("Invalid id.")    
    })

    it("should throw an error when given zero", () => { 
        expect(() => isIdParamValid("0")).toThrow("Invalid id.")    
    })
})
