/* jshint ignore:start */


Vue.component('calculator-savings', {
template:
  '<section class="row">\n' +
  '<div class="col-md-6"><div class="form-group">\n' +
  '                <label for="deposit">Initial Deposit</label>\n' +
  '                <div class="input-group">\n' +
  '                  <span class="input-group-addon">$</span>\n' +
  '                  <input type="number" min="0" onfocus="this.select()" name="deposit" id="deposit" class="form-control" v-model="deposit" value="0" step="any" placeholder="Initial Deposit" />\n' +
  '                </div>\n' +
  '              </div>\n' +
  '\n' +
  '              <div class="form-group">\n' +
  '                <label for="moDeposit">Monthly Deposit Thereafter</label>\n' +
  '                <div class="input-group">\n' +
  '                  <span class="input-group-addon">$</span>\n' +
  '                  <input type="number" min="0" onfocus="this.select()" name="moDeposit" id="moDeposit" class="form-control" v-model="moDeposit" value="0" step="any" placeholder="Monthly Deposit" />\n' +
  '                </div>\n' +
  '              </div>\n' +
  '\n' +
  '              <div class="form-group">\n' +
  '                <label for="rate">Interest Rate</label>\n' +
  '                <div class="input-group">\n' +
  '                  <input type="number" min="0" onfocus="this.select()" name="rate" id="rate" class="rate form-control" v-model="rate" value="0" step="any" placeholder="Rate" />\n' +
  '                  <span class="input-group-addon">%</span>\n' +
  '                </div>\n' +
  '              </div>\n' +
  '              <div class="term form-group">\n' +
  '                <label for="term-selection">Savings Term</label>\n' +
  '                <select v-model="time" id="term-selection" class="term-selection form-control">\n' +
  '                  <option value=\'0\' selected>0 months (0 years)</option>\n' +
  '                  <option value=\'3\'>3 months</option>\n' +
  '                  <option value=\'6\'>6 months</option>\n' +
  '                  <option value=\'12\'>12 months (1 year)</option>\n' +
  '                  <option value=\'24\'>24 months (2 years)</option>\n' +
  '                  <option value=\'30\'>30 months (2.5 years)</option>\n' +
  '                  <option value=\'36\'>36 months (3 years)</option>\n' +
  '                  <option value=\'42\'>42 months (3.5 years)</option>\n' +
  '                  <option value=\'48\'>48 months (4 years)</option>\n' +
  '                  <option value=\'54\'>54 months (4.5 years)</option>\n' +
  '                  <option value=\'60\'>60 months (5 years)</option>\n' +
  '                  <option value=\'120\'>120 months (10 years)</option>\n' +
  '                  <option value=\'180\'>180 months (15 years)</option>\n' +
  '                  <option value=\'240\'>240 months (20 years)</option>\n' +
  '                  <option value=\'300\'>300 months (25 years)</option>\n' +
  '                  <option value=\'360\'>360 months (30 years)</option>\n' +
  '                </select>\n' +
  '              </div>\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="result loan col-md-6">\n' +
  '              <h3>Estimated Results</h3>\n' +
  '              <p>If you start out with <span>${{ deposit }}.00</span> and then deposit <span>${{ moDeposit }}</span> every month, with <span>{{ rate }}%</span> interest, for <span>{{ time }}</span> months, you will end up with:</p>\n' +
  '\n' +
  '              <h4>Total Deposited: <span>{{ savingsOriginal }}</span></h4>\n' +
  '              <h4>Interest Earned: <span>{{ savingsInterest }}</span></h4>\n' +
  '              <h4>Ending Balance: <span>{{ savingsGrowth || 0 }}</span></h4>\n' +
  '            </div></section>',
  data: function(){
   return {
     //global variables
     result: 0,
     time: 0, //months usually
     interest: 0,
     rate: 0, //divide by 1200 to get to percentage/months
     //savings
     deposit: 0, //initial deposit
     moDeposit: 0, //thereafter monthly deposit
     savingInterest: 0, //interest only on savings calculator
     totalInterest: 0,
     totalDeposit: 0
   }
  },
  computed: {
    //this clears the current calculator's variables manually
    clear: function() {
      // clear everything
      this.amt = 0;
      this.rate = 0;
      this.time = 0;
      this.savingInterest = 0;
      this.deposit = 0;
      this.moDeposit = 0;
    },
    //this function determines how much savings the client deposits over time + their original deposit
    savingsOriginal: function(){
      //SAVINGS
      //this calculates total savings account growth
      //initial deposit
      let deposit = this.deposit;
      //returned deposit
      let total = 0;
      //montly deposit
      let moDeposit = this.moDeposit;
      //interest rate
      let rate = this.rate / 1200;
      //amount of months with account
      let months = this.time;

      let totalDeposit = +deposit + (moDeposit * months); //this is the original deposit + the deposits per month after
      //console.log(totalDeposit, "totalDeposit savingsOriginal");

      return currencyFormat(totalDeposit);
    },
    //this function determines the growth of the savings account deposits + interest accumulated
    savingsGrowth: function(){
      //SAVINGS
      //this calculates total savings account growth

      //initial deposit
      let deposit = this.deposit;
      //monthly deposit
      let moDeposit = this.moDeposit;
      //interest rate
      let rate = this.rate / 1200;
      //amount of months with account
      let months = this.time;
      //interest per month
      let interest = 0;

      let totalInterest = this.totalInterest;

      let calcMonthly = moDeposit * months;

      let totalDeposit = +deposit + +calcMonthly; //this is the original deposit + the deposits per month after

      //loop through the months
      for (let i = 0; i <= months; i++) {
        //multiply the deposit by the rate amount
        deposit = +deposit + +moDeposit;
        interest = deposit * rate;
        totalInterest = +totalInterest + +interest;
      }

      let result = +totalInterest + +totalDeposit;
      return currencyFormat(result);
    },

    //this function separates out the interest from the accumulated deposits
    savingsInterest: function() {
      //SAVINGS INTEREST
      //this calculates total savings account growth

      //initial deposit
      let deposit = this.deposit;
      //montly deposit
      let moDeposit = this.moDeposit;
      //interest rate
      let rate = this.rate / 1200;
      //amount of months with account
      let months = this.time;
      //interest per month
      let interest = 0;
      //total interest gained over months
      let totalInterest = this.totalInterest;

      //loop through the months
      for (let i = 0; i <= months; i++) {
        //multiply the deposit by the rate amount
        deposit = +deposit + +moDeposit;
        interest = deposit * rate;
        totalInterest = +totalInterest + +interest;
      }
      return currencyFormat(totalInterest);
    }
  }
});

new Vue({
  el: '#calculator-savings'
});

//https://blog.tompawlak.org/number-currency-formatting-javascript
function currencyFormat (num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

/* jshint ignore:end */