import axios from "axios";
import { redisClient } from "..";

const WEATHER_API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const EXPIRY_OF_CACHE = 86400; // 1 day

const axiosClient = axios.create({
  baseURL: WEATHER_API_URL,
});

// add api key for each request
axiosClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["key"] = process.env.API_KEY;
  return config;
});

export async function getWeather(city: string, date: string) {
  try {
    const key = `${city}:${date}`;
    const weatherData = await redisClient.get(key);
    if (weatherData) {
      return JSON.parse(weatherData);
    }
    const { data } = await axiosClient.get(`/${city}/${date}`, {
      params: {
        include: "days",
      },
    });
    await redisClient.setEx(key, EXPIRY_OF_CACHE, JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
}
