'use strict';

module.exports.createCustomer = (event) => {
  console.log(`Creating Customer => [${event.name.first} ${event.name.last}]`);
};
