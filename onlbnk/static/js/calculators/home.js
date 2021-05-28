

// jQuery(function($) {
//   function whichCalculator
// });


/* jshint ignore:start */
Vue.component('calculator-home', {
template:
    '<section class="row">\n' +
    '              <div class="col-md-6"><div class="loan-amount-home form-group">\n' +
    '                <label for="income">Annual Household Income</label>\n' +
    '                <div class="input-group">\n' +
    '                  <span class="input-group-addon">$</span>\n' +
    '                  <input type="number" min="0" onfocus="this.select()" name="income" id="income" class="form-control" v-model="income" value="0" step="any" placeholder="Household Income" />\n' +
    '                </div>\n' +
    '              </div>\n' +
    '              <div class="interest-rate form-group">\n' +
    '                <label for="debt">Monthly debt</label>\n' +
    '                <div class="input-group">\n' +
    '                  <span class="input-group-addon">$</span>\n' +
    '                  <input type="number" min="0" onfocus="this.select()" name="debt" id="debt" class="debt form-control" v-model="debt" value="0" step="any" placeholder="Monthly Debt" />\n' +
    '                </div>\n' +
    '              </div>\n' +
    '              <div class="interest-rate form-group">\n' +
    '                <label for="ccdebt">Credit Card debt (All)</label>\n' +
    '                <div class="input-group">\n' +
    '                  <span class="input-group-addon">$</span>\n' +
    '                  <input type="number" min="0" onfocus="this.select()" name="ccdebt" id="ccdebt" class="ccdebt form-control" v-model="ccdebt" value="0" step="any" placeholder="Total Credit Card Debt" />\n' +
    '                </div>\n' +
    '              </div>\n' +
    '              <div class="interest-rate form-group">\n' +
    '                <label for="dpayment">Down Payment</label>\n' +
    '                <div class="input-group">\n' +
    '                  <span class="input-group-addon">$</span>\n' +
    '                  <input type="number" min="0" onfocus="this.select()" name="ccdebt" id="dpayment" class="dpayment form-control" v-model="dpayment" value="0" step="any" placeholder="Downpayment Amount" />\n' +
    '                </div>\n' +
    '              </div>\n' +
    '\n' +
    '              <div class="interest-rate form-group">\n' +
    '                <label for="rate">Interest Rate</label>\n' +
    '                <div class="input-group">\n' +
    '                  <input type="number" min="0" onfocus="this.select()" name="rate" id="rate" class="rate form-control" v-model="rate" value="0" step="any" placeholder="Rate" />\n' +
    '                  <span class="input-group-addon">%</span>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '              <div class="term form-group">\n' +
    '                <label for="term-selection">Loan Term</label>\n' +
    '                <div class="input-group">\n' +
    '                  <input type="number" min="0" onfocus="this.select()" v-model="time" id="term-selection" class="term-selection form-control" placeholder="Loan Term"/>\n' +
    '                  <span class="input-group-addon">years</span>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="result home col-md-6">\n' +
    '              <h3>Estimated Results</h3>\n' +
    '              <p>You have an income of <span>${{ income }}</span> and a desired rate of <span>{{ rate }}%</span> for <span>{{ months }}</span> months, so: </p>\n' +
    '              <h4>You can afford a home of: <span>{{ calcHome || 0 }}</span></h4>\n' +
    '              <h4>With a monthly payment of: <span>{{ calcPayment }}</span></h4>\n' +
    '            </div>\n' +
    '          </div></section>',
  data: function(){
   return {
     //global variables
     result: 0,
     time: 0, //years
     interest: 0,
     rate: 0, //divide by 1200 to get to percentage/months

     //home affordability
     income: 0,
     debt: 0,
     ccdebt: 0,
     dpayment: 0,
     payment: 0,
     moPayment: 0, //setting DOM value - monthly payment
     affordedMoPayment: 0,
     months: 0, // DOM value
   }
  },
  methods: {
    //this clears the current calculator's variables manually
    clear: function() {
      // clear everything
      this.amt = 0;
      this.rate = 0;
      this.time = 0;
      this.income = 0;
      this.debt = 0;
      this.ccdebt = 0;
      this.dpayment = 0;
      this.deposit = 0;
      this.moDeposit = 0;
      this.moPayment = 0;

    }
  },
  computed: {
    calcHome: function(){
      // HOME AFFORDABILITY

      let income = this.income / 12; //this is monthly income
      let debt = this.debt; //this is monthly debt/monthly spending
      let ccdebt = this.ccdebt; //this is total credit card debt
      let moDebt = +debt + (4 / 100 * ccdebt); //this is total debts
      let moPayment = this.moPayment; //monthly payment for mortgage
      let dpayment = this.dpayment; //this the the amount you can afford on a downpayment
      let rateOriginal = this.rate; //this is the interest rate you're looking at for your mortgage
      let rate = (2 + +rateOriginal ) / 1200; //this is the interest rate you're looking at for your mortgage - original
      let years = this.time; //get the amount of months they would be paying mortgage

//start c1/c1 comparison
      //these are variables given by banks - r1 represents 28% of your monthly income, r2 is 36% of your monthly income minus your monthly debt
      let r1 = 28;
      let r2 = 36;
      //this calculates whether or not 28% or 36%-mo/debt gives you more mortgage to work with
      let c1 = (income * r1 / 100);
      let c2 = (income * r2 / 100) - moDebt;
      if (c1 < c2) {
        moPayment = c1;
      } else {
        moPayment = c2;
      }

//end c1/c1 comparison

      //grouped these together to get amv for house
      let newRate = 1 + +rate;
      let months = -1 * (years * 12);
      let sumRateMonth = Math.pow(newRate,months);
      let amv = (1 - +sumRateMonth) / rate;
      let payment = amv * moPayment;
      //need amv value to get house value
      let house = +payment + +dpayment; //this should provide the answer we need...

      if (house < 1) {
        let houseValue = 0;
        moPayment = 0;
      }

      //to return to the dom
      this.months = years * 12;
      let result = house - 475; // end house value
      if (result === -475) {
        result = 0;
        return currencyFormat(result);
      }
      else if (result < 0) {
        return "Invalid Number";
      }
      else {
        return currencyFormat(result);
      }
    },

    calcPayment: function() {
      //this is monthly income
      let income = this.income / 12;

      //these are variables given by banks - r1 represents 28% of your monthly income, r2 is 36% of your monthly income minus your monthly debt
      let r1 = 28;
      let r2 = 36;

      //this is monthly debt/monthly spending
      let debt = this.debt;
      //this is total credit card debt
      let ccdebt = this.ccdebt;

      //this is total debts
      let moDebt = +debt + (4 / 100 * ccdebt);

      //this calculates whether or not 28% or 36%-mo/debt gives you more mortgage to work with
      let c1 = (income * r1 / 100);
      let c2 = (income * r2 / 100) - moDebt;

      let moPayment = this.moPayment; //monthly payment for mortgage

      if (c1 < c2) {
        moPayment = c1;
      } else {
        moPayment = c2;
      }

      //this the the amount you can afford on a downpayment
      let dpayment = this.dpayment;

      //this is the interest rate you're looking at for your mortgage
      let rate = (2 + this.rate ) / 1200;

      //get the amount of months they would be paying mortgage
      let years = this.time;

      //grouped these together to get amv for house
      let newRate = 1 + +rate;

      let months = -1 * (years * 12);

      let sumRateMonth = Math.pow(newRate,months);

      let amv = (1 - +sumRateMonth) / rate;

      let payment = amv * moPayment;

      //need amv value to get house value
      let house = payment + +dpayment; //this should provide the answer we need...

      //Check to see which income is better for the buyer
      let recalc = 0; //variable used to determine which income amount is better
      if (c1 < c2) {
        moPayment = c1;

        let calcDownPayment = +dpayment / +house * 100;

        if (calcDownPayment >= 20) {
          let newPayment = income * 30 / 100;
          let newCalcDownPayment = 100 * dpayment / (dpayment + (amv * newPayment));

          if (newCalcDownPayment >= 20) {
            house = (amv * newPayment) + dpayment;
            moPayment = newPayment;
          }
        }
      } else {
        moPayment = c2;
      }

      if (house < 1) {
        let houseValue = 0;
        moPayment = 0;
      }

      if (moPayment < 0) {
        return "Invalid Number";
      } else {
        return currencyFormat(moPayment);
      }
    }
  }
});

new Vue({
  el: '#calculator-home'
});

//https://blog.tompawlak.org/number-currency-formatting-javascript
function currencyFormat (num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
/* jshint ignore:end */