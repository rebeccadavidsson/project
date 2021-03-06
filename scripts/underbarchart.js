/*
 * Make an interactive barchart of a specific food category.
 * Interactivity includes a tooltip that's linked to the sunburst.
 */
function makeUnderBarchart(data, foodname) {

  underBarchart = d3.select("#sunburstsvg")
  space = 600
  yPadding = 250
  xPadding = -5
  circleX = 740
  circleY = 960
  var tempYear = "2004"
  var barPadding = 9
  var bar = d3.select("#sunburstsvg").selectAll(".bar")

  xScale2 = d3.scaleLinear()
        .domain([0,weeks])
        .range([barPadding ,space + barPadding]);
  xAxis2 = d3.scalePoint()
        .domain(monthsArray)
        .range([0,space]);
  yScale2 = d3.scaleLinear()
        .domain([getDataArray2(data, foodname, tempYear)[1],
                 getDataArray2(data, foodname, tempYear)[2]])
        .range([100,5])

  // Add x- and y-axis
  underBarchart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(30," + 1020 + ")")
        .call(d3.axisBottom(xAxis2).tickSize(2));

  underBarchart.append("g")
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(30," + 920 + ")")
        .call(d3.axisLeft(yScale2).ticks(2));

  // Append bars with tooltip
  bar.data(getDataArray2(data, foodname, tempYear)[0])
          .attr("id", "underBarchartbars")
          .enter().append("rect")
            .attr("class", "bar")
            .attr("transform", "translate(30," + 1165 + ")")
            .attr("x", function(d, i) {return(xScale2(i) + xPadding)})
            .attr("y", function(d) {
return(yScale2(d[0]) + yPadding + 100 - space)})
            .attr("width", 10)
            .attr("height", function(d) {return d[0]})
            .attr("fill", "white")
            .on('mouseover', function(d) {
                  d3.select(this)
                      .style('opacity', 0.3)
                      .attr("cursor", "pointer")
                  tip.show(d);

                  // Highlight corresponding bar in sunburst
                  hoverBar(d, "mouseover", 0.1)
              })
            .on('mouseout', function(d) {
                  d3.select(this)
                  .transition()
                .duration(300)
                .style('opacity', '1')
                .attr("cursor", "default")
                tip.hide(d);

                // Go back to original color
                hoverBar(d, "mouseout", 1, "2s")
              });

      // Add circle with foodname
      barchartCircle(foodname)
}

/*
 * Append circle to barchart with year-text and foodname
 */
function barchartCircle(foodname) {

  // Append circle with with year-text
  underBarchart.append("circle")
              .attr("cx", circleX)
              .attr("cy", circleY)
              .attr("r", 70)
              .attr("fill", "silver");

  underBarchart.append("text")
          .text("2004")
          .attr("x", circleX)
          .attr("y", circleY + 20)
          .attr("class", "yearcircle")
          .attr("text-anchor", "middle")

  // Append foodname-text
  underBarchart.append("text")
          .text(foodname)
          .attr("x", circleX)
          .attr("y", circleY - 5)
          .attr("class", "foodnameBig")
          .attr("text-anchor", "middle")
          .style("font-size", "15px")

  // Make y-axis title
  underBarchart.append("text")
            .text("Total search count")
            .attr("transform", "translate(0,1000) rotate(270)")
            .attr("fill", "white")
            .style("font-size", "13px")
}

/*
 * Update the under-barchart with new data. Under-barchart gets
 * updated by the dropdown menu's or by clicking on food-names.
 * The update works with a transition.
 * Data will always be the same lenght, so no need to use exit().remove()
 */
function updateUnderBarChart(data, foodname, year) {

  // Update new yScale
  var yScale = d3.scaleLinear()
        .domain([getDataArray2(data, foodname, year)[1],
                 getDataArray2(data, foodname, year)[2]])
        .range([100,0])

  var sunburst = d3.selectAll("#sunburstsvg")
  var bars = d3.selectAll("#sunburstsvg").selectAll("rect")

  // Update bars
  bars.data(getDataArray2(data, foodname, year)[0])
      .transition()
      .duration(800)
      .attr("x", function(d, i) {
        return(xScale2(i) + xPadding)})
      .attr("y", function(d) {
        return(yScale2(d[0]) + yPadding + 100 - space)})
      .attr("height", function(d) {
        return(d[0])
      })
      .ease(d3.easeBounceOut)

    // Update y-axis
    sunburst.selectAll(".y")
          .transition()
          .duration(400)
          .call(d3.axisLeft(yScale).ticks(5));

    // Update year text
    sunburst.selectAll(".yearcircle, .foodnameBig").remove()

    // Append year
    sunburst.append("text")
            .text(year)
            .attr("x", circleX)
            .attr("y", circleY + 20)
            .attr("class", "yearcircle")
            .attr("text-anchor", "middle")

    // Append foodname
    sunburst.append("text")
            .text(foodname)
            .attr("x", circleX)
            .attr("y", circleY - 5)
            .attr("class", "foodnameBig")
            .attr("text-anchor", "middle")
            .style("font-size", "15px")

    // Remove years in mini barchart-circles
    var barchartcircleyear = d3.selectAll(".barchartcircleyear").remove()

}

/*
 * When a bar in the barchart gets hovered, highlight the
 * corresponding burst (in the sunburst) by selecting class names.
 */
function hoverBar(d, mouse, opacity) {

  // Calculate corresponding month
  if (d[1] == 52) {
    var month = 12
  }
  else {
    var month = Math.floor(d[1] / (4 + (1/3))) + 1
  }

  // Get classname from child and change opacity
  var y =  d3.select(".yearcircle").text() + "month"
  document.getElementsByClassName(y)[month - 1].style.opacity = opacity

  // Get classname from parent and change opacity
  var x =  "flare" + d3.select(".yearcircle").text()
  var xTarget  = document.getElementsByClassName(x)

  xTarget.item(0).style.opacity = opacity;

}
