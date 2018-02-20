const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const createDatabaseClient = require("./lib/db");
const createEventBusClient = require("./lib/bus");
const MenuItem = require("./lib/menu.item.aggregate");

const app = express();
const db = createDatabaseClient();
const bus = createEventBusClient();

const MENU_ITEMS = process.env.MENU_ITEMS_TABLE;

app.use(bodyParser.json({ strict: false }));

app.post("/menu/items/commands/add", (req, res) => {
  if (req.body.description === "simulate error") {
    throw "Simulated error";
  }

  const command = {
    type: "addMenuItem",
    payload: {
      description: req.body.description,
      price: req.body.price
    }
  };

  const failure = validationErrors => {
    res.status(400).json(validationErrors);
  };

  const success = newEvents => {
    newEvents.map(event => {
      bus.publish(event,
        msg => res.status(202).send(`/menu/items/${event.payload.id}`),
        err => res.status(500).send(err)
      );
    });
  };

  MenuItem.of([]).dispatch(command, success, failure);
});

app.get("/menu/items", (req, res) => {
  db.all(MENU_ITEMS, menuItems => res.json(menuItems));
});

app.get("/menu/items/:id", (req, res) => {
  const success = menuItem => res.json(menuItem);
  const failure = error => res.status(404);
  db.find(MENU_ITEMS, req.params.id, success, failure);
});

module.exports.handler = serverless(app);
