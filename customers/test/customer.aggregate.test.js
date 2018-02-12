const expect = require("chai").expect;
const Customer = require("../lib/customer.aggregate");

describe("Customer aggregate", () => {

  describe("dispatching signUpCustomer command", () => {
    it("successfully creates menuItemAdded event when data is valid", () => {
      const previousEvents = [];
      const command = {
        type: "signUpCustomer",
        payload: {
          email: "folklover@gmail.com"
        }
      };

      Customer.of(previousEvents).dispatch(command, newEvents => {
        expect(newEvents).length(1);
        expect(newEvents[0].type).eq("customerSignedUp");
        expect(newEvents[0].timestamp).match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{4}/);
        expect(newEvents[0].id).match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        expect(newEvents[0].aggregateId).match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        expect(newEvents[0].payload.id).match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        expect(newEvents[0].payload.id).eq(newEvents[0].aggregateId);
        expect(newEvents[0].payload.email).eq("folklover@gmail.com");
      });
    }); 

    it("fails when email is invalid", () => {
      const previousEvents = [];
      const command = {
        type: "signUpCustomer",
        payload: {
          email: "folklovergmail.com" //invalid
        }
      };

      Customer.of(previousEvents).dispatch(command, newEvents => {}, errors => {
        expect(errors).deep.eq(["Email must be valid."]);
      });
    }); 
  });
});
