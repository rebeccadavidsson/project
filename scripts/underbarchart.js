function makeUnderBarchart(data, foodname) {

  var barPadding = 10
  var space = 600
  yPadding = 100
  xPadding = yPadding - 5

  var bar = d3.selectAll("#sunburstsvg").selectAll(".bar")

  xScale2 = d3.scaleLinear()
        .domain([0,weeks])
        .range([barPadding ,space + barPadding]);
  xAxis2 = d3.scalePoint()
        .domain(monthsArray)
        .range([0,space]);
  yScale2 = d3.scaleLinear()
        .domain([0,100])
        .range([100,0])

  underBarchart = d3.selectAll("#sunburstsvg")

  // Add x- and y-axis
  underBarchart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(100," + 870 + ")")
        .call(d3.axisBottom(xAxis2));

  underBarchart.append("g")
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(100," + 770 + ")")
        .call(d3.axisLeft(yScale2).ticks(5));

  bar.data(getDataArray2(data, foodname, "2012"))
          .attr("id", "underBarchartbars")
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("transform", "translate(0," + 1170 + ")")
          .attr("x", function(d) {
            return(xScale2(d[1]) + xPadding)})
          .attr("y", function(d) {
            return(yScale2(d[0]) + yPadding + 100 - space)})
          .attr("width", 4)
          .attr("height", function(d) {
            return(d[0])
          })
          .attr("fill", "white")
          .on('mouseover', function(d) {
                d3.select(this).style('opacity', '0.4');
            })
          .on('mouseout', function(d) {
                d3.select(this)
                .transition()
              .duration(250)
              .style('opacity', '1')
            });

}

// TODO
function updateUnderBarChart(data, foodname) {
  var year = years[document.getElementById("year").value]; // TODO
  var space = 600

  bars = d3.selectAll("#sunburstsvg").selectAll("rect")

  bars.data(getDataArray2(data, foodname, year))
      .transition()
      .duration(400)
      .attr("x", function(d) {
        return(xScale2(d[1]) + xPadding)})
      .attr("y", function(d) {
        return(yScale2(d[0]) + yPadding + 100 - space)})
      .attr("width", 5)
      .attr("height", function(d) {
        return(d[0])
      })
      .ease(d3.easeBounceOut)

}

// TODO
function getDataArray2(data, food, year) {

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
