require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const filtersRouter = require("./routes/api/filters");
const drinksRouter = require("./routes/api/drinks");

const fs = require("fs/promises");
const moment = require("moment");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
  next();
});

app.use("/api/auth", authRouter);

app.use("/api/users", usersRouter);
app.use("/api/filters", filtersRouter);
app.use("/api/drinks", drinksRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
