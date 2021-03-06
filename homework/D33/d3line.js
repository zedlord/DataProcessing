// Name: Zelda Zeegers
// Student number: 11397705

window.onload = function() {

var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// make an object from the datum
var parseDatum = d3.time.format("%Y-%m-%d").parse,
    bisectDatum = d3.bisector(function(d) { return d.Datum; }).left,
    formatValue = d3.format(",.2f"),
    formatCurrency = function(d) { return formatValue(d); };

// make the x and y axis
var x = d3.time.scale()
    .range([0, width]);
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// make the lines
var line = d3.svg.line()
    .x(function(d) { return x(d.Datum); })
    .y(function(d) { return y(d.Stoot); });


// append the svg in html
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// read the data from eeldedata file
d3.json("eeldedata.json", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.Datum = parseDatum(d.Datum);
    d.Stoot = +d.Stoot/10;
  });

// set the domains noticing the min and max of all the data
  x.domain([data[0].Datum, data[data.length-1].Datum]);
  y.domain(d3.extent(data, function(d) { return d.Stoot; }));



// append xaxis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

// append y-axis and transform horizontally
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Windsnelheid in m/s");

// append all the diverend paths
  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

// make focuspoints for the interactive properties
  var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

// append text and circles
  focus.append("circle")
      .attr("r", 4.5);

  focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

// append mouseover interactive properties
  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);


// what happens when the mouse hovers the y axis
  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDatum(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.Datum > d1.Datum - x0 ? d1 : d0;

    // what shoud be showed when the mouse hovers
    focus.attr("transform", "translate(" + x(d.Datum) + "," + y(d.Stoot) + ")");
    focus.select("text").text(formatCurrency(d.Stoot));
  }
});

}
