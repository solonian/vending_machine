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

    it("should show the price to pay when a product is selected", function(){
      vendingMachine.productSelected("COLA");
      expect(vendingMachine.display).toEqual("Cola : $1.00");
    });


    // this is a departure from the desription in the Select Product section - as that seem to contradict the preceding section
    // In the absence of a defining Product Owner - retain the higher level of functionality
    it("should recalculate the remaining balance when coins are introduced", function(){
      vendingMachine.productSelected("COLA");
      vendingMachine.acceptCoin(5.67); // weight of quarter = 0.25
      expect(vendingMachine.display).toEqual("Cola : $0.75");
    });

    it("should show the correct balance when coins are introduced before selecting the product", function(){
      vendingMachine.acceptCoin(5.67); // weight of quarter = 0.25
      vendingMachine.productSelected("COLA");
      expect(vendingMachine.display).toEqual("Cola : $0.75");
    });

    it("should dispense the product when the amount matches or exceeds the price", function(){
      vendingMachine.acceptCoin(5.67); // weight of quarter = 0.25
      vendingMachine.acceptCoin(5.67); // weight of quarter = 0.25
      vendingMachine.acceptCoin(5.67); // weight of quarter = 0.25
      vendingMachine.acceptCoin(5.67); // weight of quarter = 0.25
      vendingMachine.productSelected("COLA");
      // expect(vendingMachine.display).toEqual("Thank You");
      expect(vendingMachine.selectedProduct).toBe(null);
      expect(vendingMachine.amountIntroduced).toEqual(0);

    });

  });



});