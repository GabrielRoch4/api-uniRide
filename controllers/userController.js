import { db } from "../db.js";

export const getAllUsers = (_, res) => {
    const q = "SELECT * FROM users"

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        if(data == "") return res.status(404).json("Não há usuários cadastrados!")

        return res.status(200).json(data);
    })
};

export const getByUserId = (req, res) => {
    const q = 
        "SELECT * FROM users WHERE `id` = ?"

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.json(err)
        
        if(data == "") return res.status(404).json("Usuário não encontrado!")

        return res.status(200).json(data)
    })
}
 
export const createUser = (req, res) => {
    const q =
        "INSERT INTO users(`nome`, `email`) VALUES(?)"

    const values = [
        req.body.nome,
        req.body.email
    ]

    db.query(q, [values], (err) => {
        if(err) return res.json(err)

        return res.status(201).json("Usuário criado com sucesso!")  
    })   
}

export const updateUser  = (req, res) => {
    const q = 
        "UPDATE users SET `nome` = ?, `email` = ? WHERE `id` = ?"

    const values = [
        req.body.nome,
        req.body.email
    ]

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err)

        return res.status(200).json("Usuário atualizado com sucesso!")
    })
}

export const deleteUser = (req, res) => {
    const q = 
        "DELETE FROM users WHERE `id` = ?"

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err)

        return res.status(200).json("Usuário deletado com sucesso!")
    })
}