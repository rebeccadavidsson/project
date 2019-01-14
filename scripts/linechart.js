
function makeLinechart(data, foodname){

  var linechart = d3.selectAll("#linechart")
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  var height = 200
  var width = 800
  var padding = 100

  // Define range and domain for xScale and yScale
  var xScale = d3.scaleLinear()
      .domain([0,11]) // TODO
      .range([padding, width + 35]);
  var xAxis = d3.scalePoint()
      .domain(years)
      .range([0,width]);
  var yScale = d3.scaleLinear()
      .domain([0,200]) // TODO
      .range([400,0]);

  // Append axis to linechart
  linechart.append("g")
      .attr("class", "axisBar")
      .attr("transform", "translate(" + padding + "," + 600 + ")")
      .call(d3.axisBottom(xAxis));

  linechart.append("g")
      .attr("class", "axisBar")
      .attr("transform", "translate(" + padding + "," + 200 + ")")
      .call(d3.axisLeft(yScale).ticks(5));

  // function to add gridlines
  function makeGridlines() { // TODO: deze functie hier onderin zetten
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

  // Add lines to the graph
  var lineScale = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); });

  // Append a path for each line
  linechart.append("path")
      .datum(getDataMeansLineChart(data, foodname))
      .attr("fill", "none")
      .attr("id", "line")
      .attr("stroke", colors[0])
      .attr("stroke-width", 6)
      .attr("opacity", 0.8)
      .attr("d", function(d) { return lineScale(d); });

  // Append text and title to the linechart
  linechart.append("text")
          .text("Mean searching rates of frozen-yogurt")
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
}

function updateLineChart(data, foodname, comparison) {

  var line = d3.selectAll("#linechart").selectAll("#line")

  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  var height = 200
  var width = 800
  var padding = 100
  var xScale = d3.scaleLinear()
      .domain([0,11]) // TODO
      .range([padding, width + 35]);
  var yScale = d3.scaleLinear()
      .domain([0,200]) // TODO
      .range([400,0]);

  var lineScale = d3.line()
      .x(function(d, i) { return xScale(i); })
      .y(function(d) { return yScale(d); });

  var colors = ["red", "limegreen", "gold"]

  d3.selectAll("#linechart").selectAll("#line").attr("opacity", 0.5)

  if (comparison === "True") {
    d3.selectAll("#linechart")
        .append("path")
        .datum(getDataMeansLineChart(data, foodname))
        .attr("fill", "none")
        .attr("id", "line2")
        .attr("stroke", colors[2])
        .attr("stroke-width", 6)
        .attr("opacity", 0.8)
        .attr("d", function(d) {return lineScale(d); });
  }

  if (comparison === "False") {
  line.datum(getDataMeansLineChart(data, foodname))
      .transition()
      .duration(700)
      .attr("fill", "none")
      .attr("id", "line")
      .attr("stroke", colors[2])
      .attr("stroke-width", 6)
      .attr("opacity", 0.8)
      .attr("d", function(d) {return lineScale(d); });

  }

  // Update title with foodname
  d3.selectAll("#linechartTitle")
              .transition()
              .text("Mean searching rates of " + foodname)


}
