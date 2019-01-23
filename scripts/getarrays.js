
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
                  "Aug", "Sep", "Okt", "Nov", "Dec", ""]
    var weeksArray = fillArrayWithNumbers(weeks)


    // TODO: Deze functies samenvoegen en input aanpassen
   // Make an array of of datapoints of one year for a chosen food
   function getDataArrayMinMax(data, food, year) {


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
       for (var i = 1; i < weeks + 1 ; i += 4) {

         array.push(parseInt(keys[key][i]))
       }
     }

     return [array, Math.min.apply(null,array), Math.max.apply(null,array)]
   }




   // The function takes two arguments:
// csvData - array of data rows
// groups - array of strings i.e. ['g1', 'g2'] or ['g1']

function genJSON(csvData, groups) {


  var genGroups = function (data) {
    return _.map(data, function(element, index) {
      return { name : index, children : element };
    });
  };

  var nest = function (node, curIndex) {
    if (curIndex === 0) {
      node.children = genGroups(_.groupBy(csvData, groups[0]));
      _.each(node.children, function (child) {
        nest(child, curIndex + 1);
      });
    }
    else {
      if (curIndex < groups.length) {
        node.children = genGroups(
          _.groupBy(node.children, groups[curIndex])
        );
        _.each(node.children, function (child) {
          nest(child, curIndex + 1);
        });
      }
    }
    return node;
  };
  return nest({}, 0);
}


function sunburstData(data, foodname) {
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Okt", "Nov", "Dec"]
  indexs = [0, 5, 9, 13, 17, 22, 26, 31, 35, 39, 44, 48]

  var flare = []
  testJson = []

  // 13 years
  for (var j = 0, i = 0; j < 13; j++, i++) {
    testJson.push({"name" : years[i], "children" : getMonths(years[i])})
  }


  function getArray(year) {
    var tempArr = []
    for (var j = 0; j < 52; j++) {
      dataArray = getDataArray3(data, foodname, year)
      tempArr.push({"name" : dataArray[j][1].toString(), "size" :  parseInt(dataArray[j][0])})
    }
    return tempArr
  }

  function getMonths(year) {
    var temp = []
    var tempArray = getArray(year)

    for (var k = 0; k < 12; k++) {
      temp.push({ "name" : "month", "children" : getMonth(indexs[k], tempArray) })
    }
    return temp;
  }

  flare.push({"name": "flare", "children" : testJson})
  console.log(testJson);
  return flare;
}


function getDataArray3(data, food, year) {

  var keys = data[food][year];
  array = []
  for (var key in keys) {
    array.push([keys[key]]);
  }
  // Fill in the week-numbers
  for (var i = 0; i < weeks; i++) {
    array[i].push(weeksArray[i])
  }

  return array
}

function getMonth(index, dataArray) {

  var monthsArray = []

  if (index >= 0 && index < 5) {
    dataArrayTotal = []
    for (var i = 0; i < 5; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "January", "children" : dataArrayTotal})
    return monthsArray
  }

  else if (index >= 5 && index < 9) {
    dataArrayTotal = []
    for (var i = 5; i < 9; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "February", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 9 && index < 13) {
    dataArrayTotal = []
    for (var i = 9; i < 13; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "March", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 13 && index < 17) {
    dataArrayTotal = []
    for (var i = 13; i < 17; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "April", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 17 && index < 22) {
    dataArrayTotal = []
    for (var i = 17; i < 22; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "May", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 22 && index < 26) {
    dataArrayTotal = []
    for (var i = 22; i < 26; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "June", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 26 && index < 31) {
    dataArrayTotal = []
    for (var i = 26; i < 31; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "July", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 31 && index < 35) {
    dataArrayTotal = []
    for (var i = 31; i < 35; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "August", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 35 && index < 39) {
    dataArrayTotal = []
    for (var i = 35; i < 39; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "September", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 39 && index < 44) {
    dataArrayTotal = []
    for (var i = 39; i < 44; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "October", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 44 && index < 48) {
    dataArrayTotal = []
    for (var i = 44; i < 48; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "November", "children" : dataArrayTotal})
    return monthsArray
  }
  else if (index >= 48 && index < 52) {
    dataArrayTotal = []
    for (var i = 48; i < 52; i++) {
      dataArrayTotal.push(dataArray[i])
    }
    monthsArray.push({"name" : "December", "children" : dataArrayTotal})
    return monthsArray
  }

}
