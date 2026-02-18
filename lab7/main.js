"use strict"

/*To declare the size of the canvas and the margin*/
let svgWidth = 600;
let svgHeight = 400;
let margin = 30;//Originally it was 25, but I changed it so the circle that has an x=0 didn't overlap with the label of the y axis

//Variables for data scaling
let maxStudyDuration = 600; // 600 minutes
let maxHabitsDuration = 600; // 600 minutes

/*To make the div with the id "container" to match the size of the canvas*/
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/*To create the canvas where the the data will be shown*/
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/*To make a black border for the canvas*/
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/*To create a visible border for the margin*/
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/*Data collection values*/
let dataset = [{studyDuration: 210, habitsDuration: 555},
               {studyDuration: 150, habitsDuration: 495},
               {studyDuration: 510, habitsDuration: 435},
               {studyDuration: 195, habitsDuration: 341},
               {studyDuration: 317, habitsDuration: 355},
               {studyDuration: 0, habitsDuration: 428}
];

/*Defining the domain and the range foe the x and y axes so that the values fit in the canvas*/
let xScale = d3.scaleLinear()
    .domain([0, maxStudyDuration])
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, maxHabitsDuration])
    .range([svgHeight - margin, margin]);

/*Creating the circles that will represent the data*/
let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 10)
    .attr("cx", function (value) {
        return xScale(value.studyDuration); //By putting the value inside the parenthesis, the data will be scaled to fit in the canvas
    })
    .attr("cy", function (value) {
        return yScale(value.habitsDuration);//By putting the value inside the parenthesis, the data will be scaled to fit in the canvas
    })

/*Labelling of the x and y axes to clarify what is the data that is shown*/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Daily study duration (minutes)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Daily habits duration (minutes)")
    .attr("transform", "rotate(-90)");

/*Labelling for the origin point for both axes*/
let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("0,0");

/*Labelling for the maximum values in the x and y axes respectively*/
let xMaxLabel = svg.append("text")
    .attr("x", xScale(maxStudyDuration))
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text(String(maxStudyDuration));

let yMaxLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", yScale(maxHabitsDuration))
    .attr("text-anchor", "end")
    .text(String(maxHabitsDuration));