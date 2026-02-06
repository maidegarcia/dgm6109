"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice, origin;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    origin = document.getElementById("origin").value;
    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawFish(drawing, xInput, yInput, origin);
}

/* set up the drawing canvas - Be sure not to copy this code from your draft project! */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

