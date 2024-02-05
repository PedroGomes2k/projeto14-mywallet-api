import { Router } from "express";
import { signUp, login } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/valildate-middleware.js";
import { loginShecma, signUpShecma } from "../schemas/auth-shecema.js";

const routerAuth = Router();

routerAuth
  .post("/cadastro", validateSchemaMiddleware(signUpShecma), signUp)
  .post("/", validateSchemaMiddleware(loginShecma), login);

export { routerAuth };
