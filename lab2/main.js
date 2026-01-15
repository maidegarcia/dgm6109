"use strict"

let drawingWidth = 500;
let drawingHeight = 500;

/*I'm taking the fishBodyBase1 coordinates as the point of reference*/

let fishX = drawingWidth/4; //Original 125
let fishY = drawingHeight/4; //Original 125

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight);

/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)
*/
let border = drawing.append("rect")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

/* The order of drawing is from the left to the right and from the top to the bottom*/

/* The order of the coordinates of the polygons are ALWAYS from the top to the bottom,
    and if two points coincide on the y axis, the first point coded will be the 
    one on the left*/

//TAIL

//Code for the tail

let fishTale = drawing.append("polygon")
    .attr("points", closedPolygon(15, 75, 
                                  75, 125, 
                                  15, 175
                                ))
    .attr("fill", "#F5B427");

//BODY

//Code for the fish's fins (the orange triangles that are at the top and at the bottom of the fish's body)

let fishTopFin = drawing.append("polygon")
     .attr("points", closedPolygon(85, 30,
                                   120, 75,
                                   175, 75
                                 ))    
     .attr("fill", "#F5B427");  
     
 let fishBottomFin = drawing.append("polygon")
     .attr("points", closedPolygon(120, 175,
                                   175, 175,
                                   115, 200
                                 ))    
     .attr("fill", "#F5B427");  

//Code for the fish's body base (the light blue part)

let fishBodyBase1 = drawing.append("circle")
    .attr("cx", fishX)//125
    .attr("cy", fishY)//125
    .attr("r", 50)
    .attr("fill", "#577AEB");

let fishBodyBase2 = drawing.append("rect")
    .attr("x", fishX)//125
    .attr("y", fishY - 50)//75
    .attr("width", 50)
    .attr("height", 100)
    .attr("fill", "#577AEB");

//Code for the fish's body details (the triangles of various colors)

let fishBodyTopDetail = drawing.append("polygon")
    .attr("points", closedPolygon(fishX + 50, fishY - 50,//175, 75
                                  fishX, fishY - 25,//125, 100
                                  fishX + 50, fishY//175, 125
                                ))
    .attr("fill", "yellow");

let fishBodyMidDetailLeft = drawing.append("polygon")
    .attr("points", closedPolygon(fishX, fishY - 25,//125, 100
                                  fishX - 50, fishY, //75, 125
                                  fishX, fishY + 25 //125, 150
                                ))
    .attr("fill", "#1D44D1");

let fishBodyMidDetailRight = drawing.append("polygon")
    .attr("points", closedPolygon(fishX, fishY - 25,//125, 100
                                  fishX + 50, fishY,//175, 125
                                  fishX, fishY + 25 //125, 150
                                 ))
     .attr("fill", "#1D44D1");

let fishBodyBottomDetail = drawing.append("polygon")
     .attr("points", closedPolygon(fishX + 50, fishY,//175, 125
                                   fishX, fishY + 25,//125, 150
                                   fishX + 50, fishY + 50//175, 175
                                 ))
     .attr("fill", "yellow");

//HEAD

//Code for the fish's head base (light blue part)

let fishHeadBase = drawing.append("polygon")
    .attr("points", closedPolygon(fishX + 50, fishY - 50, //175, 75
                                  fishX + 150, fishY, //275, 125
                                  fishX + 50, fishY + 50 //175, 175
                                ))
    .attr("fill", "#577AEB");

//Code for the fish's head details

let fishHeadDetail = drawing.append("polygon")
    .attr("points", closedPolygon(fishX + 100, fishY - 25, //225, 100
                                  fishX + 50, fishY, //175, 125
                                  fishX + 100, fishY + 25  //225, 150
                                 ))
     .attr("fill", "#1D44D1");    
     
let fishEye = drawing.append("circle")
    .attr("cx", fishX + 115) //240
    .attr("cy", fishY - 5)//120
    .attr("r", 5)
    .attr("fill", "black");