import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { cadastroShecma, loginShecma } from "../schemas/authShecema.js";



export async function cadastro(req, res) {

    const { name, email, password, verifyPassword } = req.body

    const validation = cadastroShecma.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map((det) => det.message);
        return res.status(422).send(errors);
    }

    try {
        const verifyUser = await db.collection("register").findOne({ email })

        if (verifyUser) return res.status(409).send("Este email existente")
        if (password !== verifyPassword || password.length < 3 || verifyPassword.length < 3) return res.status(422).send("Senhas diferentes ")

        const hash = bcrypt.hashSync(password, 10)

        const register = {
            name,
            email,
            password: hash,
            verifyPassword: hash
        }

        await db.collection("register").insertOne(register)
        res.sendStatus(201)

    } catch (erro) {
        return res.status(409).send("Erro no catch")
    }
}

export async function login(req, res) {

    const { email, password } = req.body

    const validation = loginShecma.validate(req.body, { abortEarly: false })

    if (validation.error) {

        const errors = validation.error.details.map((det) => det.message);
        return res.status(422).send(errors);
    }


    try {

        const user = await db.collection("register").findOne({ email })
        
        if (!user) return res.status(404).send("Usuário não existente")

        if (user && bcrypt.compareSync(password, user.password)) {

            const token = uuid()

            await db.collection("sessions").insertOne({ userId: user._id, token })

            return res.status(200).send({ token, name: user.name })

        } else {

            return res.status(401).send("Senha inválida")
        }


    } catch (err) { return res.status(401).send("erro no catch") }
}