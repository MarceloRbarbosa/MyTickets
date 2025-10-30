
import express, { Request, Response, NextFunction } from "express";
import errorHandlerMiddleware, { ERRORS } from "../../middlewares/error-middleware";
import { validateSchema } from "middlewares/schema-middleware";
import Joi from "joi";


export function createErrorSimulator() {  
    const app = express();
    
        app.get("/simulate/:type", (req: Request, res: Response, next: NextFunction) => {
          const type = req.params.type;
          const err: any = { type, message: `Erro do tipo ${type}` };
          next(err);
        });
        app.use(errorHandlerMiddleware);

        return { app, ERRORS }
      }


export function schemaSimulator(){
    const app = express();
    app.use(express.json());

    const testSchema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().integer().min(0).required(),
  });

    app.post("/test", validateSchema(testSchema), (req, res) => {
      res.status(200).send({ success: true, data: req.body });
    });

    return { app }
}

