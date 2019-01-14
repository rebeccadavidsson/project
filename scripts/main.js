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

// Make a few bar charts
makeBarcharts(data, foodnames)

// Make the first sunburst
makeSunburst(data)

// Make the bar chart that goes under the sunburst
makeUnderBarchart(data, foodname)

// Make a line chart
makeLinechart(data, foodname)

}).catch(err => {
  // TODO
});
}
