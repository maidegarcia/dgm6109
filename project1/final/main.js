"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    /* STEP 9: CHECK SELECT MENU OPTION HERE USING VARIABLE CHOICE */
    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
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

/*
The function below is called when the user presses the "Draw!" button and is where you will put most of your drawing code. Please follow the instructions in the homework PDF for this step.
*/

function drawImage() {

    // Step 5: Replace these with your configuration variables for your drawing
    let squareX = xInput;
    let squareY = yInput;

    // This is an example of extra (optional) variables to position a part of your drawing
    // Remove these comments and these example variables.
    let circleX = squareX+25;
    let circleY = squareY+25;

    // Step 6: Replace this code with your drawing code.

    // Step 10: Modify your drawing code to CONDITIONALLY draw part of your drawing based on
    // the choice the user made in your selection menu (stored in variable "choice" above)

    drawing.append("rect")
    .attr("width", 50)
    .attr("height", 50)
    .attr("fill", "green")
    .attr("x", squareX)
    .attr("y", squareY)
    
    drawing.append("circle")
    .attr('r', 25)
    .attr('fill', 'blue')
    .attr('cx', circleX)
    .attr('cy', circleY)

    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
