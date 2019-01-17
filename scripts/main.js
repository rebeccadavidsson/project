// Source: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


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
  var foodnames = []
  for (var key in data) {

    // Skip header
    if (key != "id") {
      foodnames.push(key)
    }
  }

  for (var i = 0; i < 10; i++) {
    var d = data[foodnames[i]]

    for (var j = 0; j < 13; j++) {

      // console.log(d[years[j]]);
    }

    // for (var value in d) {
    //   console.log(value["2004"]);
    // }
  }

  // Sort in alphabetical order
  foodnames.sort();

  function convertNested(data) {

    var hierarchy = {
        key: "names",
        values: d3.nest()
            .key(function(d) { return d; })
            // .value(function(d) { return d; })
            .rollup(function(leaves) {
                return leaves.length;
            })
            .entries(foodnames)
    };


  }convertNested(data)





  // Make a sunburst when page is opened
  makeSunburstWelcome(data, foodnames) // TODO

  // Make a few bar charts
  makeBarcharts(data, foodnames)

  // Make the first sunburst
  makeSunburst(data)

  // Make the bar chart that goes under the sunburst
  makeUnderBarchart(data, foodname)

  // Make a line chart
  makeLinechart(data, foodname)

  // Call function that adds a compare button
  addComparison(data, foodnames)

  // Add a few barchart examples to explore data
  exploreBarCharts(data)

}).catch(err => {
  // TODO
});
}
