import cache from "express-redis-cache";
cache = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth_pass: process.env.REDIS_PASS,
  expire: 10,
};

export default cache;
