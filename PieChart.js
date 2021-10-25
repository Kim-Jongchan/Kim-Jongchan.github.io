var margin = {top: 20, right: 20, bottom:20, left:20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width/2;

var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width/2 + "," + height/2 ")");


var arc = d3.arc()
  .outerRadius(radius-10)
  .innerRadius(0)

var labelArc = d3.arc()
  .outerRadius(radius - 50)
  .innerRadius(radius - 50)

var pie = d3.pie()
  //.sort(null)
  .value(function(d) { return d.count;
  });

//import data
d3.csv("DoggyPieChart.csv", function(error, data) {
  if(error) throw error;

  data.forEach(function(d) {
    d.count = +d.count;
    d.breed = d.breed;
  });

  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", "blue");

  g.append("text")
    .attr("transform", function(d) {return "translate(" + label.Arc.centroid(d) + ")";})
    .attr("dy", ".35mm")
    .text(function(d) {return d.data.breed;});
})
