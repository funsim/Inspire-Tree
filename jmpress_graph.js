function readJSON(graph, node, parent, depth) {
  if (!depth) {
    var depth = 0;
  }
  graph.addNode(node.id, { label : node.name, parent : parent, depth : depth, category : node.category, data : node.data });
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
     var next_links = 'The next steps in your career:<br>' 
     for (e in edges) {
       var s = edges[e].source;
       var t = edges[e].target;
       var back_link;
       if (t.id == i) {
         back_link = '<a href="index.html#/' + s.id + '">Go back</a>';
       }
       if (s.id == i) {
         next_links += '<a href="index.html#/' + t.id + '">' + t.label + '</a>, ';
       }
     }
     // A link the directs to the detailed description of this node
     var desc_link = '<a href="index.html#/' + node.id + '_desc">Interested? Tell me more!</a> ';
     desc_link += back_link + '</br>' 
     // A link for the description slide that links back to the main node 
     $("#impress").append("<div id=" + node.id + " class='step slide leaf " + node.category + "' data-x='" + x*800 + "' data-y='" + y*800 + "' data-scale='1'><h1><b>" + node.label + "</b></h1><br>" + desc_link + "<br>" + next_links + "</div>");
     // Also add a description node for detailed information
     var description = "<section><table><tr><td><h2><u>Job: Record Label A&R</u></h2><br><h2>What is it?</h2><p>A record label A&R is responsible for discovering new recording artists and bringing them to the record company.</p><h2>How much do I earn?</h2><p>The short answer is anything between 0 - 100,000 pounds.</p><h2>What experience of qualifications do I need?</h2><p>NVQ Level 3 in Music Business</p></td><td><h2>Videos</h2></td></tr><tr><td><h2>Action Plan:</h2><p><a href=''>Update your CV CVbuilder.com</a> <a href=''>Find a vacancy mymusicjob.com</a> <a href=''>Find a mentor Mentorwell.com</a></p></td></td></table><br></section>";
     var back_to_node_link = '<a href="index.html#/' + node.id + '">Go back to ' + node.label + '</a><br>';
     $("#impress").append("<div id='" + node.id + "_desc' class='step slide description' data-exclude='true' data-x='" + (x*800+700.0/2+50) + "' data-y='" + (y*800+600.0/2-40) + "' data-scale='0.1'>" + description + back_to_node_link + "</div>");
   }

});
