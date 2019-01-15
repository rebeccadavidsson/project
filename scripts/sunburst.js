
function makeSunburst(data){

  var set1 = getDataMeans(data, "frozen-yogurt")[0]
  var set2 = getDataMninBars(data, "carrot")[0]
  var width = 380;
  var height = 400;
  var radius = 160;
  var outerRadius = 260;
  var radiusBig = 350
  var outerRadiusBig = 430
  var radiusBig2 = 260
  var outerRadiusBig2 = 350
  var yearsArray = ["2004", "2005", "2006", "2007", "2008", "2009",
                    "2010", "2011", "2012", "2013", "2014", "2015", "2016"]

  var sunburst = d3.select("#sunburstsvg")
    .append('g')
    .attr('transform', 'translate(' + width + ',' + height + ')');


  var colors = d3.scaleSequential(d3.interpolateBlues)
                  .domain([0,3000])
  var colorsBlue = d3.scaleSequential(d3.interpolateBlues)
                  .domain([0,30])

  arc = d3.arc()
              .innerRadius(radius)
              .outerRadius(outerRadius);
  var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(outerRadius - 40);
  arc4 = d3.arc()
              .innerRadius(radiusBig)
              .outerRadius(outerRadiusBig);
  arc5 = d3.arc()
              .innerRadius(radiusBig2)
              .outerRadius(outerRadiusBig2);
  pie = d3.pie()
              .value(function(d, i) {return d; })
              .sort(null);

  // Add variable to show tooltip when user hovers over sunburst's arc
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-5, 0])
              .html(function(d) {
                return "<strong> Year: </strong><span class='details'>" + yearsArray[d.index] + "<br></span>" + "<strong>Total search count: </strong><span class='details'>" + d.data  +"</span>";
              })

  sunburst.call(tip);
  // console.log("jjjjj");


  sunburst.selectAll("#sunburstsvg")
        .data(pie(set1))
        .enter()
        .append('path')
        .attr("id", "sunburstpath")
        .attr('d', arc)
        .attr("fill", function(d,i) {
          return colors(d.data);
        })
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .each(function(d) { this._current = d; })
        .on('mouseover', function(d) {
            tip.show(d);
              d3.select(this).style('opacity', '0.4')
                .style("cursor", "pointer");
          })
        .on('mouseout', function(d) {
              tip.hide(d);
              d3.select(this)
              .transition()
            .duration(250)
            .style('opacity', '1')
          })
        .on("mousedown", function() {
              var year = d3.select(this);
              clickedSunburst(data, year)
            });


  // Make outer ring
  sunburst.selectAll("#sunburstsvg")
        .data(pie(set1))
        .enter()
        .append('path')
        .attr("id", "sunburstpathOpacity1")
        .attr('d', arc4)
        .attr("fill", function(d,i) {
          return colors(d.data);
        })
        .attr("opacity", 0.1)
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .each(function(d) { this._current = d; })
        .on('mouseover', function(d) {
              d3.select(this).style('opacity', 0.05)
          })
        .on('mouseout', function(d) {
              d3.select(this)
              .transition()
            .duration(250)
            .style('opacity', 0.1)
          })

  // Make middle ring with mini data
  sunburst.selectAll("#sunburstsvg")
        .data(pie(set2))
        .enter()
        .append('path')
        .attr("id", "sunburstpathOpacity2")
        .attr('d', arc5)
        .attr("fill", function(d,i) {
          return colorsBlue(d.data); // TODO
        })
        .attr("opacity", 0.7)
        .attr("stroke", "darkgray")
        .attr("stroke-width", 1)
        .each(function(d) { this._current = d; })
        .on('mouseover', function(d) {
              d3.select(this).style('opacity', 0.5)
          })
        .on('mouseout', function(d) {
              d3.select(this)
              .transition()
            .duration(250)
            .style('opacity', 0.7)
          })

  // Append sunburst title
  d3.select("#sunburstsvg")
    .append("text")
    .attr("id", "sunburstTitle")
    .text("frozen-yogurt")
      .attr("class", "datatext")
      .attr("text-anchor", "middle")
      .attr('y', 400)
      .attr('x', 390)

}

