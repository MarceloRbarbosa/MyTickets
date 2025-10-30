import express, { Request, Response, NextFunction } from "express";
import request from "supertest";
import errorHandlerMiddleware, { ERRORS } from "../middlewares/error-middleware";

describe("Middleware: errorHandlerMiddleware", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();

    app.get("/simulate/:type", (req: Request, res: Response, next: NextFunction) => {
      const type = req.params.type;
      const err: any = { type, message: `Erro do tipo ${type}` };
      next(err);
    });


    app.use(errorHandlerMiddleware);
  });

  it("should return status and message correctly for known error types",async () => {
    for (const [type, statusCode] of Object.entries(ERRORS)) {
      const response = await request(app).get(`/simulate/${type}`);
      expect(response.status).toBe(statusCode);
      expect(response.text).toBe(`Erro do tipo ${type}`);
    }
  });


});
