$(document).ready(function() {
   var g = new Graph();
    
   g.addEdge("strawberry", "cherry");
   g.addEdge("strawberry", "apple");
   g.addEdge("strawberry", "tomato");
    
   g.addEdge("tomato", "apple");
   g.addEdge("tomato", "kiwi");
    
   g.addEdge("cherry", "apple");
   g.addEdge("cherry", "kiwi");
    
   var layouter = new Graph.Layout.Spring(g);
   layouter.layout();
   var i;
   for (i in g.nodes) {
     var x=g.nodes[i].layoutPosX;
     var y=g.nodes[i].layoutPosY;
     var edges = g.nodes[i].edges;
     var links = '' 
     for (e in edges) {
       var s = edges[e].source;
       var t = edges[e].target;
       if (t.id == i) {
         links += '<a href="index.html#/' + s.id + '">Previous option: ' + s.id + '</a><br>';
       }
       if (s.id == i) {
         links += '<a href="index.html#/' + t.id + '">Next option: ' + t.id + '</a><br>';
       }
     }
     $("#impress").append("<div id=" + i + " class='step slide' data-x='" + x*2000 + "' data-y='" + y*2000 + "' data-scale='1'>" + i + "<br>" + links + "</div>");
   }

});
