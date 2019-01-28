/*
 * Make the interactive sunburst. Input is all data and chosen foodname.
 * Source: https://beta.observablehq.com/@mbostock/d3-zoomable-sunburst
 */
function makeSunburst(dataX, tempFoodname){

    // Get data
    var data = sunburstData(dataX, tempFoodname)[0]
    console.log(data);

    color = d3.scaleOrdinal(d3.interpolateReds).range(d3.quantize(d3.interpolatePlasma, data.children.length + 1))
    width = 410
    radius = width / 4
    arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.05))
        .padRadius(radius * 1.1)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius))

    var svg = d3.select("#sunburstsvg")
        .style("font", "10px sans-serif");

    var g = svg.append("g")
        .attr("class", "sunburstCorrect")
        .attr("transform", `translate(${width / 1.2},${width / 0.97})`);

    // Partition data with d3.hierarchy
    partition = data => {
        const root = d3.hierarchy(data)
            .sum(function(d) {return d.size})
        return d3.partition()
            .size([2 * Math.PI, root.height + 1])
          (root);
      }

    var root = partition(data)
    root.each(d => d.current = d);

    // Append paths for all depths of the sunburst
    var path = makePaths(g, root)

    // Add labels to arcs
    label = makeLabel(g, root)

    path.filter(d => d.children)
          .style("cursor", "pointer")
          .on("click", function(d) {clicked(d, dataX, root, path, label)})

    // Append circle in the middle to go back a level in the sunburst
    parent = makeParent(g, root, radius, function(d) {clicked(d, dataX, root, path, label)})

    addTitle(tempFoodname, width, svg, 0.97)

}

/*
 * Make a sunburst with low opacity on the background.
 */
function makeSunburstWelcome(data, foodnames){

  var set1 = getDataMeans(data, "frozen-yogurt")[0]
  var set2 = getDataMninBars(data, "pie")[0]

  var width = 820;
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

  var arc = d3.arc()
              .innerRadius(radius)
              .outerRadius(outerRadius);
  var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(outerRadius - 40);
  var arc2 = d3.arc()
              .innerRadius(radiusBig)
              .outerRadius(outerRadiusBig);
  var arc3 = d3.arc()
              .innerRadius(radiusBig2)
              .outerRadius(outerRadiusBig2);
  var pie = d3.pie()
              .value(function(d, i) {return d; })
              .sort(null);

  var dataList = [set1, set1, set2]
  var arcList = [arc, arc2, arc3]
  var opacityList = [0.7, 0.1, 0.3]

  // Loop over the three arcs
  for (var j = 0; j < 3; j++) {

    // Append paths for the sunburst
    sunburst.selectAll("#sunburstsvg")
          .data(pie(dataList[j]))
          .enter()
          .append("path")
          .attr('d', arcList[j])
          .attr("fill", function(d) {
            if (j == 2) {
                return colorsBlue(d.data);
            }
            else {
                return colors(d.data);
            }
          })
          .attr("stroke", "darkgray")
          .attr("stroke-width", 6)
          .attr("opacity", opacityList[j])
          .each(function(d) { this._current = d; })
          .on('mouseover', function(d) {
                d3.select(this).style('opacity', 0.3)
            })
          .on('mouseout', function(d) {
                d3.select(this)
                .transition()
              .duration(250)
              .style('opacity', 0.2)
            })
  }
}

/*
 * Update sunburst by removing old sunburst and passing on new data to
 * a new sunburst, without transition.
 */
function updateSunburst(dataX, food) {

  // Get new data
  var data = sunburstData(dataX, food)[0]

  // Partition new data
  var root = partition(data)
  root.each(d => d.current = d);

  // Remove old elements
  label.remove()
  parent.remove()
  d3.selectAll("#sunburstsvg").selectAll(".path, #sunburstCorrect").remove()

  var svg = d3.select("#sunburstsvg")
      .style("font", "10px sans-serif");

  var g = svg.append("g")
      .attr("class", "sunburstCorrect")
      .attr("transform", `translate(${width / 1.2},${width / 0.97})`);

  // Append paths for all depths of the sunburst
  var path = makePaths(g, root)

  path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", function(d) {clicked(d, dataX, root, path, label)})

  label = makeLabel(g, root)

  parent = makeParent(g, root, radius, function(d) {clicked(d, dataX, root, path, label)})

  // Remove old sunburst title and add a new one.
  d3.selectAll("#sunburstsvg").selectAll("#sunburstTitle").remove()

  addTitle(food, width, svg, 0.97)
}

/*
 * Makes the sunburst on a specific svg with plasma colors and high opacity.
 * This sunburst has no hidden layers.
 */
function makeUnderSunburst(dataX, svgX) {

  var tempFoodname = "cauliflower"

  // get data
  var data = sunburstData(dataX, tempFoodname)[0]
  // Source: https://beta.observablehq.com/@mbostock/d3-zoomable-sunburst

  var root = partition(data)
  root.each(d => d.current = d);

  const svg = d3.select(svgX)
      .style("font", "10px sans-serif");

  var g = svg.append("g")
      .attr("transform", `translate(${width / 1.2},${width / 1.1})`);

  // Make paths with
  var path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .enter().append("path")
    .attr("fill", function(d) {
      return color(d.value)
    })
      .attr("fill-opacity", d => arcVisible(d.current) ?
      (d.children ? 0.9: 0.7) : 0.5)
      .attr("d", d => arc(d.current))
      .on("mouseover", function(d) {
        d3.select(this)
        .style("opacity", 0.4)
      })
      .on("mouseout", function(d) {
        d3.select(this)
        .transition()
        .duration(400)
        .style("opacity", 1)
      })

  // Add title to svg
  addTitle(tempFoodname, width, svg, 1.1)

}


