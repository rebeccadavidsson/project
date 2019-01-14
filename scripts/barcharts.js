function makeBarcharts(data, foodnames) {

var graphWidth = 280
var yPadding = 100
var xPadding = yPadding - 5
var barPadding = 8
var graphSpace = 200
var textLoc = 480
var weeks = 52 // TODO
var monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
              "Aug", "Sep", "Okt", "Nov", "Dec"]

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


var colors = ["#660066", "#990099", "#ff00ff", "#ff99ff"]
var foods = ["pear", "asparagus", "beet", "pasta-salad"]
var yearsSelected = ["2006", "2010", "2008", "2012"]

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
    bar.data(getDataArray(data, food, year))
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("id", "bar" + i)
      .attr("x", function(d) {
        return(xScale(d[1]) + xPadding)})
      .attr("y", function(d) {
        return(yScale(d[0]) + yPadding + i - graphSpace)})
      .attr("width", 3.5)
      .attr("height", function(d) {
        return(d[0])
      })
      .attr("fill", color)
      .on('mouseover', function(d) {
            d3.select(this).style('opacity', '0.4')
        })
      .on('mouseout', function(d) {
            d3.select(this)
            .transition()
          .duration(250)
          .style('opacity', '1')
        })

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
  function addButtons() {

    for (i = 100, j = 0; i < graphSpace * 4; i += graphSpace, j++) {
    d3.selectAll("#datasvg")
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(100," + i + ")")
      .call(d3.axisLeft(yScale).ticks(5));
    }

    var sliderAxis = d3.scalePoint()
        .range([barPadding ,graphWidth + barPadding]);

    // Add slide bar
    slider = d3.selectAll('#sliderdiv')
            .append("div")
            .attr("class", "slidecontainer")

    slider.append("input")
              .attr("type", "range")
              .attr("min", 1)
              .attr("max", 12)
              .attr("value", 1)
              .attr("class", "slider")
              .attr("id", "year")
              .on("input", function input() {
    					updateYear(data, bar);
              updateUnderBarChart(data, "frozen-yogurt")
    				});

    slider.append("g")
          .attr("class", "sliderAxis")
            .call(d3.axisBottom(sliderAxis))

    dropdown = d3.select("div") // TODO

    // Add dropdown menu
    dropdown.append("select")
            .selectAll("option")
            .data(foodnames) // TODO sort
            .enter()
              .append("option")
              .attr("value", function(d){
                  return d;
              })
              .text(function(d){
                  return d;
              });

    // Update function on dropdown selection
    dropdown.on('change', function(){
                var foodname = d3.select(this)
                .select("select")
                .property("value")
            updateSunburst(data, foodname)
            updateUnderBarChart(data, foodname)
            updateLineChart(data, foodname, "False")})
  }addButtons()
}

// Update bars with a transition when moving the slide bar
function updateYear(data, bar) {

  // Get year that is currently selected at the slide bar
  var year = years[document.getElementById("year").value];

  var graphWidth = 280
  var yPadding = 100
  var xPadding = yPadding - 5
  var barPadding = 8
  var graphSpace = 200
  var textLoc = 480
  var colors = ["#660066", "#990099", "#ff00ff", "#ff99ff"]
  var foods = ["pear", "asparagus", "beet", "pasta-salad"]
  var yearsSelected = ["2006", "2010", "2008", "2012"] // TODO

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

  // Update all the barcharts
  for (i = graphSpace, j = 0; i < 1000; i += graphSpace, j++) {
    // Fill in the barchart with rectangles
    function fillBars(food, year, color){

      d3.selectAll("#bar" + i)
        .data(getDataArray2(data, food, year))
        .transition()
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr("x", function(d) {
          return(xScale(d[1]) + xPadding)})
        .attr("y", function(d) {
          return(yScale(d[0]) + yPadding + i - graphSpace)})
        .attr("width", 3.5)
        .attr("height", function(d) {
          return(d[0])
        })
        .attr("fill", color);

        }
        fillBars(foods[j], year, colors[j])
      }

}
