const mongoose = require("mongoose");
const logger = require("../middleware/logger");
const config = require("config");

module.exports = function() {
  mongoose
    .connect(
      config.get("Movies.dbConfig.host"),
      {
        // authSource: 'Movies.dbConfig.authSource',
        auth: {
          user: "Movies.dbConfig.user",
          pass: "Movies.dbConfig.password"
        },
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      },
      function(err,  db) {}
    )
    .then(() =>
      logger.infoLog.log({ level: "info", message: "Connected to MongoDB.." })
    );
};
