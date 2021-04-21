import cache from "express-redis-cache";
cache = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

export default cache;
