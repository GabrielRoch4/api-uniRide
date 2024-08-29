// app.js
import express from "express";
import cors from "cors";
import router from "./routes/router.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
