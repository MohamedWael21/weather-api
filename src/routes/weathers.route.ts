import express from "express";
import { getWeather } from "../controllers/weathers.controller";

const router = express.Router();

router.get("/weathers/:city", getWeather);

export default router;
