const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const MenuItem = require("./menu.item.aggregate");
const createEventBusClient = require("./framework/bus");
const bus = createEventBusClient();

const app = express()
  .use(bodyParser.json({ strict: false }))

  .post("/commands", (req, res) => {
    const failure = validationErrors => {
      res.status(400).json(validationErrors);
    };

    const success = newEvents => {
      newEvents.map(event => {
        bus.publish(event,
          msg => res.status(202).json(event),
          err => res.status(500).send(err)
        );
      });
    };

    const command = req.body;
    MenuItem.of([]).dispatch(command, success, failure);
  });

module.exports.handler = serverless(app);
