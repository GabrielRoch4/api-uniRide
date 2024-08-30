// routes/index.js
import express from "express";
import userRoutes from "./userRoutes.js";
import rideRoutes from "./rideRoutes.js";

const router = express.Router();

router.use(userRoutes);
router.use(rideRoutes);

export default router;
