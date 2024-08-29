import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (_, res) => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) return res.status(404).json("Não há usuários cadastrados!");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getByUserId = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { Id: req.params.id },
    });

    if (!user) return res.status(404).json("Usuário não encontrado!");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const createUser = async (req, res) => {
  const {
    Nome,
    Sobrenome, 
    CPF,
    Telefone,
    Genero,
    Email,
    Senha,
    DataNasc, 
    CEP, 
    Logradouro, 
    Bairro, 
    Numero, 
    Complemento,
    Estado, 
    Cidade 
  } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        Nome,
        Sobrenome, 
        CPF,
        Telefone,
        Genero,
        Email,
        Senha,
        DataNasc, 
        CEP, 
        Logradouro, 
        Bairro, 
        Numero, 
        Complemento,
        Estado, 
        Cidade 
      },
    });
    return res.status(201).json("Usuário criado com sucesso!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateUser = async (req, res) => {
  const {
    Nome,
    Sobrenome, 
    CPF,
    Telefone,
    Genero,
    Email,
    Senha,
    DataNasc, 
    CEP, 
    Logradouro, 
    Bairro, 
    Numero, 
    Complemento,
    Estado, 
    Cidade 
  } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { Id: req.params.id },  
    });

    if (!user) {
      return res.status(404).json("Usuário não encontrado!");
    }

    await prisma.user.update({
      where: { Id: req.params.id },
      data: {
        Nome,
        Sobrenome, 
        CPF,
        Telefone,
        Genero,
        Email,
        Senha,
        DataNasc, 
        CEP, 
        Logradouro, 
        Bairro, 
        Numero, 
        Complemento,
        Estado, 
        Cidade 
      },
    });
    return res.status(200).json("Usuário atualizado com sucesso!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { Id: req.params.id },  
    });

    if (!user) {
      return res.status(404).json("Usuário não encontrado!");
    }

    await prisma.user.delete({
      where: { Id: req.params.id },
    });

    return res.status(200).json("Usuário deletado com sucesso!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

