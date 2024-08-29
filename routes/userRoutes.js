import express from "express";
import { createUser, getAllUsers, updateUser, deleteUser, getByUserId } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getByUserId);
userRoutes.post("/users/create", createUser);
userRoutes.put("/users/update/:id", updateUser);
userRoutes.delete("/users/delete/:id", deleteUser);

export default userRoutes;
