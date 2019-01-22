
function makeSunburst(dataX){

    // Source: https://beta.observablehq.com/@mbostock/d3-zoomable-sunburst

    // Start with anise when page is opened
    var tempFoodname = "anise"

    // get data
    var data = sunburstData(dataX, tempFoodname)[0]

    // Partition data with d3.hierarchy
    partition = data => {
        const root = d3.hierarchy(data)
            .sum(function(d) {return d.size})
            .sort(null)
            // .sort((a, b) => b.value - a.value);
        return d3.partition()
            .size([2 * Math.PI, root.height + 1])
          (root);
      }



    color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateReds, data.children.length + 1))

    // color_palettes = [['#4abdac', '#fc4a1a', '#f7b733'], ['#f03b20', '#feb24c', '#ffeda0'], ['#007849', '#0375b4', '#ffce00'], ['#373737', '#dcd0c0', '#c0b283'], ['#e37222', '#07889b', '#eeaa7b'], ['#062f4f', '#813772', '#b82601'], ['#565656', '#76323f', '#c09f80']];
    // color = d3.scaleOrdinal().range(color_palettes[~~(Math.random() * 1)]),


    // var format = d3.format(",d")
    width = 430
    radius = width / 3.5
    arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.05))
        .padRadius(radius * 1.1)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius))

    var root = partition(data)
    root.each(d => d.current = d);

    const svg = d3.select("#sunburstsvg")
        .style("font", "10px sans-serif");

    var g = svg.append("g")
        .attr("class", "sunburstCorrect")
        .attr("transform", `translate(${width / 1.2},${width / 1.1})`);

    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-5, 0])
                .html(function(d) {
                  return "<span class='details'>" + d + "<br></span>" ;
                })
    var tipArr = ["Year", "Month", "Month", "Year"]

    var path = g.append("g")
      .attr("class", "path")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .enter().append("path")
        // .attr("fill", d => { while (d.depth > 1) d = d.parent;
        //   console.log(d.data);
        //   return color(d.data.name); })

        .attr("fill", function(d) {
          // if (d.depth > 1) {
          //   d = d.parent
          //   console.log(d.value);
          // }
          // else {
          //   console.log(d);
          //
          // }
          // while (d.depth > 2) {
          //   console.log(d);
          // }
          return color(d.value)
        })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.9: 0.7) : 0)
        .attr("d", d => arc(d.current));

    // path.call(tip)

    path.filter(d => d.children)
          .style("cursor", "pointer")
          .on("mouseover", function(d) {
            // tip.show(tipArr[partition(d).height])
          })
          .on("mouseout", function(d) {
            // tip.hide(d)
          })
          .on("click", clicked);

    label = g.append("g")
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
            if (d.depth == 2) {
              return getMonthSunburst(parseInt(d.data.name))
            }
            else if (d.depth == 4) {
              return "week " + d.data.name + ", rate: " + d.data.size
            }
            else {
              return d.data.name
              }
            })

    parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        // .attr("fill", "darkgrey")
        .attr("opacity", 0)
        .attr("pointer-events", "all")
        .on("mouseover", function(d) {
          d3.select(this)
          .style("cursor", "pointer")
        })
        .on("click", clicked);

    // Add title
    svg.append("text")
        .text(tempFoodname)
        .attr("class", "datatext")
        .attr("id", "sunburstTitle")
        .attr("text-anchor", "middle")
        .attr("pointer-events", "none")
        .attr("transform", `translate(${width / 1.2},${width / 1.1})`);

    function clicked(p) {
      console.log(p.data.name[0]);

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

      const t = g.transition().duration(400);

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

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.04;
    }

    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    svg.node();

}

