const mongoose = require("mongoose");
const logger = require("../middleware/logger");
const config = require("config");

module.exports = function() {
  const dbEnv = config.get("Movies.dbConfig.DB_ENV")
  mongoose
    .connect(
      config.get("Movies.dbConfig.host"),
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      },
      function(err,  db) {}
    )
    .then(() =>
      logger.infoLog.info(`Connected to MongoDB ${dbEnv}`)
    );
};
