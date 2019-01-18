
  // Source: http://2ality.com/2013/11/initializing-arrays.html
  function fillArrayWithNumbers(n) {
       var arr = Array.apply(null, Array(n));
       return arr.map(function (x, i) { return i }); // TODO
   }

   // TODO
    var weeks = 52
    var yearsCount = 12
    var years = ["2004", "2005", "2006", "2007", "2008", "2009",
               "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"] // TODO
    var monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                  "Aug", "Sep", "Okt", "Nov", "Dec"]
    var weeksArray = fillArrayWithNumbers(weeks)

    // Make an array of foodnames
    // var foodnames = []
    // for (var key in data) {
    //
    //   // Skip header
    //   if (key != "id") {
    //     foodnames.push(key)
    //   }
    // }


    // TODO: Deze functies samenvoegen en input aanpassen
   // Make an array of of datapoints of one year for a chosen food
   function getDataArrayMinMax(data, food, year) {

     // console.log(food, year);
     var keys = data[food][year];
     array = []
     for (var key in keys) {
       array.push(parseInt(keys[key]));
     }

     return [array, Math.min.apply(null,array), Math.max.apply(null,array)]
   }

   // Make an array of all data points of every year for a chosen food
   function getDataArrayYears(data, food) {
     // Process data
     var keys = data[food];
     array = []

     // Loop through every year
     for (var key in keys) {

       // Loop through every value of that year
       for (var i = 1; i < weeks + 1; i++) {
         array.push(parseInt(keys[key][i]))
       }
     }
     return array
   }

   function getDataMeans(data, food) {
     array = []
     for (var key in data[food]) {

       value = 0
       // Calculate total value per year
       for (var i = 1; i < weeks + 1; i++) {
         value += parseInt(data[food][key][i])
       }
       array.push(value);
    }
    return [array, Math.min.apply(null,array), Math.max.apply(null,array)]
   }

   function getDataMeansLineChart(data, food) {
     array = []

     for (var key in data[food]) {
       value = 0
       // Calculate total value per year
       for (var i = 1; i < weeks + 1; i++) {
         value += parseInt(data[food][key][i])
       }
       array.push(value / weeks);
    }
    return [array, Math.min.apply(null,array), Math.max.apply(null,array)]
   }

   function getDataMninBars(data,food) {

     var keys = data[food];
     array = []

     // Loop through every year
     for (var key in keys) {

       // Loop through every value of that year
       for (var i = 1; i < weeks + 1 ; i+= (  4 + (1/3)) ) {
         i = Math.floor(i)
         array.push(parseInt(keys[key][i]))


       }
     }

     return [array, Math.min.apply(null,array), Math.max.apply(null,array)]
   }
