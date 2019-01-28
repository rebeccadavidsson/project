/*
 * Make the interactive mini barcharts. Input is all data and all foodnames.
 */
function makeBarcharts(data, foodnames) {

  graphWidth = 280
  barPadding = 8
  graphSpace = 200
  textLoc = 480
  var yPadding = 100
  var xPadding = yPadding - 5
  colors = ["#660066", "#990099", "#ff00ff", "#ff99ff"]
  foods = ["easter-egg", "apricot", "blueberry", "strawberry"]
  yearsSelected = ["2004", "2004", "2004", "2004"]
  var datasvg = d3.select("#datasvg")
  var bar = datasvg.selectAll(".bar")
  var monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Okt", "Nov", "Dec", ""]

  // Define range and domain for xScale and yScale
  xScale = d3.scaleLinear()
      .domain([0, weeks])
      .range([barPadding ,graphWidth + barPadding]);
  yScale = d3.scaleLinear()
      .domain([0, yPadding])
      .range([yPadding, 0]);
  var xAxis = d3.scalePoint()
      .domain(monthsArray)
      .range([0, graphWidth]);

  // Add tooltip that shows one datapoint.
  tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-5, 0])
              .html(function(d, i) {
                return "<span>" + "Week " + d[1] + "<br></span>"  +
                        "<span class='details'>" + "<strong> "+ "Rate: "
                        + d[0] + "</strong>" + "<br></span>" ;
              })
  datasvg.call(tip);
  d3.selectAll("#storysvg").call(tip)
  d3.select("#sunburstsvg").call(tip)

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
        .attr("x", function(d, i) {
          return(xScale(i) + xPadding)})
        .attr("y", function(d) {
          return(yScale(d[0]) + yPadding + i - graphSpace)})
        .attr("width", 3.5)
        .attr("height", function(d) {
          return(d[0])
        })
        .attr("fill", color)
        .on('mouseover', function(d) {
              d3.select(this)
              .style('opacity', '0.4')
              tip.show(d)
          })
        .on('mouseout', function(d) {
              d3.select(this)
              .transition()
            .duration(250)
            .style('opacity', '1')
            tip.hide(d)
          })

      // Add circles for food name
      var circle = datasvg.append("circle")
                  .attr("cx", textLoc)
                  .attr("cy", i - weeks)
                  .attr("r", 55)
                  .attr("fill", "lightgrey")
                  .attr("id", j);
      circle.on('mouseover', function(d) {
            d3.select(this)
            .style('opacity', 0.3)
            .style("cursor", "pointer")
        })
          .on('mouseout', function(d) {
                d3.select(this)
                .transition()
              .duration(250)
              .style('opacity', 1)
            })
          .on("mousedown", function(d) {
            var x = d3.select(this).attr('id')
            var year = d3.select(".yearcircle").text()
            updateSunburst(data, foods[x])
            updateUnderBarChart(data, foods[x], year)
            updateLineChart(data, foods[x])}
          );

      datasvg.append("text")
            .text(foods[j])
            .attr("pointer-events", "none")
            .attr("class", "foodname")
            .attr("text-anchor", "middle")
            .attr("x", textLoc)
            .attr("y", i - 50)

    }fillBars(foods[j], yearsSelected[j], colors[j])
  }

  /*
   * Add a dropdown including all foodnames as options
   */
  function addDropdown() {

    var dropdown = d3.select("#dropdowndiv")
            .attr("id", "dropdown") // TODO

    // Add dropdown menu
    dropdown.append("select")
            .attr("id", "select")
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

    // Update function on dropdown selection
    dropdown.on('change', function(){
                var temp = document.getElementById('select');
                var foodname = temp.options[temp.selectedIndex].value
                var year = d3.selectAll(".yearcircle").text()
                updateSunburst(data, foodname)
                updateUnderBarChart(data, foodname, year)
                updateLineChart(data, foodname)})
  }addDropdown()
  addSlider(data)
}

/*
 * Add an interactive slider that updates all the barcharts corresponding to
 * the selected year.
 */
