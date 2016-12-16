window.onload = function() {

    // the map with the hover element
     d3.json("data.json", function(error, data) {
       $("#mappie").datamap({
          scope: 'world',
          geography_config: {
            borderColor: 'rgba(0,0,0,0.3)',
            highlightBorderColor: 'rgba(255,232,102,0.5)',
            highlightFillColor:  'rgb(255, 209, 26)',
            popupTemplate: _.template([
              '<div class="hoverinfo">',
              '<% if (data.name) { %> <strong><%= data.data %></strong> species<br/> in <% } %>',

              '<%= geography.properties.name %>',
              '</div>'
            ].join('') ),
       },
     fills: data.fills,
     data: data.data})

     // when country is clicked
    d3.select("#mappie").on("mousedown.log", function() {
      grafiek(d3.event.srcElement.__data__.id)
      });
  });


  // declare the margins of the svg and a colorscale
  var canvasWidth = 600,
      canvasHeight = 600,
      outerRadius = 200,
      color = d3.scale.category20b();

  // makes a graph of the clicked country
  function grafiek(c){

    // removes the svg of the last graph
    d3.select("#graph").remove();

    // get the data from the csv file
    d3.csv("bardata.csv", function(error, data) {

      // loops over the datafile
      for(var j = 0; j<data.length; j++)

        // when asked country is found
        if (data[j].Code == c){
          // fill json
          var dataSet = [
          {"jaar":"2012", "value":+data[j].CAP2012},
          {"jaar":"2013", "value":+data[j].CAP2013},
          {"jaar":"2014", "value":+data[j].CAP2014}];
        }

        // make a svg
        var vis = d3.select("body")
          .append("svg:svg")
            .attr("id", "graph")
            .data([dataSet]) //fill dataSet in the chart
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .append("svg:g")
              .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // define center of svg

        // make boundarys
        var arc = d3.svg.arc()
          .outerRadius(outerRadius);

        //create arc data for us given a list of values
        var pie = d3.layout.pie()
          .value(function(d) { return d.value; })
          .sort( function(d) { return null; } );

        // make a slice (= peace of pie)
        var arcs = vis.selectAll("g.slice")
          .data(pie)
          .enter()
          .append("svg:g")
          .attr("class", "slice");

        // color the slice
        arcs.append("svg:path")
          .attr("fill", function(d, i) { return color(i); } )
          .attr("d", arc);

        // make text for slicies
        arcs.append("svg:text")
          .attr("transform", function(d) {
            d.outerRadius = outerRadius + 50;
            d.innerRadius = outerRadius + 45;
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function(d, i) { return dataSet[i].jaar; });

        // translate value to angle
        arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            d.outerRadius = outerRadius;
            d.innerRadius = outerRadius/2;
            return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
          })
          .text(function(d) { return d.data.value; });

        // radius = degrees
        function angle(d) {
          var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
          return a > 90 ? a - 180 : a;
        }

  });
};
}
