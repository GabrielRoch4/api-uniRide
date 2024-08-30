import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;
const prisma = new PrismaClient();

const login = async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      const user = await prisma.user.findUnique({
        where: { Email }
      });
  
      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: "Usuário não encontrado!",
          data: {
            email: Email
          }
        });
      }
  
      const passwordValidation = await bcrypt.compare(Password, user.Senha);
  
      if (!passwordValidation) {
        return res.status(401).json({
          statusCode: 401,
          message: "Não autorizado!"
        });
      }
  
      const token = jwt.sign({ userId: user.Id, Nome: user.Nome }, SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        statusCode: 200,
        message: "Login realizado com sucesso!",
        data: {
          token
        }
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({
        statusCode: 500,
        message: error.message
      });
    }
  };  

  const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Não autorizado!"
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.userId; // Armazena o ID do usuário decodificado no request
        next();
    } catch (error) {
        console.error("Erro ao verificar token:", error);
        res.status(401).json({
            statusCode: 401,
            message: "Token não válido!"
        });
    }
};


export default {
  login,
  verifyToken
};
