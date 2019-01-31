var years = ["2004", "2005", "2006", "2007", "2008", "2009",
           "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]
var monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
             "Aug", "Sep", "Okt", "Nov", "Dec", ""]
var weeks = 52
var yearsCount = 12

// Source: http://2ality.com/2013/11/initializing-arrays.html
// Fill empty array with numbers
function fillArrayWithNumbers(n) {
     var arr = Array.apply(null, Array(n));
     return arr.map(function (x, i) { return i + 1 });
 }

// Get array from 1:52
var weeksArray = fillArrayWithNumbers(weeks)

/*
* Make an array of ALL searching rates per year.
* Return array and min and max value of array.
* This function is used for "welcome-sunburst".
*/
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

/*
* Make an array of MEAN searching rates per year.
* Return array and min and max value of array.
*/
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

/*
 * Make an array that can be used for the mini bar charts.
 * Return array and min and max value of array.
 */
function getDataMninBars(data,food) {

 var keys = data[food];
 array = []

 // Loop through every year
 for (var key in keys) {

   // Loop through every value of that year
   for (var i = 1; i < weeks + 1 ; i += 4) {

     array.push(parseInt(keys[key][i]))
   }
 }

 return [array, Math.min.apply(null,array), Math.max.apply(null,array)]
}

/*
 * Create an array of [week, rate] for every datapoint in a year.
 * Output is an array of [week, rate] and min and max value of array.
 */
function getDataArray2(data, food, year) {

  var keys = data[food][year];
  array = []
  arr2 = []
  for (var key in keys) {
    array.push([keys[key]]);
    arr2.push(keys[key])
  }

  // Fill in the week-numbers
  for (var i = 0; i < weeks; i++) {
    array[i].push(weeksArray[i])
  }

  return [array, Math.min.apply(null,arr2), Math.max.apply(null,arr2)]
}

/*
 * Convert data into usable format for the sunburst.
 */
function sunburstData(data, foodname) {
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  indexs = [0, 5, 9, 13, 17, 22, 26, 31, 35, 39, 44, 48]

  var flare = []
  testJson = []

  // 13 years in total
  for (var j = 0, i = 0; j < 13; j++, i++) {
    testJson.push({"name" : years[i], "children" : getMonths(years[i])})
  }


  function getArray(year) {
    var tempArr = []
    for (var j = 0; j < weeks; j++) {
      dataArray = getDataArray2(data, foodname, year)[0]
      tempArr.push({"name" : dataArray[j][1], "size" :  parseInt(dataArray[j][0])})
    }
    return tempArr
  }

  function getMonths(year) {
    var temp = []
    var tempArray = getArray(year)

    for (var k = 0; k < yearsCount; k++) {
      temp.push({ "name" : "month", "children" : getMonth(indexs[k], tempArray) })
    }
    return temp;
  }

  flare.push({"name": "flare", "children" : testJson})

  return flare;
}

/*
 * Define which week corresponds to which month.
 * Input is a number between 0 and 51, output is a dataArray with
 * data from that month.
 */
function getMonth(index, dataArray) {
  var monthsArray = []
  if (index >= 0 && index < 5) {
    var dataArrayTotal = returnMonth(0, 5, dataArray)
    monthsArray.push({"name" : "January", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 5 && index < 9) {
    var dataArrayTotal = returnMonth(5, 9, dataArray)
    monthsArray.push({"name" : "February", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 9 && index < 13) {
    var dataArrayTotal = returnMonth(9, 13, dataArray)
    monthsArray.push({"name" : "March", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 13 && index < 17) {
    var dataArrayTotal = returnMonth(13, 17, dataArray)
    monthsArray.push({"name" : "April", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 17 && index < 22) {
    var dataArrayTotal = returnMonth(17, 22, dataArray)
    monthsArray.push({"name" : "May", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 22 && index < 26) {
    var dataArrayTotal = returnMonth(22, 26, dataArray)
    monthsArray.push({"name" : "June", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 26 && index < 31) {
    var dataArrayTotal = returnMonth(26, 31, dataArray)
    monthsArray.push({"name" : "July", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 31 && index < 35) {
    var dataArrayTotal = returnMonth(31, 35, dataArray)
    monthsArray.push({"name" : "August", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 35 && index < 39) {
    var dataArrayTotal = returnMonth(35, 39, dataArray)
    monthsArray.push({"name" : "September", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 39 && index < 44) {
    var dataArrayTotal = returnMonth(39, 44, dataArray)
    monthsArray.push({"name" : "October", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 44 && index < 48) {
    var dataArrayTotal = returnMonth(44, 48, dataArray)
    monthsArray.push({"name" : "November", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 48 && index < 52) {
    var dataArrayTotal = returnMonth(48, 52, dataArray)
    monthsArray.push({"name" : "December", "children" : dataArrayTotal})
    return monthsArray
  }
}

function returnMonth(a, b, dataArray) {
  var dataArrayTotal = []
  for (var i = a; i < b; i++) {
    dataArrayTotal.push(dataArray[i])
  }
  return dataArrayTotal
}
