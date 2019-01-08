function onload() {

d3.select("#sunburstsvg")
  .append("text")
  .text("HIER KOMT IETS VAN DATA OFZO weet ik nog niet zo goed")
    .attr("class", "datatext")
  .attr('y', 50)
  .attr('x', 20)

d3.select("#datasvg")
  .append("text")
  .text("blblbabalablablabla text")
  .attr("class", "datatext")
  .attr('y', 50)
  .attr('x', 20)


// Open file
food = d3.csv("data/foodvalues.csv")
console.log(food);
array = ["Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Okt, Nov, Dec"]

// Define range and domain for xScale and yScale
var xScale = d3.scaleLinear()
    .domain([0,11])
    .range([0,400]);
var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([100,0]);

// Load first line charts when page is opened
for (i = 200; i < 1000; i += 200) {
d3.selectAll("#datasvg")
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(100," + i + ")")
  .call(d3.axisBottom(xScale));
}

for (i = 100; i < 800; i += 200) {
d3.selectAll("#datasvg")
  .append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(100," + i + ")")
  .call(d3.axisLeft(yScale).ticks(5));
}

}
