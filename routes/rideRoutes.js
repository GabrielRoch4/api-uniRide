import express from "express";
import { createRide, deleteRide, getAllRides, getRideById, getRidesByDestino, updateRide } from "../controllers/rideController.js";
import authController from "../controllers/authController.js";

const rideRoutes = express.Router();

rideRoutes.get("/rides", getAllRides);
rideRoutes.get("/rides/:id", getRideById);
rideRoutes.post("/rides/destination", getRidesByDestino);
rideRoutes.post("/rides/create", authController.verifyToken, createRide);
rideRoutes.put("/rides/update/:id", authController.verifyToken, updateRide);
rideRoutes.delete("/rides/delete/:id", authController.verifyToken, deleteRide);

export default rideRoutes;
