const defineAggregate = require("bravent").defineAggregate;
const validate = require("predicado").validate;
const { compose, not, isEmpty, prop, map } = require("ramda");
const now = require("./utc.clock");
const uuid = require("uuid");

const commandHandlers = {
  addMenuItem: (state, command) => {
    const validatePayload = validate([
      {
        error: "Description must be present.",
        predicate: compose(not, isEmpty, prop("description"))
      }
    ]);

    const eventId = uuid.v4();
    const menuItemId = uuid.v4();

    const buildEvents = payload => [{
      type: "menuItemAdded",
      id: eventId,
      aggregateId: menuItemId,
      timestamp: now(),
      payload: {
        id: menuItemId,
        price: payload.price,
        description: payload.description
      } 
    }];

    return compose(map(buildEvents), validatePayload)(command.payload);
  }
};

const eventHandlers = {
  menuItemAdded: (state, event) => {
    return {
      price: event.payload.price,
      description: event.payload.description
    };
  }
};

const MenuItem = defineAggregate({ commandHandlers, eventHandlers });
module.exports = MenuItem;
