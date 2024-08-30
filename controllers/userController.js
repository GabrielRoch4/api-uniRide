import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export const getAllUsers = async (_, res) => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) return res.status(404).json({
      statusCode: 404,  
      message: "Não há usuários cadastrados!"
    });

    return res.status(200).json({
      statusCode: 200,
      users
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getByUserId = async (req, res) => {
  try {
    // Verifica se o ID do usuário autenticado corresponde ao ID do usuário solicitado
    if (req.userId !== req.params.id) {
      return res.status(403).json({
        statusCode: 403,
        message: "Você não tem permissão para acessar essas informações!"
      });
    }

    const user = await prisma.user.findUnique({
      where: { Id: req.params.id },
    });

    if (!user) return res.status(404).json({
      statusCode: 404,
      message: "Usuário não encontrado!"
    });

    return res.status(200).json({
      statusCode: 200,
      user
    });
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
    Cidade,
    Role // Adicionado
  } = req.body;

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(Senha, 10);

    // Determinar o Role com base no Role do usuário autenticado
    let userRole = 'user';
    if (req.userId) { // Usuário autenticado
      const currentUser = await prisma.user.findUnique({
        where: { Id: req.userId },
      });

      if (currentUser && currentUser.Role === 'admin' && Role) {
        userRole = Role; // Permite definir o Role do novo usuário apenas se o criador for admin
      }
    }

    // Criação do usuário
    const newUser = await prisma.user.create({
      data: {
        Nome,
        Sobrenome, 
        CPF,
        Telefone,
        Genero,
        Email,
        Senha: hashedPassword,
        DataNasc, 
        CEP, 
        Logradouro, 
        Bairro, 
        Numero, 
        Complemento,
        Estado, 
        Cidade,
        Role: userRole, // Definindo o Role
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Usuário criado com sucesso!"
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateUser = async (req, res) => {
  // Verifica se o ID do usuário autenticado corresponde ao ID do usuário solicitado
  if (req.userId !== req.params.id) {
    return res.status(403).json({
      statusCode: 403,
      message: "Você não tem permissão para atualizar este usuário!"
    });
  }

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
      return res.status(404).json({
        statusCode: 404,
        message: "Usuário não encontrado!"
      });
    }

    const updateData = {};

    if (Nome) updateData.Nome = Nome;
    if (Sobrenome) updateData.Sobrenome = Sobrenome;
    if (CPF) updateData.CPF = CPF;
    if (Telefone) updateData.Telefone = Telefone;
    if (Genero) updateData.Genero = Genero;
    if (Email) updateData.Email = Email;
    if (Senha) {
      updateData.Senha = await bcrypt.hash(Senha, 10);
    }
    if (DataNasc) updateData.DataNasc = DataNasc;
    if (CEP) updateData.CEP = CEP;
    if (Logradouro) updateData.Logradouro = Logradouro;
    if (Bairro) updateData.Bairro = Bairro;
    if (Numero) updateData.Numero = Numero;
    if (Complemento) updateData.Complemento = Complemento;
    if (Estado) updateData.Estado = Estado;
    if (Cidade) updateData.Cidade = Cidade;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Nenhum dado para atualizar foi fornecido!"
      });
    }

    const updatedUser = await prisma.user.update({
      where: { Id: req.params.id },
      data: updateData,
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Usuário atualizado com sucesso!"
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Verifica se o ID do usuário autenticado corresponde ao ID do usuário solicitado
    if (req.userId !== req.params.id && req.userRole !== 'admin') {
      return res.status(403).json({
        statusCode: 403,
        message: "Você não tem permissão para deletar este usuário!"
      });
    }

    const user = await prisma.user.findUnique({
      where: { Id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "Usuário não encontrado!"
      });
    }

    await prisma.user.delete({
      where: { Id: req.params.id },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Usuário deletado com sucesso!"
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message
    });
  }
};


export const rotaAutenticada = async (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Rota autênticada"
  })
}

