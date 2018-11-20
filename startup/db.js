const mongoose = require("mongoose");
const logger = require("../middleware/logger");
const config = require("config");

module.exports = function() {
  mongoose
    .connect(
      config.get("Movies.dbConfig.host"),
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        uri_decode_auth: true 
      },
      function(err, db) { }
    )
    .then(() =>
      logger.infoLog.log({ level: "info", message: "Connected to MongoDB.." })
    );
};
