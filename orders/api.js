const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const createDatabaseClient = require("./lib/db");
const createEventBusClient = require("./lib/bus");
const Order = require("./lib/order.aggregate");

const EVENTS = process.env.EVENTS_TABLE;
const MENU_ITEMS = process.env.MENU_ITEMS_TABLE;
const CUSTOMERS = process.env.CUSTOMERS_TABLE;

const app = express();
const db = createDatabaseClient();
const bus = createEventBusClient();

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

app.get("/menu/items", (req, res) => {
  db.all(MENU_ITEMS, menuItems => res.json(menuItems));
});

app.get("/customers", (req, res) => {
  db.all(CUSTOMERS, customers => res.json(customers));
});

app.get("/events", (req, res) => {
  db.all(EVENTS, events => res.json(events));
});

module.exports.handler = serverless(app);
