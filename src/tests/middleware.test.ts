import request from "supertest";
import { createErrorSimulator, schemaSimulator } from "./factories/middleware.factory";
import httpStatus from "http-status";




describe("ErrorHandlerMiddleware", () => { 
  const { app, ERRORS } = createErrorSimulator(); 

  it("should return status and message correctly for known error types",async () => {  
      for (const [type, statusCode] of Object.entries(ERRORS)) {
        const {status, text} = await request(app).get(`/simulate/${type}`);
        expect(status).toBe(statusCode);
        expect(text).toBe(`Erro do tipo ${type}`);
      }
    });
  
  it("should return status 500 for unknown error types",async () => {  
      const {status, text} = await request(app).get("/simulate/unknown");
      
        expect(status).toBe(500);
        expect(text).toBe(`Erro do tipo unknown`);
    });
  })


describe("ValidateSchema Middleware", () => {
  const { app } = schemaSimulator();
  
  it("should return status code 422 when body is not valid", async () => { 
    const invalidBody = { name: "a"};
    const { status } = await request(app)
    .post("/test")
    .send(invalidBody);

    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });  
})

