

//https://blog.tompawlak.org/number-currency-formatting-javascript
function currencyFormat (num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}


/* jshint ignore:start */
Vue.component('calculator-retirement', {
template: ' <section class="row">\n' +
'                <div class="col-md-6"><div class="form-group">\n' +
'                  <label for="income">Annual Income Required</label>\n' +
'                  <div class="input-group">\n' +
'                    <span class="input-group-addon">$</span>\n' +
'                    <input type="number" onfocus="this.select()" v-model="income" name="income" id="income" class="form-control" value="0" />\n' +
'                  </div>\n' +
'                </div>\n' +
'\n' +
'                <div class="form-group">\n' +
'                  <label for="pre">Years Until Retirement</label>\n' +
'                  <input type="number" onfocus="this.select()" v-model="yearsPre" name="pre" id="pre" class="form-control" value="0" />\n' +
'                </div>\n' +
'\n' +
'                <div class="form-group">\n' +
'                  <label for="post">Years in Retirement</label>\n' +
'                  <input type="number" onfocus="this.select()" v-model="yearsPost" name="post" id="post" class="form-control" value="0" />\n' +
'                </div>\n' +
'\n' +
'                <div class="form-group">\n' +
'                  <label for="inflation">Inflation Rate</label>\n' +
'\n' +
'                  <div class="input-group">\n' +
'                    <input type="number" onfocus="this.select()" v-model="inflation" name="inflation" id="inflation" class="form-control" value="0" />\n' +
'                    <span class="input-group-addon">%</span>\n' +
'                  </div>\n' +
'                </div>\n' +
'\n' +
'                <div class="form-group">\n' +
'                  <label for="rate">Interest Rate on Savings</label>\n' +
'\n' +
'                  <div class="input-group">\n' +
'                    <input type="number" onfocus="this.select()" v-model="rate" name="rate" id="rate" class="form-control" value="0" />\n' +
'                    <span class="input-group-addon">%</span>\n' +
'                  </div>\n' +
'                </div>\n' +
'              </div>\n' +
'\n' +
'\n' +
'            <div class="result loan col-md-6">\n' +
'              <h3>Estimated Results</h3>\n' +
'              <p>If you expect to have <span>{{ yearsPost }}</span> years in retirement, and you want an income of <span>{{ income }}</span></p>\n' +
'              <h4>Annual required income: <span>{{ requiredYearlyIncome }}</span></h4>\n' +
'              <h4>Retirement savings goal: <span>{{ retirementGrowth || 0 }}</span></h4>\n' +
'            </div>\n' +
'            </section>',
  data: function(){
   return {
     //global variables
     result: 0,
     time: 0, //months usually
     interest: 0,
     rate: 0, //divide by 1200 to get to percentage/months

     //general loan variables
     amt: 0,
     yearsPre: 0,
     yearsPost: 0,
     income: 0,
     inflation: 0,
     balance: 0
   }
  },
  computed: {
    retirementGrowth: function(){
      //RETIREMENT CALCULATOR

      // this one works
      let inflation = 1 + (this.inflation / 100); //inflation rate
      let yearsPre = this.yearsPre; //pre retirement
      let incomeCalc = this.income * (Math.pow(inflation, yearsPre)); //this is the wage you need in retirement
      //console.log(incomeCalc + " = income");

      let prevInflation = this.inflation;

      let balance = 0; //variable used to calculate initial end balance
      let yearsPost = this.yearsPost; //years in retirement
      let rate = this.rate / 100;

      if (prevInflation > 0) {
        incomeCalc = incomeCalc * (Math.pow(inflation, yearsPost));
      }


      for (let i = 0; i < yearsPost; i++){
        if(prevInflation > 0){
          incomeCalc = incomeCalc / (1 + +prevInflation / 100);
        }

        balance = balance / (1 + rate) + incomeCalc;
      }

      let earnings = balance * rate / 100;
      balance = +balance + +earnings;

      let result = balance; // dummy value
      if (result < 0) {
        return "Invalid Number";
      } else {
        return currencyFormat(result);
      }
    },
    requiredYearlyIncome: function() {
      //this function will calculate the necessary income needed for whatever you expect your base income to be + interest

      let inflation = 1 + (this.inflation / 100); //inflation rate
      let yearsPre = this.yearsPre; //pre retirement
      let incomeCalc = this.income * (Math.pow(inflation, yearsPre));
      // console.log(incomeCalc + " = income");

      return currencyFormat(incomeCalc);
    }
  }
});

new Vue({
  el: '#calculator-retirement'
});

/* jshint ignore:end */
