"use strict"

let drawingWidth = 500;
let drawingHeight = 500;

let snowmanSize = 100;

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#drawing")
    .append("svg")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight);

/* Draw a border that matches the specified drawing area's size and fill the background with color for our white snowman. */
let border = drawing.append("rect")
    .attr("width", drawing.attr("width"))
    .attr("height", drawing.attr("height"))
    .attr("fill", "lightblue")
    .attr("stroke", "red");

/* Draw and store snowman shapes without positioning */

let snowmanBody = drawing.append("circle")
    .attr("r", snowmanSize)
    .attr("fill", "white");

let snowmanHead = drawing.append("circle")
    .attr("r", snowmanSize * 0.60)
    .attr("fill", "white");

let snowmanEyeLeft = drawing.append("circle")
    .attr("r", snowmanSize * 0.05)
    .attr("fill", "black");

let snowmanEyeRight = drawing.append("circle")
    .attr("r", snowmanSize * 0.05)
    .attr("fill", "black");

let snowmanMouth = drawing.append("line")
    .attr("stroke", "black")
    .attr("stroke-weight", 2);

/* Move snowman pieces into place */

snowmanBody
    .attr("cx", drawing.attr("width") / 2)
    .attr("cy", drawing.attr("height") - snowmanBody.attr("r"));

snowmanHead
    .attr("cx", snowmanBody.attr("cx"))
    .attr("cy", snowmanBody.attr("cy") - snowmanBody.attr("r"))

snowmanEyeLeft
    .attr("cx", snowmanHead.attr("cx") - (snowmanEyeLeft.attr("r") * 3))
    .attr("cy", snowmanHead.attr("cy") - (snowmanEyeLeft.attr("r") * 3))

snowmanEyeRight
    .attr("cx", Number(snowmanHead.attr("cx")) + (snowmanEyeLeft.attr("r") * 3))
    .attr("cy", snowmanHead.attr("cy") - (snowmanEyeLeft.attr("r") * 3))

snowmanMouth
    .attr("x1", snowmanHead.attr("cx") - (snowmanHead.attr("r") * .5))
    .attr("x2", Number(snowmanHead.attr("cx")) + (snowmanHead.attr("r") * .5))
    .attr("y1", snowmanHead.attr("cy") + (snowmanHead.attr("r") * .2))
    .attr("y2", snowmanMouth.attr("y1"))