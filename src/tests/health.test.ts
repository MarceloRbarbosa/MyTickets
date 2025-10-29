import supertest from "supertest";
import app from "../index";


const api = supertest(app);


describe("GET /health", () => {
    it("should return 200",async () => {
        const { status , text} = await api.get("/health");
        expect(status).toBe(200);
        expect(text).toBe(`I'm okay!`);
    });
})