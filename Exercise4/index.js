const express = require("express");
const datamember = require("./members.js");
const datauser = require("./users.js");
const moment = require("moment");
const morgan = require("morgan");

const app = express();

//middleware jaringan log
const log = (req, res, next) => {
  console.log(
    `${moment().format("LLLL")} - ${Date.now} - ${req.ip} - ${req.originalUrl}`
  );
  next();
};

app.use(log);
app.use(morgan("combined"));

//middleware notfound
const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "not found",
  });
};

//middleware error handling
app.use((err, req, res, next) => {
  res.json({
    status: "error",
    message: `something wrong: ${err}`,
  });
});

//app.use(notFound);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("Halo ontoy");
});

app.get("/about", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send({
    status: "success",
    message: "response success",
    description: "Exercise #03",
    date: moment().format(),
    data: datamember,
  });
});

app.get("/users", (req, res) => {
  res.setHeader("Content-Type", "text/json");
  res.send(datauser);
});

//params
app.get("/post/:id", (req, res) => {
  let id = req.params.id;
  res.json({ id, message: "success" });
});

//query
app.get("/users", (req, res) => {
  let query = req.query;
  res.json(query);
});

app.use(notFound);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
