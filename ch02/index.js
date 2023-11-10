import express from "express";
require("dotenv").config();

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
  res.send("just2deep");
});

app.get("/login", (req, res) => {
  res.send("<h1>Please Login at Twitter</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listenting on port ${port}`);
});
