// Default to localhost:3456 for a local Mongo started by docker-compose
// NOTE: don't include the "MONGO_URL=" prefix here — the value must be a Mongo connection string
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/the_database";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

module.exports = {
  MONGO_URL, //: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL, //: '//localhost:6378'
};
