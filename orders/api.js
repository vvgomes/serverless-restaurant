const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const createDatabaseClient = require("./lib/db");
const createEventBusClient = require("./lib/bus");
const Order = require("./lib/order.aggregate");

const app = express();
const db = createDatabaseClient();
const bus = createEventBusClient();

const ORDERS = process.env.ORDERS_TABLE;

app.use(bodyParser.json({ strict: false }));

app.post("/orders/commands/open", (req, res) => {
  const command = {
    type: "openOrder",
    payload: {
      customerId: req.body.customerId
    }
  };

  Order.of([]).dispatch(command, newEvents => {
    newEvents.map(event => {
      bus.publish(event,
        msg => res.status(202).send(`/orders/${event.payload.id}`),
        err => res.status(500).send(err)
      );
    });
  });
});

app.get("/orders", (req, res) => {
  db.all(ORDERS, orders => res.json(orders));
});

app.get("/orders/:id", (req, res) => {
  const success = order => res.json(order);
  const failure = error => res.status(404);
  db.find(ORDERS, req.params.id, success, failure);
});

module.exports.handler = serverless(app);
