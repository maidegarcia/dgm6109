"use strict"

let drawingWidth = 500; //This determines the size for our canvas
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

let snowmanLeftEye = drawing.append("circle")
    .attr("cx", 35)
    .attr("cy", 35)
    .attr("r", 5)
    .attr("fill", "black");

/* Exercise: Draw the right eye; name this variable consistently with your others */

let snowmanRightEye = drawing.append("circle")
    .attr("cx", 65)
    .attr("cy", 35)
    .attr("r", 5)
    .attr("fill", "black");

/* Exercise: Draw the mouth by appending a line (and store it in a variable) */

let snowmanMouth = drawing.append("line")
    .attr("x1", 30)
    .attr("y1", 65)
    .attr("x2", 70)
    .attr("y2", 65)
    .attr("stroke", "black")
    .attr("stroke-with", 2);


/* Exercise: Draw the nose by appending a polyline
    and using the closedPolygon function that we provided you
    (and storing it in a variable) */
    
let snowmanNose = drawing.append("polyline")
    .attr("points", closedPolygon(50, 35,
                                 45, 45,
                                 70, 75
    ))
    .attr("fill", "orange");