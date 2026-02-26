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
let maxStudyDuration = 600
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

/* To make the margin visible */
// svg.append("rect")
//     .attr("fill", "none")
//     .attr("stroke", "black")
//     .attr("stroke-dasharray", "5")
//     .attr("x", leftMargin)
//     .attr("y", topMargin)
//     .attr("width", svgWidth - (leftMargin + rightMargin))
//     .attr("height", svgHeight - (topMargin + bottomMargin))


/*Data collection values*/
let dataset = [
    { studyDuration: 210, sleepDuration: 455, energyLevel: 4, classDay: false },
    { studyDuration: 150, sleepDuration: 365, energyLevel: 4, classDay: true },
    { studyDuration: 510, sleepDuration: 405, energyLevel: 3, classDay: false },
    { studyDuration: 195, sleepDuration: 310, energyLevel: 2, classDay: true },
    { studyDuration: 377, sleepDuration: 325, energyLevel: 5, classDay: false },
    { studyDuration: 0, sleepDuration: 290, energyLevel: 2, classDay: false },
    { studyDuration: 210, sleepDuration: 450, energyLevel: 4, classDay: false },
    { studyDuration: 103, sleepDuration: 305, energyLevel: 5, classDay: false },
    { studyDuration: 183, sleepDuration: 488, energyLevel: 4, classDay: true },
    { studyDuration: 553, sleepDuration: 345, energyLevel: 5, classDay: false },
    { studyDuration: 165, sleepDuration: 225, energyLevel: 2, classDay: true },
    { studyDuration: 223, sleepDuration: 290, energyLevel: 3, classDay: false },
    { studyDuration: 180, sleepDuration: 395, energyLevel: 5, classDay: false },
    { studyDuration: 50, sleepDuration: 430, energyLevel: 3, classDay: false },
    { studyDuration: 220, sleepDuration: 440, energyLevel: 4, classDay: false },
    { studyDuration: 35, sleepDuration: 445, energyLevel: 5, classDay: true },
    { studyDuration: 285, sleepDuration: 270, energyLevel: 2, classDay: false },
    { studyDuration: 30, sleepDuration: 345, energyLevel: 2, classDay: true },
    { studyDuration: 270, sleepDuration: 380, energyLevel: 3, classDay: false },
    { studyDuration: 0, sleepDuration: 315, energyLevel: 3, classDay: false },
    { studyDuration: 167, sleepDuration: 465, energyLevel: 4, classDay: false },
    { studyDuration: 67, sleepDuration: 455, energyLevel: 3, classDay: false },
    { studyDuration: 95, sleepDuration: 515, energyLevel: 5, classDay: true },
    { studyDuration: 59, sleepDuration: 385, energyLevel: 4, classDay: false },
    { studyDuration: 60, sleepDuration: 445, energyLevel: 3, classDay: true },
    { studyDuration: 169, sleepDuration: 395, energyLevel: 4, classDay: false },
    { studyDuration: 0, sleepDuration: 405, energyLevel: 4, classDay: false },
    { studyDuration: 0, sleepDuration: 386, energyLevel: 1, classDay: false },
    { studyDuration: 197, sleepDuration: 445, energyLevel: 3, classDay: false },
    { studyDuration: 0, sleepDuration: 455, energyLevel: 4, classDay: true }
];

/*Attempt of using d3.min() and d3.max() to change the domain values*/
// let minStudyDuration = d3.min(dataset, function(value){return value.studyDuration})
// let maxStudyDuration = d3.max(dataset, function(value){return value.studyDuration})

// let minSleepDuration = d3.min(dataset, function(value){return value.sleepDuration})
// let maxSleepDuration = d3.max(dataset, function(value){return value.sleepDuration})

// let minEnergyLevel = d3.min(dataset, function(value){return value.energyLevel})
// let maxEnergyLevel = d3.max(dataset, function(value){return value.energyLevel})

