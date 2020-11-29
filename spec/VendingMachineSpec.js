const VendingMachine = require('../lib/VendingMachine.js');

describe("Vending Machine", function() {

  let vendingMachine;

  beforeEach(function() {
    vendingMachine = new VendingMachine();
  });

  it("should exist", function() {
    expect(vendingMachine).toBeTruthy();
  });

});