import { Router } from "express";
import { postTransação, getHome } from "../Controllers/userController.js";
const routerUser = Router()

routerUser.post("/nova-transacao/:tipo", postTransação)
routerUser.get("/home", getHome)

export default routerUser