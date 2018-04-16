const serverless = require("serverless-http");
const express = require("express");
const createDatabaseClient = require("./framework/db");

const db = createDatabaseClient();
const CUSTOMERS = process.env.CUSTOMERS_TABLE;

const app = express()
  .get("/customers", (req, res) => {
    db.all(CUSTOMERS, customers => res.json(customers));
  })

  .get("/customers/:id", (req, res) => {
    const success = customer => res.json(customer);
    const failure = error => res.status(404);
    db.find(CUSTOMERS, req.params.id, success, failure);
  });

module.exports.handler = serverless(app);

