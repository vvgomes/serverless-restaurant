const { compose, dissoc, pick } = require("ramda");
const createDatabaseClient = require("./framework/db");

const EVENTS = process.env.EVENTS_TABLE;
const ORDERS = process.env.ORDERS_TABLE;
const MENU_ITEMS = process.env.MENU_ITEMS_TABLE;
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

module.exports.persistOrder = (message, context, callback) => {
  const event = parseEvent(message);

  if (event.type !== "orderOpened") return;

  const order = {
    id: event.payload.id,
    customerId: event.payload.customerId,
    placed: false,
    items: []
  };

  const success = entry => callback(null, entry);
  const failure = error => callback(error, {});

  db.save(ORDERS, order, success, failure);
};

module.exports.persistMenuItem = (message, context, callback) => {
  const event = parseEvent(message);

  if (event.type !== "menuItemAdded") return;

  const menuItem = pick(["id", "price"], event.payload);

  const success = entry => callback(null, entry);
  const failure = error => callback(error, {});

  db.save(MENU_ITEMS, menuItem, success, failure);
};

module.exports.persistCustomer = (message, context, callback) => {
  const event = parseEvent(message);

  if (event.type !== "customerSignedUp") return;

  const customer = pick(["id", "email"], event.payload);

  const success = entry => callback(null, entry);
  const failure = error => callback(error, {});

  db.save(CUSTOMERS, customer, success, failure);
};
