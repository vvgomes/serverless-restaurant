const { compose, dissoc, pick } = require("ramda");
const createDatabaseClient = require("./lib/db");

const EVENTS = process.env.EVENTS_TABLE;
const CUSTOMERS = process.env.CUSTOMERS_TABLE;

const db = createDatabaseClient();

const parseEvent = message => {
  const messagePayload = message.Records[0].Sns.Message;
  return compose(dissoc("default"), JSON.parse)(messagePayload);
};

module.exports.persistEvent = (message, context, callback) => {
  const event = parseEvent(message);

  const success = entry => callback(null, entry);
  const failure = error => callback(error, {});

  db.save(EVENTS, event, success, failure);
};

module.exports.persistCustomer = (message, context, callback) => {
  const event = parseEvent(message);

  if (event.type !== "customerSignedUp") return;

  const customer = pick(["id", "email"], event.payload);

  const success = entry => callback(null, entry);
  const failure = error => callback(error, {});

  db.save(CUSTOMERS, customer, success, failure);
};
