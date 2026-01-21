"use strict"

/**** Setup code:
 *    Scroll down to next comment
 *    for first practice problem */

let drawing1 = d3.select("#drawing1")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)

drawing1.append("rect")
    .attr("width", 200)
    .attr("height", 200)
    .attr("stroke", "red")
    .attr("fill", "none");

let drawing2 = d3.select("#drawing2")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)

drawing2.append("rect")
    .attr("width", 200)
    .attr("height", 200)
    .attr("stroke", "red")
    .attr("fill", "none");

let drawing3 = d3.select("#drawing3")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)

drawing3.append("rect")
    .attr("width", 200)
    .attr("height", 200)
    .attr("stroke", "red")
    .attr("fill", "none");

/**** Conditional Practice #1: ****/

let rects = "8";

if(rects>=1){
    drawing1.append("rect")
    .attr("width", 100)
    .attr("height", 50)
    .attr("x", 50)
    .attr("y", 50)
    .attr("fill", "red");
} 
if (rects>=2){
    drawing1.append("rect")
    .attr("width", 100)
    .attr("height", 50)
    .attr("x", 75)
    .attr("y", 75)
    .attr("fill", "blue");
}




/**** Conditional Practice #2: ****/

let ellipses = 3;

if(ellipses==1){
    drawing2.append("ellipse")
    .attr("rx", 50)
    .attr("ry", 25)
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("fill", "red");
} 

else {
    drawing2.append("ellipse")
    .attr("rx", 50)
    .attr("ry", 25)
    .attr("cx", 75)
    .attr("cy", 75)
    .attr("fill", "blue");
}

if(ellipses==3){
    drawing2.append("ellipse")
    .attr("rx", 50)
    .attr("ry", 25)
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("fill", "lightgreen");
}
    
