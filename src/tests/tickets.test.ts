import supertest from "supertest";  
import app from "../index";
import { cleanDb, createEvent, createTicket, generatedTicketData} from "./factories/tickets.factory";
import httpStatus from "http-status";

const api = supertest(app)

describe("CRUD tickets", () => {
   beforeEach(async () => {
      await cleanDb()
   }) 
        
    it("should return status code 201 when creating a new ticket", async () => { 
        const event = await createEvent();
        const ticket =  generatedTicketData();
        
        const { status, body } = await api
        .post("/tickets")
        .send({
            ...ticket,
            eventId: event.id
        })
        
        expect(status).toBe(httpStatus.CREATED);
        expect(body).toEqual(expect.objectContaining({
            id: body.id,
            owner: body.owner,
            code: body.code,
            used: false,
            eventId: event.id
        }));
    });
    
    it("should return all events tickets", async () => {
        const {eventId} = await createTicket();

        const { body } = await api
        .get(`/tickets/${eventId}`)
        
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    owner: expect.any(String),
                    code: expect.any(String),
                    used: expect.any(Boolean),
                })
            ])
        )
    });

    it("should return status code 201 when update a ticket", async () => {
        const event = await createEvent();
        const ticket =  generatedTicketData();
        
        const ticketCreated = await api
        .post("/tickets")
        .send({
            ...ticket,
            eventId: event.id
        })


    const { status } = await api
    .put(`/tickets/use/${ticketCreated.body.id}`)
    .send(ticketCreated.body)

    expect(status).toBe(httpStatus.NO_CONTENT);
});
})


