"use strict"

let drawingWidth = 500;
let drawingHeight = 500;

let snowmanX = drawingWidth/2 //Original x of body 250
let snowmanY = drawingHeight-75 //Original y of body 250

let headCenterX = snowmanX; //To establish a relationship to the snowman's position
let headCenterY = snowmanY - 100;

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight);

/* Draw a border that matches the specified drawing area's size and fill the background with color for our white snowman. */
let border = drawing.append("rect")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight)
    .attr("fill", "lightblue")
    .attr("stroke", "red");

/* Draw a snowman */

// Uncomment this code for a taller snowman!
// let snowmanBase = drawing.append("circle")
// .attr("cx", 250)
// .attr("cy", 400)
// .attr("r", 100)
// .attr("fill", "white");

let snowmanBody = drawing.append("circle")
.attr("cx", snowmanX) //250
.attr("cy", snowmanY) //250
.attr("r", 75)
.attr("fill", "white");

let snowmanHead = drawing.append("circle")
.attr("cx", snowmanX)//250
.attr("cy", snowmanY-100)//150
.attr("r", 50)
.attr("fill", "white");

let snowmanEyeLeft = drawing.append("circle")
.attr("cx", headCenterX - 15)//Original 235
.attr("cy", headCenterY - 15) //Original 135
.attr("r", 5)
.attr("fill", "black");

let snowmanEyeRight = drawing.append("circle")
.attr("cx", headCenterX + 15)//265
.attr("cy", headCenterY - 15)//135
.attr("r", 5)
.attr("fill", "black");

let snowmanMouth = drawing.append("line")
.attr("x1", headCenterX - 20) //230
.attr("x2", headCenterX + 20) //270
.attr("y1", headCenterY + 15) //165
.attr("y2", headCenterY + 15) //165
.attr("stroke", "black")
.attr("stroke-weight", 2);

let snowmanNose = drawing.append("polyline")
.attr("points", closedPolygon(headCenterX,headCenterY - 15, //250,135
                            headCenterX - 5,headCenterY -5, //245,145
                            // 255,155, // uncomment this point for a more interesting carrot nose!
                            headCenterX + 20,headCenterY + 27, //270,177
                            headCenterX + 20,headCenterY + 23)) //270,173
.attr("fill","orange");

// CHALLENGE: Can you use two rectangles to draw a hat on top of the snowman's head and then reposition it with the snowman? See lecture slides for a simple design!