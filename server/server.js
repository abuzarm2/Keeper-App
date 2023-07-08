const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;

app.get("/", (req, res) => {
  res.json({ message: "Hello Abuzar" });
});

app.listen(port, (req, res) => {
  console.log("App is listening at port 8000");
});
