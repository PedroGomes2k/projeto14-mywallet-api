import { ObjectId } from "mongodb"
import { db } from "../database/database.connection.js"
import { transactionSchema } from "../schemas/userShecema.js"
import dayjs from "dayjs"

export async function postTransação(req, res) {

    const { price, active } = req.body
    const { tipo } = req.params
    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).status("É necessario passar o token para requisição!")

    const validation = transactionSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((det) => { det.message })
        return res.status(422).send(erros);
    }

    try {

        const session = await db.collection("sessions").findOne({ token })
        if (!session) return res.status(401).send("Token nao autorizado")


        const user = await db.collection("register").findOne({ _id: session.userId })

        if (user) {

            delete user.password
            delete user.verifyPassword

            if (!price) return res.status(422).send("O preço nao está na forma correta")
            if (!active) return res.status(422).send("A descrição tem que ser precnchida")

            const transaction = {
                price,
                active,
                extrato: tipo,
                userId: session.userId,
                date: dayjs().format('DD/MM')
            }

            await db.collection("transaction").insertOne(transaction)

            return res.status(200).send("deu certo")
        }

    } catch (erro) { return res.status().send("erro no catch") }
}
export async function getHome(req, res) {

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    if (!token) return res.status(401).send("É necessario passar o token para requisição!")

    try {

        const session = await db.collection("sessions").findOne({ token })
        if (!session) return res.status(401).send("Token nao autorizado")

        const user = await db.collection("transaction").find({ userId: session.userId }).toArray()
        if (!user) return res.status(422).send("Este usuário não existe")

        console.log(user)
        return res.status(201).send(user)
    } catch { return res.status(422).send("erro no catch") }
}

