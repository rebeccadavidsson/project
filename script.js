function onload() {

// Open file
fetch('data/result.json').then(response => {
  return response.json();
}).then(data => {

d3.select("#sunburstsvg")
  .append("text")
  .text("bladiebladieblablablablabla")
    .attr("class", "datatext")
  .attr('y', 50)
  .attr('x', 20)

// d3.select("#datasvg")
//   .append("text")
//   .text("Title")
//   .attr("class", "datatext")
//   .attr('y', 50)
//   .attr('x', 20)

// Source: http://2ality.com/2013/11/initializing-arrays.html
function fillArrayWithNumbers(n) {
     var arr = Array.apply(null, Array(n));
     return arr.map(function (x, i) { return i }); // TODO
 }

 // TODO
  var weeks = 52
  var yearsCount = 12
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
             "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]

  // Make an array of foodnames
  var foodnames = []
  for (var key in data) {

    // Skip header
    if (key != "id") {
      foodnames.push(key)
    }
  }

  // TODO: Deze functies samenvoegen
 // Make an array of of datapoints of one year for a chosen food
 function getDataArray(food, year) {
   // Process data
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

 // Make an array of all data points of every year for a chosen food
 function getDataArrayYears(food) {
   // Process data
   var keys = data[food];
   array = []

   // Loop through every year
   for (var key in keys) {

     // Loop through every value of that year
     for (var i = 1; i < weeks + 1; i++) {
       array.push(keys[key][i])
     }
   }
   return array
 }

 function getDataMeans(food) {
   array = []
   for (var key in data[food]) {

     value = 0
     // Calculate total value per year
     for (var i = 1; i < weeks + 1; i++) {
       value += parseInt(data[food][key][i])
     }
     array.push([key, value]);
  }
  return array
 }

// TODO
function makeBarcharts() {

// Open file
fetch('data/result.json').then(response => {
  return response.json();
}).then(data => {

weeksArray = fillArrayWithNumbers(weeks)

monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
               "Aug", "Sep", "Okt", "Nov", "Dec"]

var graphWidth = 280
var yPadding = 100
var xPadding = yPadding - 5
var barPadding = 8
var graphSpace = 200
var textLoc = 480

// Define range and domain for xScale and yScale
var xScale = d3.scaleLinear()
    .domain([0,weeks])
    .range([barPadding ,graphWidth + barPadding]);
var xAxis = d3.scalePoint()
    .domain(monthsArray)
    .range([0,graphWidth]);
var yScale = d3.scaleLinear()
    .domain([0,yPadding])
    .range([yPadding,0]);


colors = ["#660066", "#990099", "#ff00ff", "#ff99ff"]
foods = ["apple", "asparagus", "beet", "pasta-salad"]
yearsSelected = ["2012", "2010", "2008", "2012"]

var datasvg = d3.select("#datasvg")
var bar = datasvg.selectAll(".bar")

// Load first bar charts when page is opened
for (i = graphSpace, j = 0; i < 1000; i += graphSpace, j++) {
datasvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(100," + i + ")")
      .call(d3.axisBottom(xAxis));

// Fill in the barchart with rectangles
function fillBars(food, year, color){
  bar.data(getDataArray(food, year))
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return(xScale(d[1]) + xPadding)})
    .attr("y", function(d) {
      return(yScale(d[0]) + yPadding + i - graphSpace)})
    .attr("width", 3.5)
    .attr("height", function(d) {
      return(d[0])
    })
    .attr("fill", color);

  // Add circles for food name
  var circle = datasvg.append("circle")
              .attr("cx", textLoc)
              .attr("cy", i - weeks)
              .attr("r", 55)
              .attr("fill", "lightgrey");

  datasvg.append("text")
        .text(foods[j])
        .attr("class", "foodname")
        .attr("text-anchor", "middle")
        .attr("x", textLoc)
        .attr("y", i - 50)

  }fillBars(foods[j], yearsSelected[j], colors[j])

}

for (i = 100, j = 0; i < graphSpace * 4; i += graphSpace, j++) {
d3.selectAll("#datasvg")
  .append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(100," + i + ")")
  .call(d3.axisLeft(yScale).ticks(5));
}

var sliderAxis = d3.scalePoint()
    .domain([years])
    .range([barPadding ,graphWidth + barPadding]);

// Add slide bar
slider = d3.selectAll('#sliderdiv')
        .append("div")
        .attr("class", "slidecontainer")

slider.append("input")
          .attr("type", "range")
          .attr("min", 1)
          .attr("max", 12)
          .attr("value", 9)
          .attr("class", "slider")

slider.append("g")
      .attr("class", "sliderAxis")
        // .attr("transform", "translate(100," + 10 + ")")
        .call(d3.axisBottom(sliderAxis))
        // .on("onchange", function(d) { console.log("etetste");})

dropdown = d3.selectAll("div")
// Add dropdown menu
dropdown.append("select")
        .selectAll("option")
        .data(foodnames)
        .attr("class", "dropdown")
        .enter()
          .append("option")
          .attr("class", "dropdown-content")
          .attr("value", function(d){
              return d;
          })
          .text(function(d){
              return d;
          });


}).catch(err => {
  // TODO
});
}makeBarcharts()

function makeSunburst(){

  test2 = [40, 4, 2, 1, 8, 10, 11, 12, 1, 2, 2, 6, 4, 2, 50]
  test = getDataMeans("potato")

  var width = 270;
  var height = 200;
  var radius = 260;
  var outerRadius = 230;
  var radius2 = 220
  var outerRadius2 = 200
  var color = d3.scaleOrdinal(d3.schemeCategory20b);

  var sunburst = d3.select("#sunburstsvg")
    .attr('width', window.innerWidth)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + 350 + ',' + 500 + ')');

  var colors = d3.scaleOrdinal(d3.schemeBlues[5]) // TODO

  var arc = d3.arc()
              .innerRadius(radius)
              .outerRadius(outerRadius);
  var arc2 = d3.arc()
              .innerRadius(radius2)
              .outerRadius(outerRadius2);
  var pie = d3.pie()
              .value(function(d, i) {return d[1]; })
              .sort(null);

  sunburst.selectAll("path")
        .data(pie(test))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr("fill", function(d,i) {
          return colors(i);
        })
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .each(function(d) { this._current = d; })

  sunburst.selectAll("path")
        .data(pie(test2))
        .enter()
        .append('path')
        .attr('d', arc2)
        .attr("fill", function(d,i) {
          return colors(i);
        })
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .each(function(d) { this._current = d; })
}makeSunburst()

