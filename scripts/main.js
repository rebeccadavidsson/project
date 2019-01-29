/*
 * Source: https://codepen.io/martinwolf/pen/ZGXKEX/
 * Parallax effect on page header
 */
$(document).ready(function() {
    $(window).on('scroll', function() {
        var st = $(this).scrollTop();

        $('#box-one').css({
            'transform': 'translateY('+ ((st)/1.3) +'px)'
        });
    });
});

/*
 * Loads data and passes it on to several functions.
 */
function onload() {

  // Open file
  fetch('data/result.json').then(response => {
    return response.json();
  }).then(data => {

  // Set foodname to load data when page is opened
  var foodname = "anise"

  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
             "2010", "2011", "2012", "2013", "2014", "2015", "2016"]

  // Make an array of foodnames
  foodnames = []

  for (var key in data) {

    // Skip header
    if (key != "id") {
      foodnames.push(key)
    }
  }

  // Check for correct size
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  // Filter all foodnames with missing data
  for (var row in data) {
    for (var year in data[row]) {
      if (Object.size(data[row][year]) !== 52) {
        foodnames = foodnames.filter(e => e !== row);
      }
    }
  }

  // Sort in alphabetical order, used in the dropdown
  foodnames.sort();
  foodnames.splice(0,0,"-")

  // Make a sunburst when page is opened
  makeSunburstWelcome(data, foodnames) // TODO

  // Make the first sunburst
  makeSunburst(data, foodname)

  // Make a few bar charts
  makeBarcharts(data, foodnames)

  // Make the bar chart that goes under the sunburst
  makeUnderBarchart(data, foodname)

  // Make a line chart
  makeLinechart(data, foodname)

  // Add mini linecharts for extra data exploration
  makeMiniLinecharts(data)

  // Call function that adds a compare button
  linechartDropdown(data, foodnames)

  // Add a few barchart examples to explore data
  exploreBarCharts(data)

  // Make the last sunburst without hidden layers
  makeUnderSunburst(data, "#sunburstOutro")

}).catch(err => {
  alert(err)
});
}
