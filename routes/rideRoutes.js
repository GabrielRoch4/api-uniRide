import express from "express";
import { createRide, getAllRides } from "../controllers/rideController.js";
import authController from "../controllers/authController.js";

const rideRoutes = express.Router();

rideRoutes.get("/rides", getAllRides);
rideRoutes.post("/rides/create", authController.verifyToken, createRide);

export default rideRoutes;
