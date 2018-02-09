const expect = require("chai").expect;
const MenuItem = require("../lib/order.aggregate");

describe("Order aggregate", () => {

  describe("dispatching openOrder command", () => {
    it("successfully creates orderOpened event", () => {
      const previousEvents = [];
      const command = {
        type: "openOrder",
        payload: {
          customerId: "42"
        }
      };

      MenuItem.of(previousEvents).dispatch(command, newEvents => {
        expect(newEvents).length(1);
        expect(newEvents[0].type).eq("orderOpened");
        expect(newEvents[0].timestamp).match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{4}/);
        expect(newEvents[0].aggregateId).match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        expect(newEvents[0].payload.id).match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        expect(newEvents[0].payload.id).eq(newEvents[0].aggregateId);
        expect(newEvents[0].payload.customerId).eq("42");
      });
    }); 
  });
});
