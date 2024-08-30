import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import * as dotenv from "dotenv"

dotenv.config()

const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        
        PrismaClient.user.findOne({Email: req.body.Email}, (error, User) => {
            if(!User) return res.status(401).json({
                statusCode: 401,
                message: "Usuário não encontrado!",
                data: {
                    email: req.body.Email
                }
            })

            const PasswordValidation = bcrypt.compareSync(req.body.Password, User.Password)

            if(!PasswordValidation) return res.status(401).json({
                statusCode: 401,
                message: "Não autorizado!"
            })

            const token = jwt.sign({Nome: User.Nome}, SECRET)

            res.status(200).json({
                statusCode: 200,
                message: "login realizado com sucesso!",
                data: {
                    token
                }
            })
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

export default {
    login
}