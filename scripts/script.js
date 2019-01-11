function onload() {

// Open file
fetch('data/result.json').then(response => {
  return response.json();
}).then(data => {

d3.select("#sunburstsvg")
  .append("text")
  .attr("id", "sunburstTitle")
  .text("frozen-yogurt")
    .attr("class", "datatext")
    .attr('y', 70)
    .attr('x', 390)

// d3.select("#datasvg")
//   .append("text")
//   .text("Title")
//   .attr("class", "datatext")
//   .attr('y', 50)
//   .attr('x', 20)

// Source: http://2ality.com/2013/11/initializing-arrays.html
function fillArrayWithNumbers(n) {
     var arr = Array.apply(null, Array(n));
     return arr.map(function (x, i) { return i }); // TODO
 }

 // TODO
  weeks = 52
  var yearsCount = 12
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
             "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"] // TODO
  monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Okt", "Nov", "Dec"]
  weeksArray = fillArrayWithNumbers(weeks)

  // Make an array of foodnames
  var foodnames = []
  for (var key in data) {

    // Skip header
    if (key != "id") {
      foodnames.push(key)
    }
  }

  // TODO: Deze functies samenvoegen en input aanpassen
 // Make an array of of datapoints of one year for a chosen food
 function getDataArray(food, year) {
   // Process data
   // console.log(data, food, year);
   // console.log(food, year);
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

 // Make an array of all data points of every year for a chosen food
 function getDataArrayYears(food) {
   // Process data
   var keys = data[food];
   array = []

   // Loop through every year
   for (var key in keys) {

     // Loop through every value of that year
     for (var i = 1; i < weeks + 1; i++) {
       array.push(keys[key][i])
     }
   }
   return array
 }

 function getDataMeans(food) {
   array = []
   for (var key in data[food]) {

     value = 0
     // Calculate total value per year
     for (var i = 1; i < weeks + 1; i++) {
       value += parseInt(data[food][key][i])
     }
     array.push([key, value]);
  }
  return array
 }

 function getDataMeansLineChart(food) {
   array = []

   for (var key in data[food]) {
     value = 0
     // Calculate total value per year
     for (var i = 1; i < weeks + 1; i++) {
       value += parseInt(data[food][key][i])
     }
     array.push(value / weeks);
  }
  return array
 }

// TODO
function makeBarcharts() {

// Open file
fetch('data/result.json').then(response => {
  return response.json();
}).then(data => {

var graphWidth = 280
var yPadding = 100
var xPadding = yPadding - 5
var barPadding = 8
var graphSpace = 200
var textLoc = 480

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


colors = ["#660066", "#990099", "#ff00ff", "#ff99ff"]
foods = ["pear", "asparagus", "beet", "pasta-salad"]
yearsSelected = ["2006", "2010", "2008", "2012"]

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
  bar.data(getDataArray(food, year))
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
        // .on("mouseover", function() { d3.select(this)})

  }fillBars(foods[j], yearsSelected[j], colors[j])

}

for (i = 100, j = 0; i < graphSpace * 4; i += graphSpace, j++) {
d3.selectAll("#datasvg")
  .append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(100," + i + ")")
  .call(d3.axisLeft(yScale).ticks(5));
}

var sliderAxis = d3.scalePoint()
    .domain(["2004 ", " | ", "2005", " |", " 2006 ", " | ", "2007 ", "|",
             " 2008 ",  "| ", " 2009",  " | ", " 2010 ",  " | ", " 2011 ",
               " | ", " 2012 ",  " | ", " 2013 ",  " | ", " 2014 ",  " | ", " 2015 ",
               " | ", " 2016 ",  " | ", " 2017 "])
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
					updateYear(bar);
				});

slider.append("g")
      .attr("class", "sliderAxis")
        // .attr("transform", "translate(100," + 10 + ")")
        .call(d3.axisBottom(sliderAxis))
        // .on("onchange", function(d) { console.log("etetste");})

drop = d3.selectAll("#sliderdiv")
        .append("div")
        .attr("class", "dropdown")

dropdown = d3.select("div")
// Add dropdown menu
dropdown.append("select")
        .selectAll("option")
        .attr("class", "dropdown")
        .attr("id", "dropdown")
        .data(foodnames) // TODO sort
        .enter()
          .append("option")
          .attr("class", "dropdown-content")
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
        updateSunburst(foodname)
        updateUnderBarChart(foodname)
        updateLineChart(foodname)})

}).catch(err => {
  // TODO
});
}makeBarcharts()

