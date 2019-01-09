function onload() {

// Open file
fetch('data/result.json').then(response => {
  return response.json();
}).then(data => {

d3.select("#sunburstsvg")
  .append("text")
  .text("HIER KOMT IETS VAN DATA OFZO weet ik nog niet zo goed")
    .attr("class", "datatext")
  .attr('y', 50)
  .attr('x', 20)

d3.select("#datasvg")
  .append("text")
  .text("Title")
  .attr("class", "datatext")
  .attr('y', 50)
  .attr('x', 20)

function makeLinecharts() {

// Open file
fetch('data/result.json').then(response => {
  return response.json();
}).then(data => {

// Source: http://2ality.com/2013/11/initializing-arrays.html
function fillArrayWithNumbers(n) {
     var arr = Array.apply(null, Array(52));
     return arr.map(function (x, i) { return i + 1 });
 }
weeksArray = fillArrayWithNumbers(52)

// TODO
function getDataArray(food, year) {
  // Process data
  var keys = data[food][year];
  array = []
  for (var key in keys) {
    array.push([keys[key]]);
  }
  // Fill in the week-numbers
  for (var i = 0; i < 52; i++) {
    array[i].push(weeksArray[i])
  }
  return array
}

monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
               "Aug", "Sep", "Okt", "Nov", "Dec"]
// Define range and domain for xScale and yScale
var xScale = d3.scaleLinear()
    .domain([0,52])
    .range([0,400]);
var xAxis = d3.scalePoint()
    .domain(monthsArray)
    .range([0,400]);
var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([100,0]);
var yPadding = 100
var xPadding = yPadding - 5
var graphSpace = 200
var textLoc = 590

colors = ["#660066", "#990099", "#ff00ff", "#ff99ff"]
foods = ["apple", "asparagus", "beet", "pasta-salad"]
years = ["2012", "2010", "2008", "2012"]

var datasvg = d3.select("#datasvg")
var bar = datasvg.selectAll(".bar")

// Load first line charts when page is opened
for (i = graphSpace, j = 0; i < 1000; i += graphSpace, j++) {
datasvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(100," + i + ")")
      .call(d3.axisBottom(xAxis));

// Fill in the barcharts with rectangles
function fillBars(food, year, color){
  bar.data(getDataArray(food, year))
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return(xScale(d[1]) + xPadding)})
    .attr("y", function(d) {
      return(yScale(d[0]) + yPadding + i - graphSpace)})
    .attr("width", 5)
    .attr("height", function(d) {
      return(d[0])
    })
    .attr("fill", color);

    var circle = datasvg.append("circle")
                .attr("cx", textLoc)
                .attr("cy", i - 52)
                .attr("r", 60)
                .attr("fill", "lightgrey");

    d3.selectAll(circle).append("text").text("KJSHKJH")

  datasvg.append("text")
        .text(foods[j])
        .attr("class", "foodname")
        .attr("text-anchor", "middle")
        .attr("x", textLoc)
        .attr("y", i - 50)

}fillBars(foods[j], years[j], colors[j])
}

for (i = 100, j = 0; i < graphSpace * 4; i += graphSpace, j++) {
d3.selectAll("#datasvg")
  .append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(100," + i + ")")
  .call(d3.axisLeft(yScale).ticks(5));
}

// TODO
function makeSlider() {

var x = d3.scaleLinear()
    .domain([0, 180])
    .range([0, 200])
    .clamp(true);

var slider = datasvg.append("g")
              .attr("class", "slider")
              .attr("transform", "translate(100, 900)");

  slider.append("line")
      .attr("class", "track")
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-overlay")
      .call(d3.drag()
          .on("start.interrupt", function() { slider.interrupt(); })
          .on("start drag", function() { hue(x.invert(d3.event.x)); }));

  slider.insert("g", ".track-overlay")
      .attr("class", "ticks")
      .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
    .data(x.ticks(10))
    .enter().append("text")
      .attr("x", x)
      .attr("text-anchor", "middle")
      .text(function(d) { return d + "°"; });

  var handle = slider.insert("circle", ".track-overlay")
      .attr("class", "handle")
      .attr("r", 9);

  slider.transition()
      .duration(750)
      .tween("hue", function() {
        var i = d3.interpolate(0, 70);
        return function(t) { hue(i(t)); };
      });

  function hue(h) {
    handle.attr("cx", x(h));
    datasvg.style("background-color", d3.hsl(h, 0.8, 0.8));
  }
}
// makeSlider()


}).catch(err => {
  // TODO
});
}makeLinecharts()

function makeSunburst(){
  test = [0,1,2,3,4,5,6]

  var width = 300;
  var height = 300;
  var radius = 360;
  var outerRadius = 80;
  var color = d3.scaleOrdinal(d3.schemeCategory20b);

  var sunburst = d3.select("#sunburstsvg")
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + 400 + ',' + 500 + ')');

  var colors = d3.scaleOrdinal(d3.schemeBlues[9])

  var arc = d3.arc()
              .innerRadius(radius)
              .outerRadius(outerRadius);
  var pie = d3.pie()
              .value(function(d) { return d; })
              .sort(null);

  sunburst.selectAll("path")
        .data(pie(test))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr("fill", function(d,i) {
          return colors(i);
        })
        .each(function(d) { this._current = d; })

}makeSunburst()

function makeBarchart(){
  var barchart = d3.selectAll("#barchart")
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  var height = 200
  var width = 1000

  // Define range and domain for xScale and yScale
  var xScale = d3.scaleLinear()
      .domain([0,11])
      .range([0,width]);
  var xAxis = d3.scalePoint()
      .domain(years)
      .range([0,width]);
  var yScale = d3.scaleLinear()
      .domain([0,100])
      .range([400,0]);

  barchart.append("g")
  .attr("class", "axisBar")
  .attr("transform", "translate(300," + 600 + ")")
  .call(d3.axisBottom(xAxis));

  barchart.append("g")
    .attr("class", "axisBar")
    .attr("transform", "translate(300," + 200 + ")")
    .call(d3.axisLeft(yScale).ticks(5));

  // function to add gridlines
  function makeGridlines() {
      return d3.axisLeft(yScale)
          .ticks(5)
  }

  // add the gridlines
  barchart.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(300," + 200 + ")")
      .call(makeGridlines()
          .tickSize(-width)
          .tickFormat("")
      )


  // Add lines to the graph

  // TODO

  function getDataArrayYears(food) {
    // Process data
    var keys = data[food];
    console.log(keys);
  }getDataArrayYears("carrot")



}makeBarchart()

}).catch(err => {
  // TODO
});

}
