"use strict"

/*To declare the size of the canvas and the margin*/
let svgWidth = 900;
let svgHeight = 675;

/* Margins' values */
let leftMargin = 80
let rightMargin = 25
let topMargin = 100
let bottomMargin = 60

/*Max values for the scaling */
let maxFrenchDuration = 100
let maxSleepDuration = 530

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

/*Data collection values*/
let dataset = [
    { frenchDuration: 70, sleepDuration: 455, energyLevel: 4 },
    { frenchDuration: 70, sleepDuration: 365, energyLevel: 4 },
    { frenchDuration: 0, sleepDuration: 405, energyLevel: 3 },
    { frenchDuration: 31, sleepDuration: 310, energyLevel: 2 },
    { frenchDuration: 0, sleepDuration: 325, energyLevel: 5 },
    { frenchDuration: 25, sleepDuration: 290, energyLevel: 2 },
    { frenchDuration: 67, sleepDuration: 450, energyLevel: 4 },
    { frenchDuration: 0, sleepDuration: 305, energyLevel: 5 },
    { frenchDuration: 0, sleepDuration: 488, energyLevel: 4 },
    { frenchDuration: 22, sleepDuration: 345, energyLevel: 5 },
    { frenchDuration: 27, sleepDuration: 225, energyLevel: 2 },
    { frenchDuration: 38, sleepDuration: 290, energyLevel: 3 },
    { frenchDuration: 20, sleepDuration: 395, energyLevel: 5 },
    { frenchDuration: 73, sleepDuration: 430, energyLevel: 3 },
    { frenchDuration: 22, sleepDuration: 440, energyLevel: 4 },
    { frenchDuration: 37, sleepDuration: 445, energyLevel: 5 },
    { frenchDuration: 0, sleepDuration: 270, energyLevel: 2 },
    { frenchDuration: 0, sleepDuration: 345, energyLevel: 2 },
    { frenchDuration: 36, sleepDuration: 380, energyLevel: 3 },
    { frenchDuration: 41, sleepDuration: 315, energyLevel: 3 },
    { frenchDuration: 40, sleepDuration: 465, energyLevel: 4 },
    { frenchDuration: 63, sleepDuration: 455, energyLevel: 3 },
    { frenchDuration: 32, sleepDuration: 515, energyLevel: 5 },
    { frenchDuration: 33, sleepDuration: 385, energyLevel: 4 },
    { frenchDuration: 34, sleepDuration: 445, energyLevel: 3 },
    { frenchDuration: 80, sleepDuration: 395, energyLevel: 4 },
    { frenchDuration: 0, sleepDuration: 405, energyLevel: 4 },
    { frenchDuration: 0, sleepDuration: 386, energyLevel: 1 },
    { frenchDuration: 30, sleepDuration: 445, energyLevel: 3 },
    { frenchDuration: 40, sleepDuration: 455, energyLevel: 4 },
    { frenchDuration: 18, sleepDuration: 490, energyLevel: 4 },
    { frenchDuration: 32, sleepDuration: 290, energyLevel: 2 },
    { frenchDuration: 62, sleepDuration: 395, energyLevel: 4 },
    { frenchDuration: 32, sleepDuration: 455, energyLevel: 4 },
    { frenchDuration: 95, sleepDuration: 500, energyLevel: 5 },
    { frenchDuration: 91, sleepDuration: 485, energyLevel: 4 },
    { frenchDuration: 0, sleepDuration: 280, energyLevel: 2 }
];

/*Array.sort() to present the data with largest circles in the back and smallest in front*/
dataset.sort(function (a, b) {
    if (a.energyLevel <= b.energyLevel) {
        return 1
    }
    return - 1
})


/*Defining the domain and the range for the x and y axes so that the values fit in the canvas*/
let xScale = d3.scaleLinear()
    .domain([200, maxSleepDuration])
    .range([leftMargin, svgWidth - rightMargin]);

let yScale = d3.scaleLinear()
    .domain([0, maxFrenchDuration])
    .range([svgHeight - bottomMargin, topMargin]);

/*Defining the domain and the range to scale the circles' radius*/
let rScale = d3.scaleSqrt()
    .domain([1, 5])
    .range([5, 15]);

/*Creating the circles that will represent the data*/
let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", function (value) {
    return rScale(value.energyLevel);
})
    .attr("cx", function (value) {
        return xScale(value.sleepDuration);
    })
    .attr("cy", function (value) {
        return yScale(value.frenchDuration);
    })
    .attr("fill", "lightblue")
    .attr("stroke", "black");

/* Drawing the x and y axis lines */

svg.append("line")
    .attr("x1", xScale(200))
    .attr("y1", yScale(0))
    .attr("x2", xScale(530))
    .attr("y2", yScale(0))
    .attr("stroke", "black")

svg.append("line")
    .attr("x1", xScale(200))
    .attr("y1", yScale(0))
    .attr("x2", xScale(200))
    .attr("y2", yScale(100))
    .attr("stroke", "black")

/*Drawing the x axis numbering values */
for (let i = 200; i <= 530; i = i + 15) {
    svg.append("text")
        .attr("x", xScale(i))
        .attr("y", svgHeight - bottomMargin + 20)
        .style("text-anchor", "middle")
        .style("alignment-baseline", "before-edge")
        .text(i)
}

/* Drawing the y axis numbering values */
for (let i = 0; i <= 100; i = i + 5) {
    svg.append("text")
        .attr("x", leftMargin - 20)
        .attr("y", yScale(i))
        .style("text-anchor", "end")
        .style("alignment-baseline", "middle")
        .text(i)
}

/*Labelling of the x and y axes to clarify what is the data that is shown*/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - bottomMargin / 4 + 10)
    .style("text-anchor", "middle")
    .text("Sleep duration (minutes)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", leftMargin / 4)
    .style("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    .text("French duration (minutes)")
    .attr("transform", "rotate(-90)")


/*Drawing the key of the visualization of the energy levels*/

svg.append("text")
    .text("Energy Level (1-5)")
    .style("text-anchor", "middle")
    .attr("x", 180)
    .attr("y", topMargin - 75);

for (let i = 1; i <= 5; i++) {
    svg.append("circle")
        .attr("r", rScale(i))
        .attr("cx", leftMargin + i * 30)
        .attr("cy", topMargin - 50)
        .attr("fill", "gray")
        .attr("stroke", "black")

    svg.append("text")
        .text(i)
        .style("text-anchor", "middle")
        .attr("x", leftMargin + i * 30)
        .attr("y", topMargin - 10)
}

/*Drawing a box for the keys*/
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", 180)
    .attr("height", 86)
    .attr("x", leftMargin + 15)
    .attr("y", topMargin - 93)