function makeSunburstWelcome(data, foodnames){

// set a variable to automatically update the sunburst
// var inter = setInterval(function() {
//               updateWelcome(data, "lasagna");
//               setInterval(function() {
//               updateWelcome(data, "pineapple");
//               setInterval(function() {
//               updateWelcome(data, "spinach");
//               setInterval(function() {
//               updateWelcome(data, "apricot");
//                 }, 5000)
//             }, 5000)
//         }, 5000)
//     }, 5000);

  var set1 = getDataMeans(data, "frozen-yogurt")[0]
  var set2 = getDataMninBars(data, "pie")[0]

  var width = 700;
  var height = 470;
  var radius = 160;
  var outerRadius = 260;
  var radiusBig = 350
  var outerRadiusBig = 430
  var radiusBig2 = 260
  var outerRadiusBig2 = 350

  var sunburst = d3.select("#welcomesvg")
    .append('g')
    .attr('transform', 'translate(' + width + ',' + height + ')');


  var colors = d3.scaleSequential(d3.interpolateReds)
                  .domain([0,3000])
  var colorsBlue = d3.scaleSequential(d3.interpolateReds)
                  .domain([0,40])

  arc = d3.arc()
              .innerRadius(radius)
              .outerRadius(outerRadius);
  var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(outerRadius - 40);
  arc4 = d3.arc()
              .innerRadius(radiusBig)
              .outerRadius(outerRadiusBig);
  arc5 = d3.arc()
              .innerRadius(radiusBig2)
              .outerRadius(outerRadiusBig2);
  pie = d3.pie()
              .value(function(d, i) {return d; })
              .sort(null);


  sunburst.selectAll("#sunburstsvg")
        .data(pie(set1))
        .enter()
        .append('path')
        .attr("id", "sunburstpath")
        .attr('d', arc)
        .attr("fill", function(d,i) {
          return colors(d.data);
        })
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .attr("opacity", 0.4)
        .each(function(d) { this._current = d; })
        .on('mouseover', function(d) {
              d3.select(this).style('opacity', 0.2)
          })
        .on('mouseout', function(d) {
              d3.select(this)
              .transition()
            .duration(250)
            .style('opacity', 0.4)
          })
        .on("mousedown", function() {
              var year = d3.select(this);
              clickedSunburst(data, year)
            });


  // Make outer ring
  sunburst.selectAll("#sunburstsvg")
        .data(pie(set1))
        .enter()
        .append('path')
        .attr("id", "sunburstpathOpacity1")
        .attr('d', arc4)
        .attr("fill", function(d,i) {
          return colors(d.data);
        })
        .attr("opacity", 0.1)
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .each(function(d) { this._current = d; })
        .on('mouseover', function(d) {
              d3.select(this).style('opacity', 0.05)
          })
        .on('mouseout', function(d) {
              d3.select(this)
              .transition()
            .duration(250)
            .style('opacity', 0.1)
          })

  // Make middle ring with mini data
  sunburst.selectAll("#sunburstsvg")
        .data(pie(set2))
        .enter()
        .append('path')
        .attr("id", "sunburstpathOpacity2")
        .attr('d', arc5)
        .attr("fill", function(d,i) {
          return colorsBlue(d.data); // TODO
        })
        .attr("opacity", 0.3)
        .attr("stroke", "darkgray")
        .attr("stroke-width", 1)
        .each(function(d) { this._current = d; })
        .on('mouseover', function(d) {
              d3.select(this).style('opacity', 0.2)
          })
        .on('mouseout', function(d) {
              d3.select(this)
              .transition()
            .duration(250)
            .style('opacity', 0.3)
          })

}