/*Array.sort() to present the data with largest circles in the back and smallest in front*/
dataset.sort(function (a, b) {
    if (a.energyLevel <= b.energyLevel) {
        return 1
    }
    return - 1
})


/*Defining the domain and the range for the x and y axes so that the values fit in the canvas*/
let xScale = d3.scaleLinear()
    .domain([0, maxStudyDuration])
    .range([leftMargin, svgWidth - rightMargin]);

let yScale = d3.scaleLinear()
    .domain([200, maxSleepDuration])
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
        return xScale(value.studyDuration); //By putting the value inside the parenthesis, the data will be scaled to fit in the canvas
    })
    .attr("cy", function (value) {
        return yScale(value.sleepDuration);//By putting the value inside the parenthesis, the data will be scaled to fit in the canvas
    })
    .attr("fill", function (value) {
        if (value.classDay) {
            return "orange"
        }
        else {
            return "lightblue"
        }
    })
    .attr("stroke", "black");

/* Drawing the x and y axis lines */

svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(200))
    .attr("x2", xScale(600))
    .attr("y2", yScale(200))
    .attr("stroke", "black")

svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(200))
    .attr("x2", xScale(0))
    .attr("y2", yScale(530))
    .attr("stroke", "black")

/*Drawing the x axis numbering values */
for (let i = 0; i <= 600; i = i + 20) {
    svg.append("text")
        .attr("x", xScale(i))
        .attr("y", svgHeight - bottomMargin)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "before-edge")
        .text(i)
}

/* Drawing the y axis numbering values */
for (let i = 200; i <= 530; i = i + 15) {
    svg.append("text")
        .attr("x", leftMargin - 20)
        .attr("y", yScale(i))
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .text(i)
}

/*Labelling of the x and y axes to clarify what is the data that is shown*/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - bottomMargin / 4)
    .attr("text-anchor", "middle")
    .text("Daily study duration (minutes)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", leftMargin / 4)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Sleep duration (minutes)")
    .attr("transform", "rotate(-90)")


/*Drawing the key of the visualization of the energy levels*/

svg.append("text")
    .text("Energy Level (1-5)")
    .attr("text-anchor", "middle")
    .attr("x", 180)
    .attr("y", topMargin - 75)

for (let i = 1; i <= 5; i++) { //This is a loop to help me create the key, in each repetition it creates a circle and a label, with each repetition the circle changes its size
    svg.append("circle")
        .attr("r", rScale(i))
        .attr("cx", leftMargin + i * 30)
        .attr("cy", topMargin - 50)
        .attr("fill", "gray")

    svg.append("text")
        .text(i)
        .attr("text-anchor", "middle")
        .attr("x", leftMargin + i * 30)
        .attr("y", topMargin - 10)
}

/*Drawing the key of the visualization of the color that indicate if I had classes or not*/

svg.append("text")
    .text("Did I have classes?")
    .attr("text-anchor", "middle")
    .attr("x", leftMargin + 300)
    .attr("y", topMargin - 75)

svg.append("circle")
    .attr("r", rScale(3))
    .attr("cx", leftMargin + 280)
    .attr("cy", topMargin - 50)
    .attr("fill", "orange")
    .attr("stroke", "black")

svg.append("text")
    .text("Yes")
    .attr("text-anchor", "middle")
    .attr("x", leftMargin + 280)
    .attr("y", topMargin - 10)

svg.append("circle")
    .attr("r", rScale(3))
    .attr("cx", leftMargin + 330)
    .attr("cy", topMargin - 50)
    .attr("fill", "lightblue")
    .attr("stroke", "black")

svg.append("text")
    .text("No")
    .attr("text-anchor", "middle")
    .attr("x", leftMargin + 330)
    .attr("y", topMargin - 10)

/*Drawing a box for the keys*/
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", 380)
    .attr("height", 86)
    .attr("x", leftMargin + 15)
    .attr("y", topMargin - 93)

