const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017/inotebook";
const conn = async () => {
  mongoose.connect(mongoURI, function (e) {
    if (e) {
      console.log(e);
    } else {
      console.log("Connection successfull");
    }
  });
};

module.exports = conn;
