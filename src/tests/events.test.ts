import supertest from "supertest";
import app from "../index"
import { cleanDb, createEvent, generatedTicketData } from "./factories/tickets.factory";
import httpStatus from "http-status";
import { generatedEventData } from "./factories/event.factory";
import { create } from "domain";

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
    
    
    it("should return event by Id",async () => {
        const event = await createEvent();
       
       
        const { body } = await api
        .get(`/events/${event.id}`)
        
        expect(body).toEqual({
            date: expect.any(String),
            id: expect.any(Number),
            name: event.name,
        })
    })

    it("should return status code 201 when creating a new event", async () => {
        const { status, body } = await api
        .post("/events") 
        .send(generatedEventData())
       
        expect(status).toBe(httpStatus.CREATED);
        expect(body).toEqual(expect.objectContaining({
            date: expect.any(String),
            id: expect.any(Number),
            name: expect.any(String),
        }));
    });

    it("should return status code 200 when update a ticket", async () => {
        const event = await createEvent();

        const { status, body } = await api
        .put(`/events/${event.id}`)
        .send(generatedEventData());

       
        console.log(body)
        expect(status).toBe(httpStatus.OK);
    });

    it("should return status code 204 when delete a ticket", async () => {
        const event = await createEvent();
        const { status } = await api
        .delete(`/events/${event.id}`)
        
        expect(status).toBe(httpStatus.NO_CONTENT);
    });
});