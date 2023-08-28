import express, { json } from "express"
import cors from "cors"
import router from "./routes/index.router.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

// 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

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})  