import app from "./app";
import redis from "redis";

const PORT = process.env.PORT || 5000;

const redisClient = redis.createClient();

redisClient.on("error", (error) => {
  console.log(error);
});

redisClient.on("ready", () => {
  console.log("Connected to Redis");
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});

redisClient.connect();

export { redisClient };
