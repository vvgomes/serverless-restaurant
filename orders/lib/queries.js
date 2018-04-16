const serverless = require("serverless-http");
const express = require("express");
const createDatabaseClient = require("./framework/db");

const db = createDatabaseClient();
const ORDERS = process.env.ORDERS_TABLE;

const app = express()
  .get("/orders", (req, res) => {
    db.all(ORDERS, orders => res.json(orders));
  }) 

  .get("/orders/:id", (req, res) => {
    const success = order => res.json(order);
    const failure = error => res.status(404);
    db.find(ORDERS, req.params.id, success, failure);
  });

module.exports.handler = serverless(app);