function makeSunburstWelcome(data, foodnames){

  var set1 = getDataMeans(data, "frozen-yogurt")[0]
  var set2 = getDataMninBars(data, "pie")[0]

  var width = 800;
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
        .attr("opacity", 0.7)
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
              console.log(year);
              console.log(foodname);
              var foodname = d3.selectAll("#sunburstTitle").text()

              updateUnderBarChart(data, foodname, year)
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
//
// function updateWelcome(data, food) {
//
//   var sunburst = d3.selectAll("#welcomesvg")
//
//   var colors = d3.scaleSequential(d3.interpolateReds)
//                   .domain([getDataMeans(data, food)[1],getDataMeans(data, food)[2]])
//   var colorsBlue = d3.scaleSequential(d3.interpolateReds)
//                   .domain([getDataMninBars(data, food)[1],getDataMninBars(data, food)[2]])
//
//
//   sunburst.selectAll("#sunburstpath")
//           .data(pie(getDataMeans(data, food)[0]))
//           .transition()
//           .duration(6000)
//           .attr("d", arc)
//           .attr("fill", function(d,i) {
//             return colors(d.data);
//           })
//           .each(function(d) { this._current = d; })
//
//     sunburst.selectAll("#sunburstpathOpacity1")
//             .data(pie(getDataMeans(data, food)[0]))
//             .transition()
//             .duration(6000)
//             .attr("d", arc4)
//             .attr("fill", function(d,i) {
//               return colors(d.data);
//             })
//             .each(function(d) { this._current = d; })
//
//     // Make middle ring with mini data
//     sunburst.selectAll("#sunburstpathOpacity2")
//           .data(pie(getDataMninBars(data, food)[0]))
//           .transition()
//           .duration(6000)
//           .attr("id", "sunburstpathOpacity2")
//           .attr('d', arc5)
//           .attr("fill", function(d,i) {
//             return colorsBlue(d.data);
//           })
//           .attr("opacity", 0.3)
//           .attr("stroke", "darkgray")
//           .attr("stroke-width", 1)
//           .each(function(d) { this._current = d; })
//
// }

function updateSunburst(data, food) {

  var dataset = sunburstData(data, food)
  var data = dataset[0]
  console.log(data);
  arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.2)
      .innerRadius(d => d.y0 * radius - 20)
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

  root = partition(data)
  root.each(d => d.current = d);

  var sunburstCorrect = d3.select("#sunburstsvg").select(".sunburstCorrect").selectAll(".path").remove()
  label.remove()
  parent.remove()

  d3.selectAll(".path").remove()

  const svg = d3.select("#sunburstsvg")
      .style("font", "10px sans-serif");

  var g = svg.append("g")
      .attr("class", "sunburstCorrect")
      .attr("transform", `translate(${width / 1.2},${width / 1.1})`);

  var path = g.append("g")
    .attr("class", "path")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .enter().append("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.9: 0.7) : 0)
      .attr("d", d => arc(d.current));

  path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);

  label = g.append("g")
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
          if (d.depth == 2) {
            return getMonthSunburst(parseInt(d.data.name))
          }
          else if (d.depth == 4) {
            return "week " + d.data.name + ", rate: " + d.data.size
          }
          else {
            return d.data.name
            }
          })

  parent = g.append("circle")
      .datum(root)
      .attr("r", radius)
      // .attr("fill", "darkgrey")
      .attr("opacity", 0)
      .attr("pointer-events", "all")
      .on("mouseover", function(d) {
        d3.select(this)
        .style("cursor", "pointer")
      })
      .on("click", clicked);








    function clicked(p) {
      parent.datum(p.parent || root);
      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = g.transition().duration(400);

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
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

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.04;
    }

    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }



  var sunburst = d3.selectAll("#sunburstsvg")

  // Add new title
  sunburst.selectAll("#sunburstTitle")
          .remove()

  sunburst.append("text")
          .attr("id", "sunburstTitle")
          .text(food)
            .attr("class", "datatext")
          .attr('y', 390)
          .attr('x', 360)

}

// Return a month for a corresponding week.
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
