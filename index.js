const express = require("express");
const dotenv = require("dotenv");
require("./src/config/db");
const app = express();
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 7800;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
