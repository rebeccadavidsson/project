
function makeLinechart(data, foodname){

  var linechart = d3.selectAll("#linechart")
  years = ["2004", "2005", "2006", "2007", "2008", "2009",
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
  // linechart.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(" + padding + "," + xAxisLoc + ")")
  //     .attr("stroke-width", 3)
  //     .style("font-size", "15px")
  //     .call(d3.axisBottom(xAxis));
  //
  // linechart.append("g")
  //     .attr("id", "y")
  //     .attr("class", "y axis")
  //     .attr("transform", "translate(" + padding + "," + 0 + ")")
  //     .attr("stroke-width", 3)
  //     .style("font-size", "15px")
  //     .call(d3.axisLeft(yScale).ticks(5));

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
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); });


  // Append text and title to the linechart
  linechart.append("text")
          .text("Mean searching rates of anise")
          .attr("class", "linechartTitle")
          .attr("id", "linechartTitle")
          .attr("x", padding)
          .attr("y", 80)
  linechart.append("text")
            .text("Line graph of the mean searching rate for a specific food category over the years 2004 - 2016.")
            .attr("class", "linechartTitle")
            .style("font-size", "14px")
            .attr("x", padding)
            .attr("y", 120)

  linechart.append("rect")
            .attr("fill", "grey")
            .attr("x", 1000)
            .attr("y", 100)
            .attr("width", 2)
            .attr("height", 800)

  // Append title to example linecharts
  linechart.append("text")
            .text("Examples of line graphs")
            .attr("class", "linechartTitle")
            .attr("x", 1100)
            .attr("y", 80)

  linechart.append("text")
            .text("Line graphs of the mean searching rates for 'empanada', 'quinoa', 'cauliflower' ")
            .attr("class", "linechartTitle")
            .style("font-size", "14px")
            .attr("x", 1100)
            .attr("y", 120)

  linechart.append("text")
            .text("and 'coffee' over the years 2004 - 2016. ")
            .attr("class", "linechartTitle")
            .style("font-size", "14px")
            .attr("x", 1100)
            .attr("y", 140)

  // Add circles

  // var circles = linechart.selectAll(".circles")
  //   .data(getDataMeansLineChart(data, foodname)[0])
  //   .enter()
  //   .append("circle")
  //   .attr("class", "linecircle")
  //   .attr("r", 8)
  //   .attr("cx", function(d, i) {
  //       return xScale(i)
  //   })
  //   .attr("cy", function(d) {
  //       return yScale(d)
  //   })
  //   .attr("fill", "red");


    // Convert data to usable format
    var yearJson = []
    var weekJson = []


    yearJson = []
    for (var j = 0, i = 0; j < 13; j++, i++) {
      yearJson.push({"year" : years[i], "value" : getDataMeansLineChart(data, foodname)[0][i]})
    }

    dataset = yearJson
    // console.log(dataset);

    // function calcWeekValues() {
    //
    //   for (var j = 0, i = 0; j < 52; j++, i++) {
    //     i = i % 13
    //     console.log(i);
    //     // yearJson.push({"year" : years[i], "value" : getDataMeansLineChart(data, foodname)[0][i]})
    //     weekJson.push({"week": getDataArray(data, foodname, years[i])[j][1], "size": parseInt(getDataArray(data, foodname, years[i])[j][0])} );
    //   }
    // }

    function sunburstData() {
      testJson = []
      for (var j = 0, i = 0; j < 13; j++, i++) {
        testJson.push({"name" : years[i], "children" : getArray(years[i])})
      }


      function getArray(year) {
        var tempArr = []
        for (var j = 0; j < 52; j++) {
          dataArray = getDataArray(data, foodname, year)
          tempArr.push({"name" : dataArray[j][1], "size" :  parseInt(dataArray[j][0])})
        }
        return tempArr
      }
      return (testJson);
    }
    // console.log(sunburstData());









    // Source: https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3
    svg = d3.select("#linechart"),
        margin = {top: 200, right: 0, bottom: 0, left: 100},
        width = 900 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;



    var parseTime = d3.timeParse("%Y")
        bisectDate = d3.bisector(function(d) { return d.year; }).left;

    x = d3.scaleTime().range([0, width]);
    y = d3.scaleLinear().range([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.value); })
        .curve(d3.curveCardinal);

    g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        dataset.forEach(function(d) {
          d.year = parseTime(d.year);
          d.value = +d.value;
        });

        x.domain(d3.extent(dataset, function(d) { return d.year; }));
        y.domain([d3.min(dataset, function(d) { return d.value; }) / 1.05, d3.max(dataset, function(d) { return d.value; }) * 1.05]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            // .attr("id", )
            .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d); }))
          // .append("text")
          //   .attr("class", "axis-title")
          //   .attr("transform", "rotate(-90)")
          //   .attr("y", 6)
          //   .attr("dy", ".71em")
          //   .style("text-anchor", "end")
          //   .attr("fill", "#5D6971");

        g.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line)
            // .style("stroke", "url(#areaGradient)")
            // .attr('d', p => newline(p))

        focus = g.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height);

        focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", 2000)
            .attr("x2", width);

        focus.append("circle")
            .attr("r", 3.5);

        focus.append("text")
           .attr("x", -15)
         	.attr("dy", "-1.31em")
          .style("fill", "white");

        svg.append("rect")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

}

