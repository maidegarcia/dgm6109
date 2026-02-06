"use strict"

/* ************ function drawFish () *****
PURPOSE:
Gets the data from the form and draws a fish in a sepecific position depending on the input of the user.
It can also show the origin point of the svgArea if the user wants it to.


PARAMETERS:
svgArea: the SVG svgArea area
fishX: the horizontal position of the svgArea
fishY: the vertical position of the svgArea
originVisible: a value that determines if the origin point of the svgArea will be visible

RETURNS:
The SVG svgArea area
****************************************************************** */


function drawFish(svgArea, fishX, fishY, originVisible, choice) {


    /*I'm taking the fishBodyBase1 coordinates as the point of reference*/

    /* The order of the coordinates of the polygons are ALWAYS from the top to the bottom,
    and if two points coincide on the y axis, the first point coded will be the 
    one on the left*/

    if (choice == "0") { //The fish is going to be in the original design, which I called "calm" state

        //Code for the fish's body base (the light blue part)

        let fishBodyBase1 = svgArea.append("circle")
            .attr("cx", fishX)//125
            .attr("cy", fishY)//125
            .attr("r", 50)
            .attr("fill", "#577AEB");

        let fishBodyBase2 = svgArea.append("rect")
            .attr("x", fishX)//Original 125
            .attr("y", fishY - 50)//Original 75
            .attr("width", 50)
            .attr("height", 100)
            .attr("fill", "#577AEB");

        //Code for the fish's body details (the triangles of various colors)

        let fishBodyMidDetailLeft = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
                fishX - 50, fishY, //Original 75, 125
                fishX, fishY + 25 //Original 125, 150
            ))
            .attr("fill", "#1D44D1");

        let fishBodyMidDetailRight = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
                fishX + 50, fishY,//Original 175, 125
                fishX, fishY + 25 //Original 125, 150
            ))
            .attr("fill", "#1D44D1");

        //Code for the fish's head base (light blue part)

        let fishHeadBase = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX + 50, fishY - 50, //Original 175, 75
                fishX + 150, fishY, //Original 275, 125
                fishX + 50, fishY + 50 //Original 175, 175
            ))
            .attr("fill", "#577AEB");

        //Code for the fish's head detail

        let fishHeadDetail = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX + 100, fishY - 25, //Original 225, 100
                fishX + 50, fishY, //Original 175, 125
                fishX + 100, fishY + 25  //Original 225, 150
            ))
            .attr("fill", "#1D44D1");

    }

    else { //The fish is going to be on an "angry" state, it will change colors, have an eyebrow to make it look angry face and a bat to hit its enemies

        //Code for the fish's body base (the light blue part)

        let fishBodyBase1 = svgArea.append("circle")
            .attr("cx", fishX)//125
            .attr("cy", fishY)//125
            .attr("r", 50)
            .attr("fill", "#C90A0A");

        let fishBodyBase2 = svgArea.append("rect")
            .attr("x", fishX)//Original 125
            .attr("y", fishY - 50)//Original 75
            .attr("width", 50)
            .attr("height", 100)
            .attr("fill", "#C90A0A");

        //Code for the fish's body details (the triangles of various colors)   

        let fishBodyMidDetailLeft = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
                fishX - 50, fishY, //Original 75, 125
                fishX, fishY + 25 //Original 125, 150
            ))
            .attr("fill", "#C94D0A");

        let fishBodyMidDetailRight = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
                fishX + 50, fishY,//Original 175, 125
                fishX, fishY + 25 //Original 125, 150
            ))
            .attr("fill", "#C94D0A");

        //Code for the fish's head base (light blue part)

        let fishHeadBase = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX + 50, fishY - 50, //Original 175, 75
                fishX + 150, fishY, //Original 275, 125
                fishX + 50, fishY + 50 //Original 175, 175
            ))
            .attr("fill", "#C90A0A");

        //Code for the fish's head detail

        let fishHeadDetail = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX + 100, fishY - 25, //Original 225, 100
                fishX + 50, fishY, //Original 175, 125
                fishX + 100, fishY + 25  //Original 225, 150
            ))
            .attr("fill", "#C94D0A");

        //Code for the fish's eyebrow

        let fishEyeBrow = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX + 105, fishY - 19, //Original 230, 106
                fishX + 117, fishY - 13, //Original 242, 112
                fishX + 105, fishY - 16  //Original 230, 109
            ))
            .attr("fill", "black");

        //Code for the fish's bat

        let fishBat1 = svgArea.append("polygon")
            .attr("points", closedPolygon(fishX + 50, fishY + 50, //Original 175, 175
                fishX + 100, fishY + 75, //Original 225, 200
                fishX + 75, fishY + 100  //Original 200, 225
            ))
            .attr("fill", "#CFA865");

        let fishBat2 = svgArea.append("circle")
            .attr("cx", fishX + 87.5)// Original 212.5
            .attr("cy", fishY + 87.5)//Original 212.5
            .attr("r", 17.5)
            .attr("fill", "#CFA865");

    }

    //Shapes that remain unchanged

    //Code for the tail

    let fishTail = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX - 100, fishY - 50, // Original 15, 75
            fishX - 50, fishY, //Original 75, 125
            fishX - 100, fishY + 50 //Original 15, 175
        ))
        .attr("fill", "#F5B427");

    //Code for the fish's fins (the orange triangles that are at the top and at the bottom of the fish's body)

    let fishTopFin = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX - 40, fishY - 95,//Orignal 85, 30
            fishX - 5, fishY - 50, //Original 120, 75
            fishX + 50, fishY - 50 //Original 175, 75
        ))
        .attr("fill", "#F5B427");

    let fishBottomFin = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX - 5, fishY + 50, //Original 120, 175
            fishX + 50, fishY + 50, //Original 175, 175
            fishX - 10, fishY + 75 //Original 115, 200
        ))
        .attr("fill", "#F5B427");

    //Code for the fish's body details (the yellow triangles that don't change)

    let fishBodyTopDetail = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX + 50, fishY - 50,//Original 175, 75
            fishX, fishY - 25,//Original 125, 100
            fishX + 50, fishY//Original 175, 125
        ))
        .attr("fill", "yellow");

    let fishBodyBottomDetail = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX + 50, fishY,//Original 175, 125
            fishX, fishY + 25,//Original 125, 150
            fishX + 50, fishY + 50//Original 175, 175
        ))
        .attr("fill", "yellow");

    //Code for the fish's eye

    let fishEye = svgArea.append("circle")
        .attr("cx", fishX + 115) //Original 240
        .attr("cy", fishY - 5)//Original 120
        .attr("r", 5)
        .attr("fill", "black");

    if (originVisible == true) {

        let originPoint = svgArea.append("circle")
            .attr("cx", fishX)//125
            .attr("cy", fishY)//125
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    return svgArea;

}