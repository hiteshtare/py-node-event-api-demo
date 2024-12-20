"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const { readFile, readFileSync } = require("fs").promises;
const morgan = require("morgan");

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>PY - Hello from Express.js!</h1>");
  res.end();
});

router.get("/events", async (req, res) => {
  let centerid = req.query.centerid;
  let languageid = req.query.languageid;

  let data;
  if (!centerid && !languageid) {
    data = await readFile("./assets/all-events.json");
  } else if (centerid == "36" && !languageid) {
    data = await readFile("./assets/en-ranchi-events.json");
  } else if (centerid == "36" && languageid == "hi") {
    data = await readFile("./assets/hi-ranchi-events.json");
  } else if (centerid == "41" && !languageid) {
    data = await readFile("./assets/en-chennai-events.json");
  } else if (centerid == "41" && languageid == "ta") {
    data = await readFile("./assets/ta-chennai-events.json");
  } else {
    data = await readFile("test_failure.json");
  }

  res.type("application/json");
  res.send(data);
});

//Middlewares
app.use(morgan('dev')); // Logging

app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
