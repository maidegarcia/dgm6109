"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    choice = document.getElementById("mood").value;
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

    let fishX = xInput; //Original point 125
    let fishY = yInput; //Original point 125

    if (choice == "0") {

        //Code for the fish's body base (the light blue part)

        let fishBodyBase1 = drawing.append("circle")
            .attr("cx", fishX)//125
            .attr("cy", fishY)//125
            .attr("r", 50)
            .attr("fill", "#577AEB");

        let fishBodyBase2 = drawing.append("rect")
            .attr("x", fishX)//Original 125
            .attr("y", fishY - 50)//Original 75
            .attr("width", 50)
            .attr("height", 100)
            .attr("fill", "#577AEB");

        //Code for the fish's body details (the triangles of various colors)

        let fishBodyMidDetailLeft = drawing.append("polygon")
            .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
                fishX - 50, fishY, //Original 75, 125
                fishX, fishY + 25 //Original 125, 150
            ))
            .attr("fill", "#1D44D1");

        let fishBodyMidDetailRight = drawing.append("polygon")
            .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
                fishX + 50, fishY,//Original 175, 125
                fishX, fishY + 25 //Original 125, 150
            ))
            .attr("fill", "#1D44D1");



        //HEAD

        //Code for the fish's head base (light blue part)

        let fishHeadBase = drawing.append("polygon")
            .attr("points", closedPolygon(fishX + 50, fishY - 50, //Original 175, 75
                fishX + 150, fishY, //Original 275, 125
                fishX + 50, fishY + 50 //Original 175, 175
            ))
            .attr("fill", "#577AEB");

        //Code for the fish's head details

        let fishHeadDetail = drawing.append("polygon")
            .attr("points", closedPolygon(fishX + 100, fishY - 25, //Original 225, 100
                fishX + 50, fishY, //Original 175, 125
                fishX + 100, fishY + 25  //Original 225, 150
            ))
            .attr("fill", "#1D44D1");


    }

    else {

        //BODY

        //Code for the fish's fins (the orange triangles that are at the top and at the bottom of the fish's body


        let fishBodyBase1 = drawing.append("circle")
            .attr("cx", fishX)//125
            .attr("cy", fishY)//125
            .attr("r", 50)
            .attr("fill", "#C90A0A");

        let fishBodyBase2 = drawing.append("rect")
            .attr("x", fishX)//Original 125
            .attr("y", fishY - 50)//Original 75
            .attr("width", 50)
            .attr("height", 100)
            .attr("fill", "#C90A0A");

        let fishBodyMidDetailLeft = drawing.append("polygon")
            .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
                fishX - 50, fishY, //Original 75, 125
                fishX, fishY + 25 //Original 125, 150
            ))
            .attr("fill", "#C94D0A");

        let fishBodyMidDetailRight = drawing.append("polygon")
            .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
                fishX + 50, fishY,//Original 175, 125
                fishX, fishY + 25 //Original 125, 150
            ))
            .attr("fill", "#C94D0A");

        //HEAD

        let fishHeadBase = drawing.append("polygon")
            .attr("points", closedPolygon(fishX + 50, fishY - 50, //Original 175, 75
                fishX + 150, fishY, //Original 275, 125
                fishX + 50, fishY + 50 //Original 175, 175
            ))
            .attr("fill", "#C90A0A");

        let fishHeadDetail = drawing.append("polygon")
            .attr("points", closedPolygon(fishX + 100, fishY - 25, //Original 225, 100
                fishX + 50, fishY, //Original 175, 125
                fishX + 100, fishY + 25  //Original 225, 150
            ))
            .attr("fill", "#C94D0A");

        let fishEyeBrow = drawing.append("polygon")
            .attr("points", closedPolygon(230, 104, //Original 230, 106
                242, 112, //Original 242, 112
                230, 107  //Original 230, 110
            ))
            .attr("fill", "black");

        let fishBat1 = drawing.append("polygon")
            .attr("points", closedPolygon(175, 175, //Original 230, 106
                225, 200, //Original 242, 112
                200, 225  //Original 230, 110
            ))
            .attr("fill", "#CFA865");

            let fishBat2 = drawing.append("circle")
            .attr("cx", 212,5)//125
            .attr("cy", 212,5)//125
            .attr("r", 17,5)
            .attr("fill", "#CFA865");

    }

    //Code for the tail

    let fishTale = drawing.append("polygon")
        .attr("points", closedPolygon(fishX - 100, fishY - 50, // Original 15, 75
            fishX - 50, fishY, //Original 75, 125
            fishX - 100, fishY + 50 //Original 15, 175
        ))
        .attr("fill", "#F5B427");

    //Code for the fish's fins (the orange triangles that are at the top and at the bottom of the fish's body)

    let fishTopFin = drawing.append("polygon")
        .attr("points", closedPolygon(fishX - 40, fishY - 95,//Orignal 85, 30
            fishX - 5, fishY - 50, //Original 120, 75
            fishX + 50, fishY - 50 //Original 175, 75
        ))
        .attr("fill", "#F5B427");

    let fishBottomFin = drawing.append("polygon")
        .attr("points", closedPolygon(fishX - 5, fishY + 50, //Original 120, 175
            fishX + 50, fishY + 50, //Original 175, 175
            fishX - 10, fishY + 75 //Original 115, 200
        ))
        .attr("fill", "#F5B427");

    let fishBodyTopDetail = drawing.append("polygon")
        .attr("points", closedPolygon(fishX + 50, fishY - 50,//Original 175, 75
            fishX, fishY - 25,//Original 125, 100
            fishX + 50, fishY//Original 175, 125
        ))
        .attr("fill", "yellow");


    let fishBodyBottomDetail = drawing.append("polygon")
        .attr("points", closedPolygon(fishX + 50, fishY,//Original 175, 125
            fishX, fishY + 25,//Original 125, 150
            fishX + 50, fishY + 50//Original 175, 175
        ))
        .attr("fill", "yellow");

    let fishEye = drawing.append("circle")
        .attr("cx", fishX + 115) //Original 240
        .attr("cy", fishY - 5)//Original 120
        .attr("r", 5)
        .attr("fill", "black");

    // Step 10: Modify your drawing code to CONDITIONALLY draw part of your drawing based on
    // the choice the user made in your selection menu (stored in variable "choice" above)

    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