function arcVisible(d) {
  return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
}

function labelVisible(d) {
  if (d.y1 >= 4 && d.y0 <= 1) {
     return d.y1 <= 4 && d.y0 >= 2 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.18;
   }
   else {
     return d.y1 <= 4 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.08;
   }
}

function labelTransform(d) {
  const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
  const y = (d.y0 + d.y1) / 2 * radius;
  return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}

/*
 * Append paths to all depths of the sunburst.
 * opacity of outer circles is 0, making them invisible.
 */
function makePaths(g, root) {
  var path = g.append("g")
    .attr("class", "path")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .enter().append("path")
    .attr("fill", function(d) {
        while (d.depth > 1) {
          d = d.parent
        }
        return color(d.value)
    })
    .attr("fill-opacity", d => arcVisible(d.current)
          ? (d.children ? 0.9: 0.7) : 0)
    .attr("d", d => arc(d.current))
    .attr("class", function(d) {
      if (d.parent.data.name) {
        return (d.parent.data.name + d.data.name);

      }
      else {
        return d.data.name
      }

    })

    return path
}

/*
 * Make labels to arcs.
 */
function makeLabel(g, root) {

    label = g.append("g")
          .attr("class", "labels")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .style("fill", "white")
          .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .enter().append("text")
          .attr("dy", "0.35em")
          .attr("fill-opacity", d => +labelVisible(d.current))
          .attr("transform", d => labelTransform(d.current))
          .text(function(d) {

            // Check what the label has to be by checking arc depth
            if (d.depth == 2) {
              return getMonthSunburst(parseInt(d.data.name))
            }
            else if (d.depth == 4) {
              return "week " + parseInt(d.data.name)
            }
            else {
              return d.data.name
              }
            })
  return label
}

/*
 * Make the parent circle to click on when user wants to go back one level
 * in the sunburst.
 */
function makeParent(g, root, radius, clicked) {
  var parent = g.append("circle")
      .datum(root)
      .attr("r", radius - 10)
      .attr("fill", "silver")
      .attr("pointer-events", "all")
      .on("mouseover", function(d) {
        d3.select(this)
        .style("cursor", "pointer")
      })
      .on("click", clicked);

  return parent
}

function addTitle(tempFoodname, width, svg, factor) {
  svg.append("text")
      .text(tempFoodname)
      .attr("class", "datatext")
      .attr("id", "sunburstTitle")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
      .attr("transform", `translate(${width / 1.2},${width / factor})`);
}

/*
 * Make a transition between old and new data when an arc is clicked on.
 * Result is a transitioned, zoomed in sunburst.
 */
function clicked(p, dataX, root, path, label) {

  // Update barchart when clicked on a year
  if (p.data.name[0] == 2) {
    var foodname = d3.selectAll("#sunburstTitle").text()
    updateUnderBarChart(dataX, foodname, p.data.name)
    updateYear(dataX, p.data.name)
  }
  parent.datum(p.parent || root);
  root.each(d => d.target = {
    x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
    x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
    y0: Math.max(0, d.y0 - p.depth),
    y1: Math.max(0, d.y1 - p.depth)
  });

  const t = g.transition().duration(450);

  // Transition the data on all arcs
  path.transition(t)
      .tween("data", d => {
        const i = d3.interpolate(d.current, d.target);
        return t => d.current = i(t);
      })
    .filter(function(d) {
      return +this.getAttribute("fill-opacity") || arcVisible(d.target);
    })
      .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.9 : 0.7) : 0)
      .attrTween("d", d => () => arc(d.current));

  label.filter(function(d) {
      return +this.getAttribute("fill-opacity") || labelVisible(d.target);
    }).transition(t)
      .attr("fill-opacity", d => +labelVisible(d.target))
      .attrTween("transform", d => () => labelTransform(d.current));
}

/*
 * Return month for a corresponding week.
 */
function getMonthSunburst(index) {

  if (index >= 0 && index < 5) {
    return "January"
  }
  else if (index >= 5 && index < 9) {
    return "February"
  }
  else if (index >= 9 && index < 13) {
    return "March"
  }
  else if (index >= 13 && index < 17) {
    return "April"
  }
  else if (index >= 17 && index < 22) {
    return "May"
  }
  else if (index >= 22 && index < 26) {
    return "June"
  }
  else if (index >= 26 && index < 31) {
    return "July"
  }
  else if (index >= 31 && index < 35) {
    return "August"
  }
  else if (index >= 35 && index < 39) {
    return "September"
  }
  else if (index >= 39 && index < 44) {
    return "October"
  }
  else if (index >= 44 && index < 49) {
    return "November"
  }
  else if (index >= 48 && index < 52) {
    return "December"
  }
}
