import express from "express";
import { createUser, getAllUsers, updateUser, deleteUser, getByUserId, rotaAutenticada } from "../controllers/userController.js";
import authController from "../controllers/authController.js";

const userRoutes = express.Router();

userRoutes.post("/login", authController.login);

userRoutes.get("/users", authController.verifyToken, authController.verifyAdmin, getAllUsers);
userRoutes.get("/users/:id", authController.verifyToken, getByUserId);
userRoutes.post("/users/create", createUser);
userRoutes.put("/users/update/:id", authController.verifyToken, authController.verifyAdmin, updateUser);
userRoutes.delete("/users/delete/:id", authController.verifyToken, authController.verifyAdmin, deleteUser);

// userRoutes.post("/rota-autenticada", authController.verifyToken, rotaAutenticada);

export default userRoutes;
