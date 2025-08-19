const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/sail";
mongoose
  .connect(URI)
  .then(() => {
    console.log("connect to db successfully");
  })
  .catch((err) => {
    console.log("can't load this page" + err);
  });

module.exports = mongoose;
