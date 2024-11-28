const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server: HttpServer } = require("http");
const { connect, createTables } = require("./database/database");

// The Express app is exported so that it can be used by serverless Functions.
function app() {
  const server = express();
  server.use(cors());
  server.use(express.json({ limit: "50mb" }));
  server.use(express.urlencoded({ limit: "50mb", extended: true }));
  server.use(bodyParser.json());

  server.use(express.urlencoded({ extended: true }));

  // Enable parsing of application/json and application/x-www-form-urlencoded
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Database connection
  connect().then(() => {
    // Create tables after successful connection
    createTables();
  });

  return { app: server };
}

function run() {
  const port = process.env["PORT"] || 4000;

  // Start up the Express server
  const { app: expressApp } = app();

  // Create a HTTP server instance with the Express app
  const server = new HttpServer(expressApp);
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();