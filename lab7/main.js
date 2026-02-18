"use strict"

/* Configuration variables: drawing */
let svgWidth = 600;
let svgHeight = 400;
let margin = 25;

//Variables for data scaling

let maxstudyDuration = 600; // 600 minutes
let maxhabitsDuration = 600; // 600 minutes

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

let dataset = [{dailyStudyDuration: 210, dailyHabitsDuration: 555},
               {dailyStudyDuration: 150, dailyHabitsDuration: 495},
               {dailyStudyDuration: 510, dailyHabitsDuration: 435},
               {dailyStudyDuration: 195, dailyHabitsDuration: 341},
               {dailyStudyDuration: 317, dailyHabitsDuration: 355},
               {dailyStudyDuration: 0, dailyHabitsDuration: 428}
];

let xScale = d3.scaleLinear()
    .domain([0, 0])
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 0])
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 10)
    .attr("cx", function (value) {
        return value.dailyStudyDuration;
    })
    .attr("cy", function (value) {
        return value.dailyHabitsDuration;
    })

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("X axis label");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Y axis label")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/
let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("0,0");
