"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)
*/
let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

//Code for the tail

let fishTale = drawing.append("polygon")
    .attr("points", closedPolygon(15,75,75,125,15,175))
    .attr("fill", "#F5B427");

//Code for the body

let fishBodyBase1 = drawing.append("circle")
    .attr("cx", 125)
    .attr("cy", 125)
    .attr("r", 50)
    .attr("fill", "#577AEB");

let fishBodyBase2 = drawing.append("rect")
    .attr("x", 125)
    .attr("y", 75)
    .attr("width", 50)
    .attr("height", 100)
    .attr("fill", "#577AEB");