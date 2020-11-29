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

    it("should accept a valid coin", function() {
      vendingMachine.acceptCoin(21.21);
      expect(vendingMachine.amountIntroduced).toEqual(0.05);
      expect(vendingMachine.display).toEqual("$0.05");
    });

    it("should accept multiple coins", function() {
      vendingMachine.acceptCoin(21.21); // diameter of nickel = 0.05
      vendingMachine.acceptCoin(5.67); // weight of quarter = 0.25
      expect(vendingMachine.amountIntroduced).toEqual(0.30);
    });

    it("should reject invalid coins", function() {
      vendingMachine.acceptCoin(2.5); //weight of penny
      expect(vendingMachine.amountIntroduced).toEqual(0);
    });

    it("should reject unknown coins", function() {
      vendingMachine.acceptCoin(99.99); //weight of penny
      expect(vendingMachine.amountIntroduced).toEqual(0);
    });

  });

  describe("selecting products", function() {

    it("should allow a product to be selected", function(){
      vendingMachine.productSelected("COLA");
      expect(vendingMachine.selectedProduct.name).toEqual("Cola");
      expect(vendingMachine.selectedProduct.price).toEqual(1.0);
    });



});