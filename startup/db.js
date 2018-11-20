const mongoose = require("mongoose");
const logger = require("../middleware/logger");

module.exports = function() {
  mongoose
    .connect(
      "mongodb+srv://cluster0-6aldy.mongodb.net/vidly?retryWrites=true",
      {
        authSource: "admn",
        auth: {
          user: "superuser",
          password: "greatpassword"
        },
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    )
    .then(() =>
      logger.infoLog.log({ level: "info", message: "Connected to MongoDB.." })
    );
};
