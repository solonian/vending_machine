const Coins = {
  PENNY : {
    name: 'cent',
    weight : 2.5,
    diameter : 19.05,
    value : 0.01
  },
  NICKEL : {
    name: 'nickel',
    weight : 5.0,
    diameter : 21.21,
    value : 0.05
  },
  DIME : {
    name : 'dime',
    weight: 2.268,
    diameter: 17.91,
    value : 0.10
  },
  QUARTER : {
    name : 'quarter',
    weight: 5.67,
    diameter: 24.26,
    value : 0.25
  }
};

const validCoins = [Coins.NICKEL, Coins.DIME, Coins.QUARTER];

const DisplayStrings = {
  INSERTCOIN: 'Insert Coin',
  SOLDOUT: 'Sold Out',
  EXACTCHANGE: 'Exact Change Only',
  PRICE: 'Price'
};

const Products = {
  COLA: {name: "Cola", price: 1.0 },
  CHIPS: {name: "Chips", proce: 0.50 },
  CANDY: {name: "Candy", price: 0.65}
};

function VendingMachine() {
  this.display = "Insert Coin";
  this.selectedProduct = null;
  this.amountIntroduced = 0;

  this.verifyCoin = function(property) {
    // try by weight first
    let coinValue  = validCoins.filter( coin => { return coin.weight == property ? coin.value : null });
    if( coinValue.length == 0 ) {
      // try by diameter - although a true electromechanical device would not need to try both properties
      coinValue  = validCoins.filter( coin => { return coin.diameter == property ? coin.value : null });
    }

    return coinValue.length >= 1 ? coinValue.pop().value : 0.0; // this assumes an array with a length of 1 - true for our setup but not in real life
  }

  this.acceptCoin = function(property) {
    const amount = this.verifyCoin(property);
    this.amountIntroduced += amount;
    this.setDisplayString(this.amountIntroduced);
  }

  this.setDisplayString = function( amount ) {
    if( this.selectedProduct ) {
      this.display = `${this.selectedProduct.name} : $${ (this.selectedProduct.price - this.amountIntroduced). toFixed(2) }`;
      // this.display = `PRICE : $${ this.selectedProduct.price. toFixed(2) }`;

    } else {

      if(amount > 0) {
        this.display = "$" + this.amountIntroduced.toFixed(2);
      } else {
        this.display = DisplayStrings.INSERTCOIN;
      }
    }
  }

  this.productSelected = function(product) {
    this.selectedProduct = Products[product];
    if( this.selectedProduct && this.amountIntroduced >= this.selectedProduct.price ) {
      this.dispense();
    } else {
      this.setDisplayString(this.amountIntroduced - this.selectedProduct.price);
    }
  }

  this.dispense = function() {
    this.display = DisplayStrings.THANKYOU;
    this.amountIntroduced = 0;
    this.selectedProduct = null;
  }


}

module.exports = VendingMachine; // export default VendingMachine;