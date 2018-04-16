const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const Order = require("./order.aggregate");
const createEventBusClient = require("./framework/bus");
const bus = createEventBusClient();

const app = express()
  .use(bodyParser.json({ strict: false }))

  .post("/commands", (req, res) => {
    const command = req.body;
    Order.of([]).dispatch(command, newEvents => {
      newEvents.map(event => {
        bus.publish(event,
          msg => res.status(202).json(event),
          err => res.status(500).send(err)
        );
      });
    });
  });

module.exports.handler = serverless(app);
