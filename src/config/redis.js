import cache from "express-redis-cache";
cache = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  expire: 180,
};

export default cache;
