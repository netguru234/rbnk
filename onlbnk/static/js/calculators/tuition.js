

// jQuery(function($) {
//   function whichCalculator
// });


/* jshint ignore:start */
Vue.component('calculator-tuition', {
template:
  '<section class="row">\n' +
  '<div class="col-md-6"><div class="term form-group">\n' +
  '                <label for="timeUntil">Years Until College</label>\n' +
  '                <select v-model="timeUntil" id="timeUntil" class="form-control">\n' +
  '                  <option value="0" selected>0 </option>\n' +
  '                  <option value="1">1 </option>\n' +
  '                  <option value="2">2 </option>\n' +
  '                  <option value="3">3 </option>\n' +
  '                  <option value="4">4 </option>\n' +
  '                  <option value="5">5 </option>\n' +
  '                  <option value="6">6 </option>\n' +
  '                  <option value="7">7 </option>\n' +
  '                  <option value="8">8 </option>\n' +
  '                  <option value="9">9 </option>\n' +
  '                  <option value="10">10 </option>\n' +
  '                  <option value="11">11 </option>\n' +
  '                  <option value="12">12 </option>\n' +
  '                  <option value="13">13 </option>\n' +
  '                  <option value="14">14 </option>\n' +
  '                  <option value="15">15 </option>\n' +
  '                  <option value="16">16 </option>\n' +
  '                  <option value="17">17 </option>\n' +
  '                  <option value="18">18 </option>\n' +
  '                  <option value="19">19 </option>\n' +
  '                  <option value="20">20 </option>\n' +
  '                </select>\n' +
  '              </div>\n' +
  '\n' +
  '              <div class="form-group">\n' +
  '                <label for="annualTuition">Current Annual Tuition</label>\n' +
  '                <div class="input-group">\n' +
  '                  <span class="input-group-addon">$</span>\n' +
  '                  <input type="number" min="0" onfocus="this.select()" name="annualTuition" id="annualTuition" class="form-control" v-model="annualTuition" value="0" step="any" placeholder="Loan Amount" />\n' +
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
  '\n' +
  '              <div class="form-group">\n' +
  '                <label for="yearsAttending">Years Attending College</label>\n' +
  '                <div class="input-group">\n' +
  '                  <select id="yearsAttending" v-model="yearsAttending" class="form-control">\n' +
  '                    <option value="0" selected>0 </option>\n' +
  '                    <option value="1">1 </option>\n' +
  '                    <option value="2">2 </option>\n' +
  '                    <option value="3">3 </option>\n' +
  '                    <option value="4">4 </option>\n' +
  '                    <option value="5">5 </option>\n' +
  '                    <option value="6">6 </option>\n' +
  '                  </select>\n' +
  '                </div>\n' +
  '              </div>\n' +
  '\n' +
  '              <div class="form-group">\n' +
  '                <label for="desiredTuitionCoverage">Percent of Tuition Covering from Savings</label>\n' +
  '                <div class="input-group">\n' +
  '                  <select name="desiredTuitionCoverage" v-model="desiredTuitionCoverage" id="desiredTuitionCoverage" class="form-control">\n' +
  '                    <option value="0">0 %</option>\n' +
  '                    <option value="5">5 %</option>\n' +
  '                    <option value="10">10 %</option>\n' +
  '                    <option value="15">15 %</option>\n' +
  '                    <option value="20">20 %</option>\n' +
  '                    <option value="25">25 %</option>\n' +
  '                    <option value="30">30 %</option>\n' +
  '                    <option value="35">35 %</option>\n' +
  '                    <option value="40">40 %</option>\n' +
  '                    <option value="45">45 %</option>\n' +
  '                    <option value="50">50 %</option>\n' +
  '                    <option value="55">55 %</option>\n' +
  '                    <option value="60">60 %</option>\n' +
  '                    <option value="65">65 %</option>\n' +
  '                    <option value="70">70 %</option>\n' +
  '                    <option value="75">75 %</option>\n' +
  '                    <option value="80">80 %</option>\n' +
  '                    <option value="85">85 %</option>\n' +
  '                    <option value="90">90 %</option>\n' +
  '                    <option value="95">95 %</option>\n' +
  '                    <option value="100">100 %</option>\n' +
  '                  </select>\n' +
  '                </div>\n' +
  '              </div>\n' +
  '\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="result loan col-md-6">\n' +
  '              <h3>Estimated Results</h3>\n' +
  '              <p>You want <span>{{ desiredTuitionCoverage }}%</span> of your tuition paid for with savings, so </p>\n' +
  '\n' +
  '              <h4>Tuition Cost: <span>{{ tuitionSavings || 0 }}</span></h4>\n' +
  '              <h4>Tuition Savings Goal: <span>{{ totalSavingsNeeded || 0 }}</span></h4>\n' +
  '            </div></section>',
  data: function(){
   return {
     //global variables
     result: 0,
     time: 0, //months usually
     interest: 0,
     rate: 0, //divide by 1200 to get to percentage/months
    //tuition
     timeUntil: 0, // time until college
     annualTuition: 0, //amount of tuition during savings years
     yearsAttending: 0, //years expected to attend college
     desiredTuitionCoverage: 0, //the amount you want covered by your tuition savings account
     tuitionCost: 0, //the total calculated cost of your college tuition
     totalSavingsNeeded: 0,
   }
  },
  methods: {

  },
  computed: {
    tuitionSavings: function(){
      //TUITION CALCULATOR

      let rate = 1 + (this.rate / 100); //inflation rate for tuition
      // console.log(rate + " = rate");

      let annual = this.annualTuition; //current annual tuition cost
      let time = this.timeUntil; //this references the years prior to college attendence
      let years = this.yearsAttending; //this references how many years the attendee plans to go
      let desiredTuitionCoverage = this.desiredTuitionCoverage;
      let total = 0;

      let totalTime = +years + +time; //adds the years prior to college and the years attending college together
      // console.log(totalTime + " = totalTime");

      for (let i = 2; i <= totalTime; i++) {
        annual = annual * rate;
        if(i > time) {
          total += annual;
        }
      }

      this.totalSavingsNeeded = currencyFormat((desiredTuitionCoverage / 100) * total); //redefine savings needed for individual


      if (total < 0) {
        return "Invalid Number";
      } else {
        return currencyFormat(total);
      }
    }
  }
});

new Vue({
  el: '#calculator-tuition'
});

//https://blog.tompawlak.org/number-currency-formatting-javascript
function currencyFormat (num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
/* jshint ignore:end */