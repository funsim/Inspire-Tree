function readJSON(graph, node, parent, depth) {
  if (!depth) {
    var depth = 0;
  }
  graph.addNode(node.id, { label : node.name, parent : parent, depth : depth, data : node.data });
  if (parent) {
    graph.addEdge(parent.id, node.id);
  }
  for (child in node.children) {
    readJSON(graph, node.children[child], node, depth + 1);
  }
}

$(document).ready(function() {
   var g = new Graph();
   readJSON(g, json);
    
   var layouter = new Graph.Layout.Spring(g);
   layouter.layout();
   var i;
   for (i in g.nodes) {
     node = g.nodes[i]
     var x=node.layoutPosX;
     var y=node.layoutPosY;
     var edges = node.edges;
     var links = '' 
     for (e in edges) {
       var s = edges[e].source;
       var t = edges[e].target;
       if (t.id == i) {
         links += '<a href="index.html#/' + s.id + '">Previous option: ' + s.label + '</a><br>';
       }
       if (s.id == i) {
         links += '<a href="index.html#/' + t.id + '">Next option: ' + t.label + '</a><br>';
       }
     }
     // A link the directs to the detailed description of this node
     links += '<a href="index.html#/' + node.id + '_desc">More information about ' + node.label + '</a><br>';
     // A link for the description slide that links back to the main node 
     desc_back_link = '<a href="index.html#/' + node.id + '">Get me back to ' + node.label + '</a><br>';
     $("#impress").append("<div id=" + node.id + " class='step slide leaf' data-x='" + x*800 + "' data-y='" + y*800 + "' data-scale='1'>" + node.label + "<br>" + links + "</div>");
     // Also add a description node for detailed information
     $("#impress").append("<div id='" + node.id + "_desc' class='step slide description' data-exclude='true' data-x='" + (x*800+700.0/2+50) + "' data-y='" + (y*800+600.0/2-40) + "' data-scale='0.1'>Videos of " + node.label + "<br>" + desc_back_link + "</div>");
   }

});
