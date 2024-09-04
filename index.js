import 'dotenv/config';
import express from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*', // Substitua pelo seu domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/", router);

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const DATABASE_URL = process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log(`"DATABASE_URL:", ${DATABASE_URL}`);
  console.log(`"SECRET:", ${SECRET}`);
  console.log(`Servidor rodando na porta ${PORT}`);
});
