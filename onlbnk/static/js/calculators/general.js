

// jQuery(function($) {
//   function whichCalculator
// });


/* jshint ignore:start */
Vue.component('calculator-general', {
template:
    '<section class="row"><div class="col-md-6"><div class="form-group"><label for="amt">Loan Amount</label><div class="input-group"><span class="input-group-addon">$</span><input type="number" min="0" onfocus="this.select()" name="amt" id="amt" class="amt form-control" v-model="amt" value="0" step="any" placeholder="Loan Amount" /></div></div><div class="form-group"><label for="rate">Interest Rate</label><div class="input-group"><input type="number" min="0" onfocus="this.select()" name="rate" id="rate" class="rate form-control" v-model="rate" value="0" step="any" placeholder="Rate" /><span class="input-group-addon">%</span></div></div><div class="term form-group"> <label for="term-selection">Loan Term</label> <select v-model="time" id="term-selection" class="term-selection form-control"><option value="0" selected>0 months (0 years)</option><option value="12">12 months (1 year)</option><option value="24">24 months (2 years)</option> <option value="30">30 months (2.5 years)</option> <option value="36">36 months (3 years)</option> <option value="42">42 months (3.5 years)</option> <option value="48">48 months (4 years)</option> <option value="54">54 months (4.5 years)</option> <option value="60">60 months (5 years)</option> <option value="72">72 months (6 years)</option> <option value="120">120 months (10 years)</option> <option value="180">180 months (15 years)</option> <option value="240">240 months (20 years)</option> <option value="300">300 months (25 years)</option> <option value="360">360 months (30 years)</option> </select> </div> </div>  <div class="result loan col-md-6"> <h3>Estimated Results</h3> <p>If you borrow <span>${{ amt }}</span> at <span>{{ rate }}%</span> interest for <span>{{ time }}</span> months, your estimated monthly payments and total interest will be:</p> <h4>Monthly Payment: <span>{{ calcLoan }}</span></h4> <h4>Interest: <span>{{ generalInterest }}</span></h4> </div></section>',
  data: function(){
   return {
     //global variables
     result: 0,
     time: 0, //months usually
     interest: 0,
     rate: 0, //divide by 1200 to get to percentage/months
     //general loan variables
     amt: 0,
     calcInterest: 0
   }
  },
  computed: {
    calcLoan: function(){
      // GENERAL LOAN

      let payment = this.amt;
      let rate = this.rate / 1200;
      let months = this.time;
      let i = Math.pow((1+rate),months);

      // let interest = this.interest;

      //get the result
      let result = Math.round(((payment * rate * i) / (i - 1)) * 100) || 0;

      if (result < 0) {
        return "Invalid Number";
      } else {
        return currencyFormat(result / 100);
      }
    },
    generalInterest: function(){
      //GENERAL LOAN INTEREST

      let months = this.time;
      let interest = this.interest;
      let rate = this.rate / 1200;

      //get the interest paid over time
      let amount = this.amt;
      let totalInterest = 0;
      let i = Math.pow((1+rate),months);

      let payment = Math.round(((amount * rate * i) / (i - 1)) * 100);
      let moPayment = payment / 100;

      for (let i = 0; i <= months; i++) {
        interest = amount * rate;
        amount = (amount - moPayment) + +interest;
        totalInterest += +interest;
      }

      if (totalInterest < 0) {
        return "Invalid Number";
      } else {
        return currencyFormat(totalInterest);
      }
    },
    clear: function() {
      // clear everything
      this.time = 0;
      this.interest= 0;
      this.rate = 0;
      this.amt = 0;
      this.result = 0;
    }
  }
});

new Vue({
  el: '#calculator-general'
});


//https://blog.tompawlak.org/number-currency-formatting-javascript
function currencyFormat (num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
/* jshint ignore:end */
