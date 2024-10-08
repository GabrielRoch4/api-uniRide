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

export const getRideById = async (req, res) => {
    const { id } = req.params; // ID da carona a ser recuperada

    try {
        // Recupera a carona pelo ID
        const ride = await prisma.ride.findUnique({
            where: { Id: id },
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

        if (!ride) {
            return res.status(404).json({
                statusCode: 404,
                message: "Carona não encontrada!"
            });
        }

        return res.status(200).json({
            statusCode: 200,
            ride
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};

export const createRide = async (req, res) => {
    const userId = req.userId;
    const { Origem, Destino } = req.body;

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

    const normalizedDestino = Destino.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    try {
        const newRide = await prisma.ride.create({
            data: {
                Origem,
                Destino,
                DestinoNormalized: normalizedDestino,
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

export const updateRide = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const { Origem, Destino } = req.body;

    try {
        const ride = await prisma.ride.findUnique({
            where: { Id: id },
            include: {
                User: true
            }
        });

        if (!ride) {
            return res.status(404).json({
                statusCode: 404,
                message: "Carona não encontrada!"
            });
        }

        if (ride.User.Id !== userId) {
            return res.status(403).json({
                statusCode: 403,
                message: "Você não tem permissão para atualizar esta carona!"
            });
        }

        const updateData = {};
        if (Origem) updateData.Origem = Origem;
        if (Destino) {
            updateData.Destino = Destino;
            updateData.DestinoNormalized = Destino.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: "Nenhum dado para atualizar foi fornecido!"
            });
        }

        const updatedRide = await prisma.ride.update({
            where: { Id: id },
            data: updateData,
        });

        return res.status(200).json({
            statusCode: 200,
            message: "Carona atualizada com sucesso!",
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};

export const deleteRide = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params; // ID da carona a ser excluída

    try {
        // Recupera a carona existente
        const ride = await prisma.ride.findUnique({
            where: { Id: id },
            include: {
                User: true // Inclui o usuário que criou a carona
            }
        });

        if (!ride) {
            return res.status(404).json({
                statusCode: 404,
                message: "Carona não encontrada!"
            });
        }

        // Verifica se o usuário autenticado é o mesmo que criou a carona
        if (ride.User.Id !== userId) {
            return res.status(403).json({
                statusCode: 403,
                message: "Você não tem permissão para excluir esta carona!"
            });
        }

        // Exclui a carona
        await prisma.ride.delete({
            where: { Id: id }
        });

        return res.status(200).json({
            statusCode: 200,
            message: "Carona excluída com sucesso!"
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};

export const getRidesByDestino = async (req, res) => {
    const { Destino } = req.body;

    if (!Destino || typeof Destino !== 'string') {
        return res.status(400).json({
            statusCode: 400,
            message: "Informe um destino!"
        });
    }

    const normalizedDestino = Destino.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    try {
        const rides = await prisma.ride.findMany({
            where: {
                DestinoNormalized: {
                    contains: normalizedDestino,
                    mode: 'insensitive'
                }
            },
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
                message: "Nenhuma carona encontrada para esse destino!"
            });
        }

        return res.status(200).json({
            statusCode: 200,
            rides
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};






