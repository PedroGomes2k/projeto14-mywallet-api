import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import { routerUser } from "./routers/user-router.js";
import { routerAuth } from "./routers/auth-router.js";
import httpStatus from "http-status";
import errorHandlingMiddleware from "./middlewares/error-middleware.js";


const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => {
    return res.status(httpStatus.OK).send("It's ok!");
  })
  .use(routerUser)
  .use(routerAuth)
  .use(errorHandlingMiddleware);

export default app;
