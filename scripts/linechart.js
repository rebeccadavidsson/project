/*
 * Make the interactive linechart with tooltip for a specific food category.
 */
function makeLinechart(data, foodname){
  
  linechart = d3.selectAll("#linechart")
  years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  tempFoodname = "anise"
  var height = 500
  var width = 800
  var padding = 100
  var linePadding = 10
  var marginTop = 200
  tempFoodname = "anise"

  // Update the legend
  updateLegend(tempFoodname)

  // Define range and domain for yScale
  var yScale = d3.scaleLinear()
      .domain([getDataMeansLineChart(data, foodname)[1] - linePadding,
            getDataMeansLineChart(data, foodname)[2] + linePadding])
      .range([height + marginTop, marginTop]);

  // function to add gridlines
  function makeGridlines() {
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

  // Add lines to the graph
  var lineScale = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); });

  // Convert data to usable format
  dataset = []
  for (i = 0; i < 13; i++) {
    dataset.push({"year" : years[i], "value" : getDataMeansLineChart(data, foodname)[0][i]})
  }

  // Source: https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3
  svg = d3.select("#linechart"),
      margin = {top: 200, right: 0, bottom: 0, left: 100},
      height = 500,
      width = 800;

  // Convert years to date-format
  var parseTime = d3.timeParse("%Y")
      bisectDate = d3.bisector(function(d) { return d.year; }).left;

  // variables to make the x- and y-axis
  x = d3.scaleTime().range([0, width]);
  y = d3.scaleLinear().range([height, 0]);

  // Make a curved line
  var line = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.value); })
      .curve(d3.curveCardinal);

  g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Seperate x- and y-values
  dataset.forEach(function(d) {
    d.year = parseTime(d.year);
    d.value = +d.value;
  });

  // Define domain for x- and y-axis corresponding to dataset lenght and values
  x.domain(d3.extent(dataset, function(d) { return d.year; }));
  y.domain([d3.min(dataset, function(d) { return d.value; }) / 1.05,
            d3.max(dataset, function(d) { return d.value; }) * 1.05]);

  // Append x- and y-axis
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d); }))

  // Append the line
  g.append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line)

  // Append the focus line (line that appears when hovered over the linechart)
  focusLine()

  // Add titles
  linechartTitles()

}

/*
 * Update linechart to a specific food category.
 * Update works with a transition of the line and y-axis.
 */
function updateLineChart(data, foodname) {

  // Convert data to usable format
  dataset = []
  for (var i = 0; i < 13; i++) {
    dataset.push({"year" : years[i], "value" : getDataMeansLineChart(data, foodname)[0][i]})
  }

  // Make a new domains for the new dataset
  x.domain(d3.extent(dataset, function(d) { return d.year; }));
  y.domain([d3.min(dataset, function(d) { return d.value; }) / 1.05, d3.max(dataset, function(d) { return d.value; }) * 1.05]);

  var line = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.value); })
      .curve(d3.curveCardinal);

  // Add new data to the line
  var updateLine = d3.selectAll(".line").datum(dataset)

  updateLine.transition()
            .duration(1000)
            .attr("d", line);

  // Update y-axis
  d3.selectAll(".axis--y")
          .transition()
          .duration(600)
          .call(d3.axisLeft(y).ticks(6).tickFormat(function(d)
              { return parseInt(d); }))

  // Update title with foodname
  d3.selectAll("#linechartTitle")
              .transition()
              .text("Mean searching rates of " + foodname)

  // Update legend
  d3.selectAll(".legend").selectAll("text")
            .transition()
            .text(foodname)

}


/*
 * Add a dropdown to the linechart to choose a food category.
 * Dropdown causes a linechart, sunburst and barchart update.
 */
function linechartDropdown(data, foodnames) {

  var dropdownLinechart = initialDropdown(foodnames, "#comparediv")

  // Update linechart, sunburst and barchart on click
  dropdownLinechart.on('change', function(d){
              var foodname = d3.select(this)
              .select("select")
              .property("value")
              var year = d3.select(".yearcircle").text()
                updateLineChart(data, foodname)
                updateSunburst(data, foodname)
                updateUnderBarChart(data, foodname, year)
          })
}

/*
 * Adds a legend and updates it to a new food category.
 */
function updateLegend(foodname) {
  var legendWidth = 30
  var legendY = 760
  var legendX = 650

  var legend = d3.selectAll("#linechart").selectAll(".legend")
                  .data(foodname)
                  .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(0,0)");

  // Append a rectangle for the legend
  legend.append("rect")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("width", legendWidth)
        .attr("height", legendWidth)
        .attr("fill", "red")

  legend.append("text")
        .attr("x", legendX + 50)
        .attr("y", legendY + 20)
        .attr("class", "legendtext")
        .text(foodname)
}

/*
 * Add mini non-interactive linecharts of 4 specific food categories.
 * The mini linecharts cannot be updated.
 */
