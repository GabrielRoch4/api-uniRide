import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllRides = async (_, res) => {
    try {
        const rides = await prisma.ride.findMany({
            include: {
                User: {
                    select: {
                        Id: true,
                        Nome: true,
                        Sobrenome: true,
                        Email: true,
                        Telefone: true,
                        Genero: true
                    }
                }
            }
        });

        if (rides.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: "Não há caronas cadastradas!"
            });
        }

        return res.status(200).json({
            statusCode: 200,
            rides
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createRide = async (req, res) => {
    const userId = req.userId;

    // Recupera dados da requisição
    const { Origem, Destino } = req.body;

    // Validação dos dados
    if (typeof Origem !== 'string' || Origem.trim() === '') {   
        return res.status(400).json({
            statusCode: 400,
            message: "Informe um ponto de origem!"
        });
    }

    if (typeof Destino !== 'string' || Destino.trim() === '') {
        return res.status(400).json({
            statusCode: 400,
            message: "Informe um ponto de destino!"
        });
    }

    try {
        // Criação da carona associada ao usuário logado
        const newRide = await prisma.ride.create({
            data: {
                Origem,
                Destino,
                User: {
                    connect: { Id: userId }
                }
            },
        });

        return res.status(201).json({
            statusCode: 201,
            message: "Carona criada com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

