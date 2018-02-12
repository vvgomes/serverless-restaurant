const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const createDatabaseClient = require("./lib/db");
const createEventBusClient = require("./lib/bus");
const Customer = require("./lib/customer.aggregate");

const app = express();
const db = createDatabaseClient();
const bus = createEventBusClient();

const CUSTOMERS = process.env.CUSTOMERS_TABLE;

app.use(bodyParser.json({ strict: false }));

app.post("/customers/commands/signup", (req, res) => {
  const command = {
    type: "signUpCustomer",
    payload: {
      email: req.body.email
    }
  };

  const failure = validationErrors => {
    res.status(400).json(validationErrors);
  };

  const success = newEvents => {
    newEvents.map(event => {
      bus.publish(event,
        msg => res.status(202).send(`/customers/${event.payload.id}`),
        err => res.status(500).send(err)
      );
    });
  };

  Customer.of([]).dispatch(command, success, failure);
});

app.get("/customers", (req, res) => {
  db.all(CUSTOMERS, customers => res.json(customers));
});

app.get("/customers/:id", (req, res) => {
  const success = customer => res.json(customer);
  const failure = error => res.status(404);
  db.find(CUSTOMERS, req.params.id, success, failure);
});

module.exports.handler = serverless(app);
