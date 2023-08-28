import { Router } from "express"
import {cadastro, login} from "../Controllers/authController.js"

const routerAuth = Router()

routerAuth.post("/cadastro", cadastro)
routerAuth.post("/", login)

export default routerAuth