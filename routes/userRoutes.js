import express from "express";
import { createUser, getAllUsers, updateUser, deleteUser, getByUserId, rotaAutenticada } from "../controllers/userController.js";
import authController from "../controllers/authController.js";

const userRoutes = express.Router();

userRoutes.post("/login", authController.login)

userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getByUserId);
userRoutes.post("/users/create", createUser);
userRoutes.put("/users/update/:id", updateUser);
userRoutes.delete("/users/delete/:id", deleteUser);

// userRoutes.post("/rota-autenticada", authController.verifyToken, rotaAutenticada);

export default userRoutes;