function makeMiniLinecharts(data) {

  var graphWidth = 400
  var yPadding = 100
  var xPadding = yPadding - 5
  var barPadding = 8
  var graphSpace = 200
  var textLoc = 1600
  var dataset = ["empanada", "quinoa", "cauliflower", "coffee"]
  var colors = ["darkgreen", "limegreen", "gold", "orange"]
  var minilinesvg = d3.select("#linechart")

  var xScale = d3.scaleLinear()
      .domain([0,12])
      .range([barPadding ,graphWidth + barPadding]);
  var xAxis = d3.scalePoint()
      .domain(years)
      .range([0,graphWidth]);
  var yScale = d3.scaleLinear()
      .domain([0,yPadding])
      .range([yPadding + 140,80]);

  var lineScale = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); });

  // For every foodname, add an x-axis and line.
  for (i = graphSpace + 90, j = 0, k = 50; i < 1000; i += graphSpace, j++, k += 200) {
    minilinesvg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(1100," + i + ")")
          .call(d3.axisBottom(xAxis));

    minilinesvg.append("path")
        .datum(getDataMeansLineChart(data, dataset[j])[0])
        .attr("fill", "none")
        .attr("class", "miniline")
        .attr("transform", "translate(1095," + k + ")")
        .attr("stroke", colors[j])
        .attr("stroke-width", 6)
        .attr("opacity", 0.8)
        .attr("d", function(d) { return lineScale(d); })

    // Add a circle with the foodname-title
    minilinesvg.append("circle")
            .attr("cx", textLoc)
            .attr("cy", i - 70)
            .attr("r", 55)
            .attr("fill", "darkgrey");

    minilinesvg.append("text")
          .text(dataset[j])
          .attr("class", "foodname")
          .attr("text-anchor", "middle")
          .attr("x", textLoc)
          .attr("y", i - 65)
  }

}

/*
 * Append text and title to the linechart
 */
function linechartTitles() {
  var xLoc = 1100
  var yLoc = 80
  var padding = 100
  var linechart = d3.selectAll("#linechart")

  // Append title to y-axis
  linechart.append("text")
            .text("Total search count")
            .attr("transform", "translate(60,340) rotate(270)")
            .attr("fill", "white")
            .style("font-size", "14px")

  linechart.append("text")
          .text("Mean searching rates of anise")
          .attr("class", "linechartTitle")
          .attr("id", "linechartTitle")
          .attr("x", padding)
          .attr("y", yLoc)

  linechart.append("text")
            .text("Line graph of the mean searching rate for a specific food \
                  category over the years 2004 - 2016.")
            .attr("class", "linechartTitle")
            .style("font-size", "14px")
            .attr("x", padding)
            .attr("y", 120)

  // Append line to seperate the two sections
  linechart.append("rect")
            .attr("fill", "grey")
            .attr("x", xLoc - 100)
            .attr("y", yLoc + 20)
            .attr("width", 2)
            .attr("height", 800)

  // Append title to example linecharts
  linechart.append("text")
            .text("Examples of line graphs")
            .attr("class", "linechartTitle")
            .attr("x", xLoc)
            .attr("y", yLoc)

  linechart.append("text")
            .text("Line graphs of the mean searching rates for 'empanada', \
                  'quinoa', 'cauliflower' ")
            .attr("class", "linechartTitle")
            .style("font-size", "14px")
            .attr("x", xLoc)
            .attr("y", yLoc + 40)

  linechart.append("text")
            .text("and 'coffee' over the years 2004 - 2016. ")
            .attr("class", "linechartTitle")
            .style("font-size", "14px")
            .attr("x", xLoc)
            .attr("y", yLoc + 60)
}

/*
 * Append the focus line (line that appears when hovered over the linechart)
 */
function focusLine() {
  var height = 500
  var width = 800

  focus = g.append("g")
      .attr("class", "focus")
      .style("display", "none");
  focus.append("line")
      .attr("class", "x-hover-line hover-line")
      .attr("y1", 0)
      .attr("y2", height);

  // Append circles and text for a datapoint
  focus.append("circle")
      .attr("r", 3.5);
  focus.append("text")
       .attr("x", -15)
     	.attr("dy", "-1.31em")
      .style("fill", "white");

  // Let focus line apear in the svg
  svg.append("rect")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);
}

/*
 * Traces a mousemove and changes the focus-line location to the mousemove.
 * Source: https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3
 */
function mousemove() {
  var x0 = x.invert(d3.mouse(this)[0]),
      i = bisectDate(dataset, x0, 1),
      d0 = dataset[i - 1],
      d1 = dataset[i],
      d = x0 - d0.year > d1.year - x0 ? d1 : d0;
  focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
  focus.select("text").text(function() { return Math.round(d.value * 100) / 100; });
  focus.select(".x-hover-line").attr("y2", 500 - y(d.value));
  focus.select(".y-hover-line").attr("x2", 800 + 800);
}
