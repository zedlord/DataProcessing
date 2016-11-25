 // Name: Zelda Zeegers
 // Student number: 11397705

window.onload = function() {

  // give the margin values
  var margin = {top: 20, right: 30, bottom: 140, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // find out the range domain of the x and y value
  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
  var y = d3.scale.linear().range([height, 0]);

  // set x Axis
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
  // set y axis
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);

  // make a d3 class tip for the text when hovering the bars
  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Elevation:</strong>" + d.Elevation + "</span>";
      })

  // make a svg where we will place the graph in
  // the g is also appended to make a vertical y-axis
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // to check if the mouse hovers or not
  svg.call(tip);

  // get the data from the jsonfile
  d3.json("data.json", function(error, data) {
    data.forEach(function(d) {
      d.Elevation = +d.Elevation;
      d.Name = d.Name;
    })

    // calculating the domains of the graph depending on the data
    x.domain(data.map(function(d) { return d.Name; }));
    y.domain([0, d3.max(data, function(d) { return d.Elevation; })]);

    // append the x-axis to the svg
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      // make the text and set the places where tio write
      // rotate the text vertically
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    // append the y-axis to the svg
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    // draw the bars containing the data
    svg.selectAll("bar")
        .data(data)
      .enter().append("rect")
        // when the mouse hovers the tip.show is called
        .attr("class", "bar")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .attr("x", function(d) { return x(d.Name); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.Elevation); })
        .attr("height", function(d) { return height - y(d.Elevation); });

  });

}
