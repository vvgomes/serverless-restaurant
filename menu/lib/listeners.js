const { compose, dissoc, pick } = require("ramda");
const createDatabaseClient = require("./framework/db");

const db = createDatabaseClient();
const EVENTS = process.env.EVENTS_TABLE;
const MENU_ITEMS = process.env.MENU_ITEMS_TABLE;

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

module.exports.persistMenuItem = (message, context, callback) => {
  const event = parseEvent(message);

  if (event.type !== "menuItemAdded") return;

  const menuItem = pick(["id", "price", "description"], event.payload);

  const success = entry => callback(null, entry);
  const failure = error => callback(error, {});

  db.save(MENU_ITEMS, menuItem, success, failure);
};
