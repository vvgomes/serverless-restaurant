const defineAggregate = require("bravent").defineAggregate;
const validate = require("predicado").validate;
const { compose, contains, prop, map } = require("ramda");
const now = require("./utc.clock");
const uuid = require("uuid");

const commandHandlers = {
  signUpCustomer: (state, command) => {
    const validatePayload = validate([
      {
        error: "Email must be valid.",
        predicate: compose(contains("@"), prop("email"))
      }
    ]);

    const eventId = uuid.v4();
    const customerId = uuid.v4();

    const buildEvents = payload => [{
      type: "customerSignedUp",
      id: eventId,
      aggregateId: customerId,
      timestamp: now(),
      payload: {
        id: customerId,
        email: payload.email
      } 
    }];

    return compose(map(buildEvents), validatePayload)(command.payload);
  }
};

const eventHandlers = {
  customerSignedUp: (state, event) => {
    return state;
  }
};

const Customer = defineAggregate({ commandHandlers, eventHandlers });
module.exports = Customer;
