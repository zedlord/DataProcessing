window.onload = function() {

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
             ].join('') )
       },
     fills: data.fills,
     data: data.data})
  });

}
