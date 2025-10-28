import supertest from "supertest";
import app from "../index"
import { cleanDb, createEvent, generatedTicketData } from "./factories/tickets.factory";
import { date } from "joi";

const api = supertest(app)


describe("CRUD events", () => {
  beforeAll(async () => {
      await cleanDb()
  })  
    
    it("should return all events", async () => {
        const event = await createEvent();
        const { body } = await api
        .get("/events")
        
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    id: expect.any(Number),
                    name: event.name,
                })
            ])
        )
    }); 
    
    
    it("should return status event by Id",async () => {
        const event = await createEvent();
       
       
        const { body } = await api
        .get(`/events/${event.id}`)
        
        expect(body).toEqual({
            date: expect.any(String),
            id: expect.any(Number),
            name: event.name,
        })
    })
});