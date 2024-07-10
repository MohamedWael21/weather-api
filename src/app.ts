import express from "express";
import "dotenv/config";
import morgan from "morgan";
import weatherRoutes from "./routes/weathers.route";

const app = express();

// register middlewares
app.use(morgan("tiny"));

// register routes
app.use(weatherRoutes);
export default app;
