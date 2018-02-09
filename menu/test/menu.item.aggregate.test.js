const expect = require("chai").expect;
const MenuItem = require("../lib/menu.item.aggregate");

describe("MenuItem aggregate", () => {

  describe("dispatching addMenuItem command", () => {
    it("successfully creates menuItemAdded event when data is valid", () => {
      const previousEvents = [];
      const command = {
        type: "addMenuItem",
        payload: {
          price: 10.0,
          description: "Peperoni"
        }
      };

      MenuItem.of(previousEvents).dispatch(command, newEvents => {
        expect(newEvents).length(1);
        expect(newEvents[0].type).eq("menuItemAdded");
        expect(newEvents[0].timestamp).match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{4}/);
        expect(newEvents[0].aggregateId).match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        expect(newEvents[0].payload.id).match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        expect(newEvents[0].payload.id).eq(newEvents[0].aggregateId);
        expect(newEvents[0].payload.price).eq(10.0);
        expect(newEvents[0].payload.description).eq("Peperoni");
      });
    }); 

    it("fails when item description is not present", () => {
      const previousEvents = [];
      const command = {
        type: "addMenuItem",
        payload: {
          price: 10,
          description: "" //invalid
        }
      };

      MenuItem.of(previousEvents).dispatch(command, newEvents => {}, errors => {
        expect(errors).deep.eq(["Description must be present."]);
      });
    }); 
  });
});
