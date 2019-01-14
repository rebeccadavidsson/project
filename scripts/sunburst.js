
function makeSunburst(data){

  test = getDataMeans(data, "frozen-yogurt")
  test2 = getDataArrayYears(data, "carrot")
  test3 = getDataMeans(data, "pear")

  var width = 380;
  var height = 400;
  var radius = 270;
  var outerRadius = 210;
  var radius2 = 215
  var outerRadius2 = 190
  var radius3 = 190
  var outerRadius3 = 170
  var radiusBig = 360
  var outerRadiusBig = 430
  var radiusBig2 = 290
  var outerRadiusBig2 = 350
  var color = d3.scaleOrdinal(d3.schemeCategory20b);

  var sunburst = d3.select("#sunburstsvg")
    // .attr('width', window.innerWidth)
    // .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width + ',' + height + ')');

  var colors = d3.scaleOrdinal(d3.schemeBlues[5]) // TODO
  var colors2 = d3.scaleSequential(d3.interpolatePiYG);

  arc = d3.arc()
              .innerRadius(radius)
              .outerRadius(outerRadius);
  var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(outerRadius - 40);
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

  pie2 = d3.pie()
              .value(function(d, i) {return d; })
              .sort(null);

  var arr = [test, test3]
  var arrArc = [arc, arc3]
  for (var i = 0; i < 2; i++) {

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
            });

  }

  sunburst.selectAll("#sunburstsvg")
          .data(pie(test))
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
         .attr("dy", ".35em")
         .attr("text-anchor", "middle")
         .text(function(d, i) {return years[i]; });

  sunburst.selectAll("#sunburstsvg")
        .data(pie(test))
        .enter()
        .append('path')
        .attr("id", "sunburstpathOpacity1")
        .attr('d', arc4)
        .attr("fill", function(d,i) {
          return colors(i);
        })
        .attr("opacity", 0.1)
        .attr("stroke", "darkgray")
        .attr("stroke-width", 6)
        .each(function(d) { this._current = d; })

  sunburst.selectAll("#sunburstsvg")
        .data(pie2(test2))
        .enter()
        .append('path')
        .attr("id", "sunburstpathOpacity2")
        .attr('d', arc5)
        .attr("fill", function(d,i) {
          return "black";
        })
        .attr("opacity", 0.2)
        .attr("stroke", "darkgray")
        .attr("stroke-width", 1)
        .each(function(d) { this._current = d; })

  // Append sunburst title
  d3.select("#sunburstsvg")
    .append("text")
    .attr("id", "sunburstTitle")
    .text("frozen-yogurt")
      .attr("class", "datatext")
      .attr('y', 70)
      .attr('x', 390)

}

function updateSunburst(data, food) {

  var sunburst = d3.selectAll("#sunburstsvg")

  var colors = d3.scaleOrdinal(d3.schemeBlues[5]) // TODO

  // Add new title
  sunburst.selectAll("#sunburstTitle")
          .remove()

  sunburst.selectAll("#sunburstpath")
          .data(pie(getDataMeans(data, food)))
          .transition()
          .duration(400)
          .attr("d", arc)
          .attr("fill", function(d,i) {
            return colors(i);
          })
          .each(function(d) { this._current = d; })

    sunburst.selectAll("#sunburstpathOpacity1")
            .data(pie(getDataMeans(data, food)))
            .transition()
            .duration(400)
            .attr("d", arc4)
            .attr("fill", function(d,i) {
              return colors(i);
            })
            .each(function(d) { this._current = d; })

    sunburst.selectAll("#sunburstpathOpacity2")
            .data(pie(getDataMeans(data, food)))
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
