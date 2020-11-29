const VendingMachine = require('../lib/VendingMachine.js');

describe("Vending Machine", function() {

  let vendingMachine;

  beforeEach(function() {
    vendingMachine = new VendingMachine();
  });

  it("should exist", function() {
    expect(vendingMachine).toBeTruthy();
  });

  it("should be in the power on state", function() {
    expect(vendingMachine.amountIntroduced).toBe(0);
    expect(vendingMachine.display).toEqual("Insert Coin");
  });

});