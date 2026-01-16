"use strict"

let drawingWidth = 500;
let drawingHeight = 500;

let snowmanX = drawingWidth/2;
let snowmanY = drawingHeight-75;

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight);

let border = drawing.append("rect")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight)
    .attr("fill", "lightblue")
    .attr("stroke", "red");

let snowmanBody = drawing.append("circle")
.attr("cx", snowmanX)
.attr("cy", snowmanY)
.attr("r", 75)
.attr("fill", "white");

let snowmanHead = drawing.append("circle")
.attr("cx", snowmanX)
.attr("cy", snowmanY-50)
.attr("r", 50)
.attr("fill", "white");

let headX = snowmanX;
let headY = snowmanY - 100;

let snowmanEyeLeft = drawing.append("circle")
.attr("cx", headX-15)
.attr("cy", snowmanY-15)
.attr("r", 5)
.attr("fill", "black");

let snowmanEyeRight = drawing.append("circle")
.attr("cx", headX+15)
.attr("cy", headY+15)
.attr("r", 5)
.attr("fill", "black");

let snowmanMouth = drawing.append("line")
.attr("x1", headX-20) 
.attr("x2", headX+20) 
.attr("y1", headY+15) 
.attr("y2", headY+15)
.attr("stroke", "black")
.attr("stroke-weight", 2);

let snowmanNose = drawing.append("polyline")
.attr("points", closedPolygon(headX, headY-15,
                            headX-5,headY-5, 
                            headX+20,headY+27, 
                            headX+20,headY+23)) 
.attr("fill","orange");