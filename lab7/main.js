"use strict"

/* Configuration variables: drawing */
let svgWidth = 600;
let svgHeight = 400;
let margin = 30;

//Variables for data scaling

let maxStudyDuration = 600; // 600 minutes
let maxHabitsDuration = 600; // 600 minutes

/* Resize  div to match width of visualization. */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw margin border. */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

let dataset = [{studyDuration: 210, habitsDuration: 555},
               {studyDuration: 150, habitsDuration: 495},
               {studyDuration: 510, habitsDuration: 435},
               {studyDuration: 195, habitsDuration: 341},
               {studyDuration: 317, habitsDuration: 355},
               {studyDuration: 0, habitsDuration: 428}
];

let xScale = d3.scaleLinear()
    .domain([0, maxStudyDuration])
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, maxHabitsDuration])
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 10)
    .attr("cx", function (value) {
        return xScale(value.studyDuration);
    })
    .attr("cy", function (value) {
        return yScale(value.habitsDuration);
    })

/**** label the axes ****/
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

/**** label key graph coordinates ****/
let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("0,0");

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