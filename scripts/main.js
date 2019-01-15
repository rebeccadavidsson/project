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
var foodname = "frozen-yogurt"

// Make an array of foodnames
var foodnames = []
for (var key in data) {

  // Skip header
  if (key != "id") {
    foodnames.push(key)
  }
}

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
