$(document).ready(function() {
   var g = new Graph();
    
   var nodeDepth = {};
   var maxDepth = 4.0;
   nodeDepth["Music"] = 0; 
   nodeDepth["Editing_course"] = 1; 
   nodeDepth["Studio_Apprentice"] = 1; 
   nodeDepth["Music_NBQ_L3"] = 1; 
   nodeDepth["HND"] = 2; 
   nodeDepth["Degree"] = 2; 
   nodeDepth["Label_AIR"] = 2; 
   nodeDepth["Agency"] = 2; 
   nodeDepth["Internship"] = 2; 
   nodeDepth["Agency"] = 3; 

   g.addEdge("Music", "Editing_course");
   g.addEdge("Music", "Studio_Apprentice");
   g.addEdge("Music", "Music_NBQ_L3");
    
   g.addEdge("Music_NBQ_L3", "HND");
   g.addEdge("Music_NBQ_L3", "Degree");
    
   g.addEdge("Degree", "Label_AIR");
   g.addEdge("Degree", "Agency");
   g.addEdge("Degree", "Internship");

   g.addEdge("Internship", "Agency");
    
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
     $("#impress").append("<div id=" + i + " class='step slide' data-x='" + x*((maxDepth-nodeDepth[i])/maxDepth)*800 + "' data-y='" + y*((maxDepth-nodeDepth[i])/maxDepth)*800 + "' data-scale='" + (maxDepth-parseFloat(nodeDepth[i])/2)/maxDepth + "'>" + i + "<br>" + links + "</div>");
   }

});
