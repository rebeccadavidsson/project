function makeUnderBarchart(data, foodname) {

  var barPadding = 10
  var space = 600
  yPadding = 100
  xPadding = -5

  var bar = d3.selectAll("#sunburstsvg").selectAll(".bar")

  xScale2 = d3.scaleLinear()
        .domain([0,weeks])
        .range([barPadding ,space + barPadding]);
  xAxis2 = d3.scalePoint()
        .domain(monthsArray)
        .range([0,space]);

  var tempYear = "2004"

  var yScale2 = d3.scaleLinear()
        .domain([getDataArray2(data, foodname, tempYear)[1],
                 getDataArray2(data, foodname, tempYear)[2]])
        .range([getDataArray2(data, foodname, tempYear)[2],0])

  underBarchart = d3.selectAll("#sunburstsvg")

  // Add x- and y-axis
  underBarchart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 870 + ")")
        .call(d3.axisBottom(xAxis2));

  underBarchart.append("g")
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + 780 + ")")
        .call(d3.axisLeft(yScale2).ticks(5));

  bar.data(getDataArray2(data, foodname, tempYear)[0])
          .attr("id", "underBarchartbars")
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("transform", "translate(0," + 1165 + ")")
          .attr("x", function(d) {
            return(xScale2(d[1]) + xPadding)})
          .attr("y", function(d) {
            return(yScale2(d[0]) + yPadding + 100 - space)})
          .attr("width", 6)
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

    var circleX = 700
    var circleY = 820

    // Append circle with with year-text
    var circle = underBarchart.append("circle")
                .attr("cx", circleX)
                .attr("cy", circleY)
                .attr("r", 50)
                .attr("fill", "silver");

    underBarchart.append("text")
            .text("2004")
            .attr("x", circleX)
            .attr("y", circleY + 5)
            .attr("id", "yearcircle")
            .attr("class", "foodname")
            .attr("text-anchor", "middle")

}

// TODO
function updateUnderBarChart(data, foodname, year) {
  // var year = years[document.getElementById("year").value]; // TODO
  var space = 600
  //
  // var yScale2 = d3.scaleLinear()
  //       .domain([getDataArray2(data, foodname, year)[1],
  //                getDataArray2(data, foodname, year)[2]])
  //       .range([getDataArray2(data, foodname, year)[2],0])

  bars = d3.selectAll("#sunburstsvg").selectAll("rect")

  bars.data(getDataArray2(data, foodname, year)[0])
      .transition()
      .duration(400)
      .attr("x", function(d) {
        return(xScale2(d[1]) + xPadding)})
      .attr("y", function(d) {
        return(yScale2(d[0]) + yPadding + 100 - space)})
      .attr("height", function(d) {
        return(d[0])
      })
      .ease(d3.easeBounceOut)

    // Update y-axis
    d3.selectAll("#sunburstsvg").selectAll(".y")
      .transition()
      .duration(400)
      .call(d3.axisLeft(yScale2).ticks(5));

    var circleX = 700
    var circleY = 820

    // Update year text
    d3.selectAll("#sunburstsvg").selectAll("#yearcircle").remove()

    d3.selectAll("#sunburstsvg").append("text")
            .text(year)
            .attr("x", circleX)
            .attr("y", circleY + 5)
            .attr("id", "yearcircle")
            .attr("class", "foodname")
            .attr("text-anchor", "middle")

}

// TODO
function getDataArray2(data, food, year) {

  var keys = data[food][year];
  array = []
  arr2 = []
  for (var key in keys) {
    array.push([keys[key]]);
    arr2.push(keys[key])
  }

  // Fill in the week-numbers
  for (var i = 0; i < weeks; i++) {
    array[i].push(weeksArray[i])
  }

  return [array, Math.min.apply(null,arr2), Math.max.apply(null,arr2)]
}
