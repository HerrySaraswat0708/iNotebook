const express = require("express");
const conn = require("./connection");
const User = require("./models/Users");
var cors = require('cors')
conn();

const app = express();
const port = 3000;
app.use(cors())
app.get("/", (req, res) => {
  res.send("Hello")
});
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))
app.listen(port, () => {
  console.log(`Listening at http:localhost:${port}`);
});
