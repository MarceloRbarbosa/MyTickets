import { faker } from "@faker-js/faker";
import prisma from "database";
import supertest from "supertest";
import app from "index";

const api = supertest(app)

export async function cleanDb() {
        await prisma.ticket.deleteMany({});
        await prisma.event.deleteMany({});
        }
   
export function generatedTicketData() {
    return {      
        code: faker.string.uuid(),
        owner: faker.person.fullName(),    
    }
}


export async function createEvent() {
    return await prisma.event.create({
        data: {
            name: faker.lorem.word(),
            date: faker.date.future()
        }
    })
}

export async function createTicket() {
    const event = await createEvent();
    const ticket = generatedTicketData();

const res = await api.post("/tickets")
        .send({
            ...ticket,
            eventId: event.id
        })
    
    return  {
        ticketId: res.body.id,
        eventId: event.id
    }
  
} 
