
function makeLinechart(data, foodname){
  var linechart = d3.selectAll("#linechart")
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  var height = 500
  var width = 800
  var padding = 100
  var linePadding = 10
  var marginTop = 200
  var xAxisLoc = height + marginTop

  // Make an array that saves only 2 foodnames, used in compare function
  arr = ["anise"] // TODO

  // Update the legend
  updateLegend(arr)

  // Define range and domain for xScale and yScale
  var xScale = d3.scaleLinear()
      .domain([0,11]) // TODO
      .range([padding, width + 35]);
  var xAxis = d3.scalePoint()
      .domain(years)
      .range([0, width]);
  var yScale = d3.scaleLinear()
      .domain([getDataMeansLineChart(data, foodname)[1] - linePadding,
            getDataMeansLineChart(data, foodname)[2] + linePadding])
      .range([height + marginTop, marginTop]);

  var lineScale = d3.line()
      .x(function(d, i) { return xScale(i); })
      .y(function(d) { return yScale(d); })

  // Append axis to linechart
  linechart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + padding + "," + xAxisLoc + ")")
      .attr("stroke-width", 3)
      .style("font-size", "15px")
      .call(d3.axisBottom(xAxis));

  linechart.append("g")
      .attr("id", "y")
      .attr("class", "y axis")
      .attr("transform", "translate(" + padding + "," + 0 + ")")
      .attr("stroke-width", 3)
      .style("font-size", "15px")
      .call(d3.axisLeft(yScale).ticks(5));

  linechart.append("text")
            .text("Total search count")
            .attr("transform", "translate(60,340) rotate(270)")
            .attr("fill", "white")
            .style("font-size", "14px")
            // .attr("x", 200)
            // .attr("y", 200)

  // function to add gridlines
  function makeGridlines() { // TODO: deze functie hier onderin zetten
      return d3.axisLeft(yScale)
          .ticks(5)
  }

  // add the gridlines
  linechart.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + padding + "," + 0 + ")")
      .attr("opacity", 0.5)
      .call(makeGridlines()
          .tickSize(-width)
          .tickFormat("")
      )

  dataset = ["apple", "pear", "potato"] // TODO
  colors = ["red", "limegreen", "gold"] // TODO

  // Add lines to the graph
  var lineScale = d3.line()
  // .interpolate("cardinal")
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); });

  // Append a path for each line
  linechart.append("path")
      .datum(getDataMeansLineChart(data, foodname)[0])
      .attr("fill", "none")
      .attr("id", "line")
      .attr("stroke", colors[0])
      .attr("stroke-width", 6)
      .attr("opacity", 0.8)
      .attr("d", function(d) { return lineScale(d); });

  // Append text and title to the linechart
  linechart.append("text")
          .text("Mean searching rates of anise")
          .attr("class", "linechartTitle")
          .attr("id", "linechartTitle")
          .attr("x", padding)
          .attr("y", 120)

  linechart.append("rect")
            .attr("fill", "grey")
            .attr("x", 1000)
            .attr("y", 100)
            .attr("width", 2)
            .attr("height", 650)

  linechart.append("text")
            .text("Hier ben ik nog niet aan toe gekomen :-)")
            .attr("class", "linechartTitle")
            .attr("x", 1100)
            .attr("y", 120)

  linechart.append("text")
            .text("Blablabalbala paragraaf iets")
            .attr("font-size", "18px")
            .attr("fill", "white")
            .attr("x", 1100)
            .attr("y", 450)
}

function updateLineChart(data, foodname, comparison) {

  var line = d3.selectAll("#linechart").selectAll("#line")

  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  var height = 500
  var width = 800
  var padding = 100
  var linePadding = 10
  var marginTop = 200
  var xAxisLoc = height + marginTop

  var xScale = d3.scaleLinear()
      .domain([0,11]) // TODO
      .range([padding, width + 35]);
  var yScale = d3.scaleLinear()
      .domain([getDataMeansLineChart(data, foodname)[1] - linePadding,
            getDataMeansLineChart(data, foodname)[2] + linePadding])
      .range([height + marginTop, marginTop]);

  var lineScale = d3.line()
      .x(function(d, i) { return xScale(i); })
      .y(function(d) { return yScale(d); })

  // Update line with transition
  line.datum(getDataMeansLineChart(data, foodname)[0])
      .transition()
      .duration(1000)
      .attr("fill", "none")
      .attr("id", "line")
      .attr("stroke", "red")
      .attr("stroke-width", 6)
      .attr("d", function(d) {return lineScale(d); });

  // Update y-axis
  d3.selectAll("#linechart").selectAll(".y")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yScale).ticks(5))

  // Update title with foodname
  d3.selectAll("#linechartTitle")
              .transition()
              .text("Mean searching rates of " + foodname)

  // Update legend
  d3.selectAll(".legend").selectAll("text")
            .transition()
            .text(foodname)


}

function addComparison(data, foodnames) {

  var compareSelect = d3.selectAll("#comparediv")

  compareSelect.append("select")
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

  compareSelect.on('change', function(){
              var foodname = d3.select(this)
              .select("select")
              .property("value")
          updateLineChart(data, foodname, "True")})
}

function updateLegend(array) {

  var legendWidth = 30
  var colors = ["red", "gold"] // TODO

  var legend = d3.selectAll("#linechart").selectAll(".legend")
                  .data(array)
                  .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i)
                    { return "translate(0," + i * 100 + ")"; });

  var legendY = 760
  var legendX = 650

  // Append a rectangle for the legend
  legend.append("rect")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("width", legendWidth)
        .attr("height", legendWidth)
        .attr("fill", function(d, i) {return colors[i]} )

  legend.append("text")
        .attr("x", legendX + 50)
        .attr("y", legendY + 20)
        .attr("class", "legendtext")
        .text(function(d, i) {return array[i]})
}

function makeMiniLinecharts(data) {

  

}