function updateWelcome(data, food) {

  var sunburst = d3.selectAll("#welcomesvg")

  var colors = d3.scaleSequential(d3.interpolateReds)
                  .domain([getDataMeans(data, food)[1],getDataMeans(data, food)[2]])
  var colorsBlue = d3.scaleSequential(d3.interpolateReds)
                  .domain([getDataMninBars(data, food)[1],getDataMninBars(data, food)[2]])


  sunburst.selectAll("#sunburstpath")
          .data(pie(getDataMeans(data, food)[0]))
          .transition()
          .duration(3000)
          .attr("d", arc)
          .attr("fill", function(d,i) {
            return colors(d.data);
          })
          .each(function(d) { this._current = d; })

    sunburst.selectAll("#sunburstpathOpacity1")
            .data(pie(getDataMeans(data, food)[0]))
            .transition()
            .duration(3000)
            .attr("d", arc4)
            .attr("fill", function(d,i) {
              return colors(d.data);
            })
            .each(function(d) { this._current = d; })

    // Make middle ring with mini data
    sunburst.selectAll("#sunburstpathOpacity2")
          .data(pie(getDataMninBars(data, food)[0]))
          .transition()
          .duration(3000)
          .attr("id", "sunburstpathOpacity2")
          .attr('d', arc5)
          .attr("fill", function(d,i) {
            return colorsBlue(d.data);
          })
          .attr("opacity", 0.3)
          .attr("stroke", "darkgray")
          .attr("stroke-width", 1)
          .each(function(d) { this._current = d; })

}

function updateSunburst(data, food) {

  var sunburst = d3.selectAll("#sunburstsvg")

  var colors = d3.scaleSequential(d3.interpolateBlues)
                  .domain([getDataMeans(data, food)[1],getDataMeans(data, food)[2]])
  var colorsBlue= d3.scaleSequential(d3.interpolateBlues)
                  .domain([getDataMninBars(data, food)[1],getDataMninBars(data, food)[2]])

  // Add new title
  sunburst.selectAll("#sunburstTitle")
          .remove()
  sunburst.selectAll("#sunburstpath")
          .data(pie(getDataMeans(data, food)[0]))
          .transition()
          .duration(400)
          .attr("d", arc)
          .attr("fill", function(d,i) {
            return colors(d.data);
          })
          .each(function(d) { this._current = d; })

    sunburst.selectAll("#sunburstpathOpacity1")
            .data(pie(getDataMeans(data, food)[0]))
            .transition()
            .duration(400)
            .attr("d", arc4)
            .attr("fill", function(d,i) {
              return colors(d.data);
            })
            .each(function(d) { this._current = d; })

    // Make middle ring with mini data
    sunburst.selectAll("#sunburstpathOpacity2")
          .data(pie(getDataMninBars(data, food)[0]))
          .transition()
          .duration(600)
          .attr("id", "sunburstpathOpacity2")
          .attr('d', arc5)
          .attr("fill", function(d,i) {
            return colorsBlue(d.data);
          })
          .attr("opacity", 0.8)
          .attr("stroke", "darkgray")
          .attr("stroke-width", 1)
          .each(function(d) { this._current = d; })

  sunburst.append("text")
          .attr("id", "sunburstTitle")
          .text(food)
            .attr("class", "datatext")
          .attr('y', 400)
          .attr('x', 390)

}

function clickedSunburst(data, year) {

  // TODO:
  var year = "2015"
  var food = "carrot"

  var colors = d3.scaleSequential(d3.interpolateBlues)
                  .domain([getDataArrayMinMax(data, food, year)[1],
                           getDataArrayMinMax(data, food, year)[2]])

  var pie = d3.pie()
              .value(function(d, i) { return d; })
              .sort(null);

  d3.select("#sunburstsvg").selectAll("#sunburstpath")
          .data(pie(getDataArrayMinMax(data, food, year)[0]))
          .transition()
          .duration(400)
          .attr("d", arc)
          .attr("fill", function(d,i) {
            return colors(d.data);
          })
          .each(function(d) {this._current = d; })

}
