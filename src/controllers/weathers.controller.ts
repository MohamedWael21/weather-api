import { Request, Response } from "express";
import * as weatherService from "../services/weathers.service";

export const getWeather = async (req: Request, res: Response) => {
  const { city } = req.params;

  const date = req.query.date || new Date().toISOString().split("T")[0];

  const weatherData = await weatherService.getWeather(city, date as string);

  res.status(200).json({
    status: "success",
    data: {
      weather: weatherData,
    },
  });
};
