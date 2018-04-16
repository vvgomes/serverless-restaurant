const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const createEventBusClient = require("./framework/bus");
const MenuItem = require("./menu.item.aggregate");

const app = express();
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

module.exports.handler = serverless(app);
