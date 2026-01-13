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

/* Draw a snowman head */

let snowmanHead = drawing.append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 50)
    .attr("fill", "white");

/* Exercise: Draw the left eye; store it in an appropriately named variable */


/* Exercise: Draw the right eye; name this variable consistently with your others */

/* Exercise: Draw the mouth by appending a line (and store it in a variable) */

/* Exercise: Draw the nose by appending a polyline
    and using the closedPolygon function that we provided you
    (and storing it in a variable) */
    
