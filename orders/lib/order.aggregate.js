const { defineAggregate } = require("bravent");
const validate = require("predicado").validate;
const now = require("./framework/utc.clock");
const uuid = require("uuid");

const commandHandlers = {
  openOrder: (state, command) => {
    const eventId = uuid.v4();
    const orderId = uuid.v4();

    return [{
      type: "orderOpened",
      id: eventId,
      aggregateId: orderId,
      timestamp: now(),
      payload: {
        id: orderId,
        customerId: command.payload.customerId
      } 
    }];
  }
};

const eventHandlers = {
  orderOpened: (state, event) => {
    return event.payload;
  }
};

const Order = defineAggregate({ commandHandlers, eventHandlers });
module.exports = Order;
