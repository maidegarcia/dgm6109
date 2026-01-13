"use strict"

let drawingWidth = 500;
let drawingHeight = 500;

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
.attr("cx", 250)
.attr("cy", 250)
.attr("r", 75)
.attr("fill", "white");

let snowmanHead = drawing.append("circle")
.attr("cx", 250)
.attr("cy", 150)
.attr("r", 50)
.attr("fill", "white");

let snowmanEyeLeft = drawing.append("circle")
.attr("cx", 235)
.attr("cy", 135)
.attr("r", 5)
.attr("fill", "black");

let snowmanEyeRight = drawing.append("circle")
.attr("cx", 265)
.attr("cy", 135)
.attr("r", 5)
.attr("fill", "black");

let snowmanMouth = drawing.append("line")
.attr("x1", 230)
.attr("x2", 270)
.attr("y1", 165)
.attr("y2", 165)
.attr("stroke", "black")
.attr("stroke-weight", 2);

let snowmanNose = drawing.append("polyline")
.attr("points", closedPolygon(250,135,
                            245,145,
                            // 255,155, // uncomment this point for a more interesting carrot nose!
                            270,177,
                            270,173))
.attr("fill","orange");

// CHALLENGE: Can you use two rectangles to draw a hat on top of the snowman's head and then reposition it with the snowman? See lecture slides for a simple design!