function addSlider(data) {

    var dataTime = d3.range(0, 13).map(function(d) {
      return new Date(2005 + d, 0, 0);
    });

    // When dragging the slider, update displayed year and underBarchart
    var sliderTime = d3
      .sliderBottom()
      .min(d3.min(dataTime))
      .max(d3.max(dataTime))
      .step(1000 * 60 * 60 * 24 * 365)
      .width(600)
      .tickFormat(d3.timeFormat('%Y'))
      .tickValues(dataTime)
      .default(new Date(2004, 0, 0))
      .on('onchange', val => {
        d3.select('p#value-time')
        var year = d3.timeFormat('%Y')(val)
        var foodname = d3.selectAll("#sunburstTitle").text()
        updateYear(data, year)
        updateUnderBarChart(data, foodname, year)
      });

    // Add a slider
    var gTime = d3.select('#sunburstsvg')
                .append('g')
                .attr("id", "slider")
                .style("stroke-width", "2px")
                .attr("class", "axis-slider")
                .attr('transform', 'translate(20,1080)');

    gTime.call(sliderTime);
}

/*
 * Update the years on the bar charts;
 * Input is new data and the year to update.
 */
function updateYear(data, year) {

  var yPadding = 100
  var xPadding = yPadding - 5
  var colors = ["#660066", "#990099", "#ff00ff", "#ff99ff"]

  // Update all the 4 barcharts
  for (i = graphSpace, j = 0; i < 1000; i += graphSpace, j++) {

    // Fill in the barchart with rectangles
    function fillBars(food, year, color){

      d3.selectAll("#bar" + i)
        .data(getDataArray2(data, food, year)[0])
        .transition()
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr("x", function(d, i) {
          return(xScale(i) + xPadding)})
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

/*
 * Create a few bar charts with tooltip.
 */
function exploreBarCharts(data) {

  var yPadding = 100
  var barPadding = 2
  var textLoc = 400
  var monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Okt", "Nov", "Dec", ""]

  // Define new range and domain for xScale and yScale
  var xScale = d3.scaleLinear()
      .domain([0,weeks])
      .range([barPadding ,graphWidth + barPadding]);
  var xAxis = d3.scalePoint()
      .domain(monthsArray)
      .range([0,graphWidth]);

  var colors = ["#660066", "#990099", "#ff00ff", "#ff99ff", "#E26A00",
                "#ff7700", "#ffb266", "#ffcc99"]
  var foods = ["soup", "pumpkin", "strawberry", "iced-tea", "watermelon",
              "cucumber", "peppermint", "hot-chocolate"]
  var yearsSelected = ["2010", "2016", "2005", "2010", "2016", "2012", "2016", "2016"]

  var datasvg = d3.select("#storysvg")
  var bar = datasvg.selectAll(".bar")

  // Make 8 barcharts; loop through every x and y position
  for (var h = 200, j = 0; h < 1400;  h += 700) {
    for (var i = 900; i < 1600; i += graphSpace, j++) {

      // Append x-axis for every position
      datasvg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + h + "," + i + ")")
            .call(d3.axisBottom(xAxis));

        // Fill in the barchart with rectangles
        function fillBars(food, year, color){
          bar.data(getDataArray(data, food, year))
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("id", "bar" + h)
            .attr("x", function(d, i) {
              return(xScale(i) + h)})
            .attr("y", function(d) {
              return(yScale(d[0]) + yPadding + i - graphSpace)})
            .attr("width", 3.5)
            .attr("height", function(d) {
              return(d[0])
            })
            .attr("fill", color)
            .on('mouseover', function(d) {
                  d3.select(this).style('opacity', '0.4')
                  tip.show(d)
              })
            .on('mouseout', function(d) {
                  d3.select(this)
                  .transition()
                .duration(250)
                .style('opacity', '1')
                tip.hide(d)
              })

            // Add circles for food name
            var circle = datasvg.append("circle")
                        .attr("cx", textLoc + h)
                        .attr("cy", i - 52)
                        .attr("r", 57)
                        .attr("fill", "lightgrey");

            datasvg.append("text")
                  .text(foods[j])
                  .attr("class", "foodname")
                  .attr("text-anchor", "middle")
                  .attr("x", textLoc + h)
                  .attr("y", i - 55)

            datasvg.append("text")
                  .text(yearsSelected[j])
                  .style("font-size", "10px")
                  .attr("text-anchor", "middle")
                  .attr("x", textLoc + h)
                  .attr("y", i - 30)

        }fillBars(foods[j], yearsSelected[j], colors[j])
      }
    }
}

/*
 * Create an array of [week, rate] for every datapoint in a year.
 */
function getDataArray(data, food, year) {

  // Process data
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
// TODO