// Update bars with a transition when moving the slide bar
function updateYear(bar) {

  // Get year that is currently selected at the slide bar
  var year = years[document.getElementById("year").value];

  var graphWidth = 280
  var yPadding = 100
  var xPadding = yPadding - 5
  var barPadding = 8
  var graphSpace = 200
  var textLoc = 480

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

      console.log("#bar" + i);
      console.log(food, year);

      d3.selectAll("#bar" + i)
        .data(getDataArray(food, year))
        .transition()
        .duration(600)
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

  // return year
}

function getDataArray2(food, year) {

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

function makeUnderBarchart(foodname) {

  var barPadding = 10
  space = 600
  yPadding2 = 100
  xPadding2 = yPadding2 - 5

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

  bar.data(getDataArray2(foodname, "2012"))
          .attr("id", "underBarchartbars")
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("transform", "translate(0," + 1170 + ")")
          .attr("x", function(d) {
            return(xScale2(d[1]) + xPadding2)})
          .attr("y", function(d) {
            return(yScale2(d[0]) + yPadding2 + 100 - space)})
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
makeUnderBarchart("potato")

// TODO
function updateUnderBarChart(foodname) {
  var year = years[document.getElementById("year").value]; // TODO

  console.log(year);

  bars = d3.selectAll("#sunburstsvg").selectAll("rect")

  bars.data(getDataArray2(foodname, year))
      .transition()
      .duration(400)
      .attr("x", function(d) {
        return(xScale2(d[1]) + xPadding2)})
      .attr("y", function(d) {
        return(yScale2(d[0]) + yPadding2 + 100 - space)})
      .attr("width", 5)
      .attr("height", function(d) {
        return(d[0])
      })
      .ease(d3.easeBounceOut)

}


function makeSunburst(){

  test = getDataMeans("frozen-yogurt")
  test2 = getDataMeans("carrot")
  test3 = getDataMeans("pear")

  var width = 380;
  var height = 400;
  var radius = 270;
  var outerRadius = 210;
  var radius2 = 215
  var outerRadius2 = 190
  var radius3 = 190
  var outerRadius3 = 170
  var radiusBig = 350
  var outerRadiusBig = 420
  var radiusBig2 = 300
  var outerRadiusBig2 = 340
  var color = d3.scaleOrdinal(d3.schemeCategory20b);

  var sunburst = d3.select("#sunburstsvg")
    // .attr('width', window.innerWidth)
    // .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width + ',' + height + ')');

  var colors = d3.scaleOrdinal(d3.schemeBlues[5]) // TODO

  arc = d3.arc()
              .innerRadius(radius)
              .outerRadius(outerRadius);
  arc2 = d3.arc()
              .innerRadius(radius2)
              .outerRadius(outerRadius2);
  arc3 = d3.arc()
              .innerRadius(radius3)
              .outerRadius(outerRadius3);
  arc4 = d3.arc()
              .innerRadius(radiusBig)
              .outerRadius(outerRadiusBig);
  arc5 = d3.arc()
              .innerRadius(radiusBig2)
              .outerRadius(outerRadiusBig2);
  pie = d3.pie()
              .value(function(d, i) {return d[1]; })
              .sort(null);

  var arr = [test, test2, test3]
  var arrArc = [arc, arc2, arc3]
  for (var i = 0; i < 3; i++) {

    sunburst.selectAll("#sunburstsvg")
          .data(pie(arr[i]))
          .enter()
          .append('path')
          .attr("id", "sunburstpath")
          .attr('d', arrArc[i])
          .attr("fill", function(d,i) {
            return colors(i);
          })
          .attr("stroke", "darkgray")
          .attr("stroke-width", 6)
          .each(function(d) { this._current = d; })
          .on('mouseover', function(d) {
                d3.select(this).style('opacity', '0.4')
                  .style("cursor", "pointer");
            })
          .on('mouseout', function(d) {
                d3.select(this)
                .transition()
              .duration(250)
              .style('opacity', '1')
            })
  }

  sunburst.selectAll("#sunburstsvg")
        .data(pie(test))
        .enter()
        .append('path')
        .attr("id", "sunburstpathOpacity1")
        .attr('d', arc4)
        .attr("fill", function(d,i) {
          return colors(i);
        })
        .attr("opacity", 0.05)
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .each(function(d) { this._current = d; })

  sunburst.selectAll("#sunburstsvg")
        .data(pie(test))
        .enter()
        .append('path')
        .attr("id", "sunburstpathOpacity2")
        .attr('d', arc5)
        .attr("fill", function(d,i) {
          return colors(i);
        })
        .attr("opacity", 0.15)
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .each(function(d) { this._current = d; })

}makeSunburst()

function updateSunburst(food) {

  var sunburst = d3.selectAll("#sunburstsvg")

  var colors = d3.scaleOrdinal(d3.schemeBlues[5]) // TODO

  // Add new title
  sunburst.selectAll("#sunburstTitle")
          .remove()

  sunburst.selectAll("#sunburstpath")
          .data(pie(getDataMeans(food)))
          .transition()
          .duration(400)
          .attr("d", arc)
          .attr("fill", function(d,i) {
            return colors(i);
          })
          .each(function(d) { this._current = d; })

    sunburst.selectAll("#sunburstpathOpacity1")
            .data(pie(getDataMeans(food)))
            .transition()
            .duration(400)
            .attr("d", arc4)
            .attr("fill", function(d,i) {
              return colors(i);
            })
            .each(function(d) { this._current = d; })

    sunburst.selectAll("#sunburstpathOpacity2")
            .data(pie(getDataMeans(food)))
            .transition()
            .duration(400)
            .attr("d", arc5)
            .attr("fill", function(d,i) {
              return colors(i);
            })
            .each(function(d) { this._current = d; })

  sunburst.append("text")
          .attr("id", "sunburstTitle")
          .text(food)
            .attr("class", "datatext")
          .attr('y', 70)
          .attr('x', 390)

}


function makeLinechart(){

  var foodname = "hamburger"

  var linechart = d3.selectAll("#linechart")
  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]
  var height = 200
  var width = 800
  var padding = 100

  // Define range and domain for xScale and yScale
  var xScale = d3.scaleLinear()
      .domain([0,12]) // TODO
      .range([padding, width + padding]);
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
      .datum(getDataMeansLineChart(foodname))
      .attr("fill", "none")
      .attr("id", "line")
      .attr("stroke", colors[0])
      .attr("stroke-width", 6)
      .attr("opacity", 0.8)
      .attr("d", function(d) { return lineScale(d); });

  //Append legend to linechart
  linechart.append("text")
            .text("HIER KOMT EEN LEGENDA")
            .attr("class", "linechartTitle")
            .attr("x", 580)
            .attr("y", 700)

  // Append text and title to the linechart
  linechart.append("text")
          .text("Dit moet nog interactief worden met keuzes...")
          .attr("class", "linechartTitle")
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

}makeLinechart()

function updateLineChart(foodname) {

  var line = d3.selectAll("#linechart").selectAll("#line")

  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]
  var height = 200
  var width = 800
  var padding = 100
  var xScale = d3.scaleLinear()
      .domain([0,12]) // TODO
      .range([padding, width + padding]);
  var yScale = d3.scaleLinear()
      .domain([0,200]) // TODO
      .range([400,0]);

  var lineScale = d3.line()
      .x(function(d, i) { return xScale(i); })
      .y(function(d) { return yScale(d); });

  d3.selectAll("#linechart").append("path")
      .datum(getDataMeansLineChart(foodname))
      .transition()
      .attr("fill", "none")
      .attr("id", "line")
      .attr("stroke", colors[0])
      .attr("stroke-width", 6)
      .attr("opacity", 0.8)
      .attr("d", function(d) {return lineScale(d); });

}

}).catch(err => {
  // TODO
});

// TODO
// $('#section07').click(function(){ MyFunction(); return false; });
//
// function MyFunction() {
//   console.log("TESTTE");
//   window.scrollBy(0, 600);
// }





}
