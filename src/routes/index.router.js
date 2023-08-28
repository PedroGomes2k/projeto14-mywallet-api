import { Router } from "express";
import routerAuth from "./auth.routes.js"
import routerUser from "./user.routes.js"

const router = Router()

router.use(routerAuth)
router.use(routerUser)

export default router