function updateLineChart(data, foodname, comparison) {

  svg = d3.select("#linechart"),
      margin = {top: 200, right: 0, bottom: 0, left: 100},
      width = 900 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  var json = []
  for (var i = 0; i < 13; i++) {
    json.push({"year" : years[i], "value" : getDataMeansLineChart(data, foodname)[0][i]})
  }
  dataset = json

  var line = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.value); })
      .curve(d3.curveCardinal);
  x.domain(d3.extent(dataset, function(d) { return d.year; }));
  y.domain([d3.min(dataset, function(d) { return d.value; }) / 1.05, d3.max(dataset, function(d) { return d.value; }) * 1.05]);


  var updateLine = d3.selectAll(".line").datum(dataset)

  updateLine.transition()
            .duration(1000)
            .attr("d", line);

  svg.append("rect")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  // Update y-axis
  d3.selectAll(".axis--y")
    .transition()
    .duration(400)
    .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d); }))


  var line = d3.selectAll("#linechart").selectAll("#line")


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

  // Update circles
  var circles = d3.selectAll("#linechart").selectAll(".linecircle")
    .data(getDataMeansLineChart(data, foodname)[0])
    .transition()
    .duration(1000)
    .attr("cx", function(d, i) {
        return xScale(i)
    })
    .attr("cy", function(d) {
        return yScale(d)
    })



}

function addComparison(data, foodnames) {

  var compareSelect = d3.selectAll("#comparediv")

  compareSelect.append("select")
          .selectAll("option")
          .data(foodnames) // TODO sort
          .enter()
            .append("option")
            .property("selected", function(d){ return d === "-"; })
            .attr("value", function(d){
                return d;
            })
            .text(function(d){

              // Disable first option
              if (d === "-") {
                d3.select(this).property("disabled", true)
              }
                return d;
            });

  compareSelect.on('change', function(d){
              var foodname = d3.select(this)
              .select("select")
              .property("value")

              var year = d3.select(".yearcircle").text()

              updateLineChart(data, foodname, "True")
              updateSunburst(data, foodname)
              updateUnderBarChart(data, foodname, year)
          })
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

  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
  var graphWidth = 400
  var yPadding = 100
  var xPadding = yPadding - 5
  var barPadding = 8
  var graphSpace = 200
  var textLoc = 1600

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

  var dataset = ["empanada", "quinoa", "cauliflower", "coffee"] // TODO
  var colors = ["darkgreen", "limegreen", "gold", "orange"] // TODO


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

    var circle = minilinesvg.append("circle")
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
// Source: https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3
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