function updateSunburst(food) {

  console.log(food);
}
updateSunburst("pizza")


function makeLinechart(){
  var linechart = d3.selectAll("#linechart")
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]
  var height = 200
  var width = 800
  var padding = 100

  // Define range and domain for xScale and yScale
  var xScale = d3.scaleLinear()
      .domain([-2,676]) // TODO
      .range([padding, width + padding]);
  var xAxis = d3.scalePoint()
      .domain(years)
      .range([0,width]);
  var yScale = d3.scaleLinear()
      .domain([60,200]) // TODO
      .range([400,0]);

  linechart.append("g")
  .attr("class", "axisBar")
  .attr("transform", "translate(" + padding + "," + 600 + ")")
  .call(d3.axisBottom(xAxis));

  linechart.append("g")
    .attr("class", "axisBar")
    .attr("transform", "translate(" + padding + "," + 200 + ")")
    .call(d3.axisLeft(yScale).ticks(5));

  // function to add gridlines
  function makeGridlines() {
      return d3.axisLeft(yScale)
          .ticks(5)
  }

  // add the gridlines
  linechart.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + padding + "," + 200 + ")")
      .attr("opacity", 0.5)
      .call(makeGridlines()
          .tickSize(-width)
          .tickFormat("")
      )

  dataset = ["apple", "pear", "potato"] // TODO
  colors = ["red", "limegreen", "gold"] // TODO
  data1 = getDataArrayYears("beet")
  data2 = getDataArrayYears("apple")

  // Add lines to the graph
  var line = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); });


  for (var i = 0; i < 3; i++) {
  // Append a path for each line
  linechart.append("path")
      .datum(getDataArrayYears(dataset[i]))
      .attr("fill", "none")
      .attr("stroke", colors[i])
      .attr("stroke-width", 3)
      .attr("opacity", 0.8)
      .attr("d", function(d) { return line(d); });
  }


  //Append legend to linechart
  linechart.append("text")
            .text("HIER KOMT EEN LEGENDA")
            .attr("class", "linechartTitle")
            .attr("x", 580)
            .attr("y", 700)


  // Append text and title to the linechart
  linechart.append("text")
          .text("Dit is vet onoverzichterlijk dus dit moet gemiddelde worden...")
          .attr("class", "linechartTitle")
          .attr("x", padding)
          .attr("y", 120)

  linechart.append("rect")
            .attr("fill", "grey")
            .attr("x", 1000)
            .attr("y", 100)
            .attr("width", 2)
            .attr("height", 650)

  linechart.append("text")
            .text("Hier komt uitleg")
            .attr("class", "linechartTitle")
            .attr("x", 1100)
            .attr("y", 120)

  linechart.append("text")
            .text("Blablabalbala paragraaf iets")
            .attr("font-size", "18px")
            .attr("fill", "white")
            .attr("x", 1100)
            .attr("y", 200)


}makeLinechart()



}).catch(err => {
  // TODO
});

}
