const VendingMachine = require('../lib/VendingMachine.js');

describe("Vending Machine", function() {

  let vendingMachine;

  beforeEach(function() {
    vendingMachine = new VendingMachine();
  });

  describe("On power up", function() {

    it("should exist", function() {
      expect(vendingMachine).toBeTruthy();
    });

    it("should be in the power on state", function() {
      expect(vendingMachine.amountIntroduced).toBe(0);
      expect(vendingMachine.display).toEqual("Insert Coin");
    });

  });

  describe("Accepting coins", function() {

    it("should verify a coin with a valid weight", function() {
      const value = vendingMachine.verifyCoin(5.0);
      expect(value).toEqual(0.05);
    });

    it("should verify a coin with a valid diameter", function() {
      const value = vendingMachine.verifyCoin(21.21);
      expect(value).toEqual(0.05);
    });

  });

});