/*
 * Make an interactive barchart of a specific food category.
 */
function makeUnderBarchart(data, foodname) {

  var barPadding = 9
  var space = 600
  yPadding = 230
  xPadding = -5

  var bar = d3.select("#sunburstsvg").selectAll(".bar") // TODO

  xScale2 = d3.scaleLinear()
        .domain([0,weeks])
        .range([barPadding ,space + barPadding]);
  xAxis2 = d3.scalePoint()
        .domain(monthsArray)
        .range([0,space]);

  var tempYear = "2004"

  yScale2 = d3.scaleLinear()
        .domain([getDataArray2(data, foodname, tempYear)[1],
                 getDataArray2(data, foodname, tempYear)[2]])
        .range([100,5])

  underBarchart = d3.select("#sunburstsvg")

  // Add x- and y-axis
  underBarchart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(30," + 1000 + ")")
        .call(d3.axisBottom(xAxis2).tickSize(2));

  underBarchart.append("g")
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(30," + 900 + ")")
        .call(d3.axisLeft(yScale2).ticks(2));

  // Make y-axis title
  underBarchart.append("text")
            .text("Total search count")
            .attr("transform", "translate(0,1000) rotate(270)")
            .attr("fill", "white")
            .style("font-size", "13px")

  bar.data(getDataArray2(data, foodname, tempYear)[0])
          .attr("id", "underBarchartbars")
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("transform", "translate(30," + 1165 + ")")
          .attr("x", function(d) {
            return(xScale2(d[1]) + xPadding)})
          .attr("y", function(d) {
            return(yScale2(d[0]) + yPadding + 100 - space)})
          .attr("width", 8)
          .attr("height", function(d) {
            return d[0]
          })
          .attr("fill", "white")
          .on('mouseover', function(d) {
                d3.select(this)
                    .style('opacity', 0.3)
                    .attr("cursor", "pointer")
                tip.show(d);

                // Calculate corresponding month
                if (d[1] == 0) {
                  var month = 1
                }
                else {
                  var month = Math.floor(d[1] / (4 + (1/3))) + 1
                }

                // Get classname from child and change opacity
                var y =  d3.select(".yearcircle").text() + "month"
                document.getElementsByClassName(y)[month - 1].style.opacity = 0.1
                document.getElementsByClassName(y)[month - 1].style.transition = "0s";

                // Get classname from parent and change opacity
                var x =  "flare" + d3.select(".yearcircle").text()
                var xTarget  = document.getElementsByClassName(x)
                xTarget.item(0).style.opacity = 0.1
                xTarget.item(0).style.transition = "0s";
            })
          .on('mouseout', function(d) {
                d3.select(this)
                .transition()
              .duration(250)
              .style('opacity', '1')
              .attr("cursor", "default")
              tip.hide(d);

              // Calculate corresponding month
              if (d[1] == 0) {
                var month = 1
              }
              else {
                var month = Math.floor(d[1] / (4 + (1/3))) + 1
              }

              // Get classname from child and change opacity
              var y =  d3.select(".yearcircle").text() + "month"
              document.getElementsByClassName(y)[month - 1].style.opacity = 1
              document.getElementsByClassName(y)[month - 1].style.transition = "2s"

              // Get classname from parent and change opacity
              var x =  "flare" + d3.select(".yearcircle").text()
              var xTarget  = document.getElementsByClassName(x)
              xTarget.item(0).style.transition = "2s";
              xTarget.item(0).style.opacity = 1

            });

    circleX = 740
    circleY = 960

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

}

// TODO
function updateUnderBarChart(data, foodname, year) {
  var space = 600

  // Update new yScale
  var yScale = d3.scaleLinear()
        .domain([getDataArray2(data, foodname, year)[1],
                 getDataArray2(data, foodname, year)[2]])
        .range([100,0])

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
      .call(d3.axisLeft(yScale).ticks(5));

    // var circleX = 740
    // var circleY = 870

    // Update year text
    d3.selectAll("#sunburstsvg").selectAll(".yearcircle, .foodnameBig").remove()

    // Append year
    d3.select("#sunburstsvg").append("text")
            .text(year)
            .attr("x", circleX)
            .attr("y", circleY + 20)
            .attr("class", "yearcircle")
            .attr("text-anchor", "middle")

    // Append foodname
    d3.select("#sunburstsvg").append("text")
            .text(foodname)
            .attr("x", circleX)
            .attr("y", circleY - 5)
            .attr("class", "foodnameBig")
            .attr("text-anchor", "middle")
            .style("font-size", "15px")




    // Remove years in mini barchart-circles
    var barchartcircleyear = d3.selectAll(".barchartcircleyear").remove()

}

function updateUnderBarChartName(foodname) {
  d3.selectAll(".foodnameBig").remove()
}



// TODO
function getDataArray2(data, food, year) {

  var keys = data[food][year];
  array = []
  arr2 = []
  for (var key in keys) {
    array.push([keys[key]]);
    arr2.push(keys[key])
    if (keys[key] == "undefined") {
      console.log("ERROOOOR");
    }
  }

  // Fill in the week-numbers
  for (var i = 0; i < weeks; i++) {
    array[i].push(weeksArray[i])
  }

  return [array, Math.min.apply(null,arr2), Math.max.apply(null,arr2)]
}
