
function makeSunburst(){

  test = getDataMeans("apple")

  var width = 380;
  var height = 400;
  var radius = 270;
  var outerRadius = 230;
  var radius2 = 220
  var outerRadius2 = 200
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
  var arc2 = d3.arc()
              .innerRadius(radius2)
              .outerRadius(outerRadius2);
  pie = d3.pie()
              .value(function(d, i) {return d[1]; })
              .sort(null);

  sunburst.selectAll("path")
        .data(pie(test))
        .enter()
        .append('path')
        .attr("id", "sunburstpath")
        .attr('d', arc)
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

  // sunburst.selectAll("path")
  //       .data(pie(test2))
  //       .enter()
  //       .append('path')
  //       .attr('d', arc2)
  //       .attr("fill", function(d,i) {
  //         return colors(i);
  //       })
  //       .attr("stroke", "darkgray")
  //       .attr("stroke-width", 6)
  //       .each(function(d) { this._current = d; })

}makeSunburst()
