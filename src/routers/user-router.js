import { Router } from "express";
import { createTransaction, getHome } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/valildate-middleware.js";
import { transactionSchema } from "../schemas/user-shecema.js";
const routerUser = Router();

routerUser
  .post(
    "/nova-transacao/:tipo",
    validateSchemaMiddleware(transactionSchema),
    createTransaction
  )
  .get("/home", getHome);

export { routerUser };
