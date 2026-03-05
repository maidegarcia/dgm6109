"use strict"

/*To declare the size of the canvas and the margin*/
let svgWidth = 900;
let svgHeight = 680;

/* Margins' values */
let leftMargin = 80
let rightMargin = 25
let topMargin = 100
let bottomMargin = 60
//Variables for data scaling
let maxStudyDuration = 600;
let maxHabitsDuration = 300;
let maxSleepDuration = 600;
let minSleepDuration = 200;

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
    { studyDuration: 210, habitsDuration: 100, sleepDuration: 455, energyLevel: 4, classDay: false },
    { studyDuration: 150, habitsDuration: 130, sleepDuration: 365, energyLevel: 4, classDay: true },
    { studyDuration: 510, habitsDuration: 30, sleepDuration: 405, energyLevel: 3, classDay: false },
    { studyDuration: 195, habitsDuration: 31, sleepDuration: 310, energyLevel: 2, classDay: true },
    { studyDuration: 377, habitsDuration: 30, sleepDuration: 325, energyLevel: 5, classDay: false },
    { studyDuration: 0, habitsDuration: 138, sleepDuration: 290, energyLevel: 2, classDay: false },
    { studyDuration: 210, habitsDuration: 97, sleepDuration: 450, energyLevel: 4, classDay: false },
    { studyDuration: 103, habitsDuration: 0, sleepDuration: 305, energyLevel: 5, classDay: false },
    { studyDuration: 183, habitsDuration: 37, sleepDuration: 488, energyLevel: 4, classDay: true },
    { studyDuration: 553, habitsDuration: 57, sleepDuration: 345, energyLevel: 5, classDay: false },
    { studyDuration: 165, habitsDuration: 27, sleepDuration: 225, energyLevel: 2, classDay: true },
    { studyDuration: 223, habitsDuration: 114, sleepDuration: 290, energyLevel: 3, classDay: false },
    { studyDuration: 180, habitsDuration: 78, sleepDuration: 395, energyLevel: 5, classDay: false },
    { studyDuration: 50, habitsDuration: 121, sleepDuration: 430, energyLevel: 3, classDay: false },
    { studyDuration: 220, habitsDuration: 49, sleepDuration: 440, energyLevel: 4, classDay: false },
    { studyDuration: 35, habitsDuration: 37, sleepDuration: 445, energyLevel: 5, classDay: true },
    { studyDuration: 285, habitsDuration: 49, sleepDuration: 270, energyLevel: 4, classDay: false },
    { studyDuration: 30, habitsDuration: 0, sleepDuration: 345, energyLevel: 2, classDay: true },
    { studyDuration: 270, habitsDuration: 52, sleepDuration: 380, energyLevel: 3, classDay: false },
    { studyDuration: 0, habitsDuration: 41, sleepDuration: 315, energyLevel: 5, classDay: false },
    { studyDuration: 167, habitsDuration: 61, sleepDuration: 465, energyLevel: 4, classDay: false },
    { studyDuration: 67, habitsDuration: 110, sleepDuration: 455, energyLevel: 3, classDay: false },
    { studyDuration: 95, habitsDuration: 52, sleepDuration: 515, energyLevel: 5, classDay: true },
    { studyDuration: 59, habitsDuration: 52, sleepDuration: 385, energyLevel: 4, classDay: false },
    { studyDuration: 60, habitsDuration: 34, sleepDuration: 445, energyLevel: 3, classDay: true },
    { studyDuration: 169, habitsDuration: 152, sleepDuration: 395, energyLevel: 4, classDay: false },
    { studyDuration: 0, habitsDuration: 0, sleepDuration: 405, energyLevel: 4, classDay: false },
    { studyDuration: 0, habitsDuration: 60, sleepDuration: 386, energyLevel: 3, classDay: false },
    { studyDuration: 197, habitsDuration: 130, sleepDuration: 445, energyLevel: 3, classDay: false },
    { studyDuration: 0, habitsDuration: 70, sleepDuration: 455, energyLevel: 4, classDay: true },
    { studyDuration: 495, habitsDuration: 38, sleepDuration: 490, energyLevel: 3, classDay: true },
    { studyDuration: 0, habitsDuration: 32, sleepDuration: 290, energyLevel: 2, classDay: true },
    { studyDuration: 0, habitsDuration: 168, sleepDuration: 395, energyLevel: 4, classDay: false },
    { studyDuration: 0, habitsDuration: 145, sleepDuration: 455, energyLevel: 4, classDay: false },
    { studyDuration: 0, habitsDuration: 239, sleepDuration: 500, energyLevel: 5, classDay: false },
    { studyDuration: 399, habitsDuration: 91, sleepDuration: 485, energyLevel: 3, classDay: false },
    { studyDuration: 124, habitsDuration: 0, sleepDuration: 280, energyLevel: 2, classDay: true }
];

/*Array.sort() to present the data with largest circles in the back and smallest in front*/
dataset.sort(function (a, b) {
    if (a.sleepDuration <= b.sleepDuration) {
        return 1
    }
    return - 1
})


/*Defining the domain and the range for the x and y axes so that the values fit in the canvas*/
let xScale = d3.scaleLinear()
    .domain([0, maxStudyDuration])
    .range([leftMargin, svgWidth - rightMargin]);

let yScale = d3.scaleLinear()
    .domain([0, maxHabitsDuration])
    .range([svgHeight - bottomMargin, topMargin]);

/*Defining the domain and the range to scale the circles' radius*/
let rScale = d3.scaleSqrt()
    .domain([200, maxSleepDuration])
    .range([2, 35]);

/*Creating the circles that will represent the data*/
let circles = svg.selectAll("circle")
    .data(dataset.filter(function (value) { //I'm filtering the data to only visualize the days I did not have class
        return !value.classDay;
    })

    )
    .join("circle");

circles.attr("r", function (value) {
    return rScale(value.sleepDuration);
})
    .attr("cx", function (value) {
        return xScale(value.studyDuration);
    })
    .attr("cy", function (value) {
        return yScale(value.habitsDuration);
    })
    .attr("stroke", "black")
    .attr("fill", function (value) {
        if (value.energyLevel == 1) {
            return "yellow";
        }
        else if (value.energyLevel == 2) {
            return "orange";
        }
        else if (value.energyLevel == 3) {
            return "red";
        }
        else if (value.energyLevel == 4) {
            return "lightblue";
        }
        else if (value.energyLevel == 5) {
            return "green";
        }
    });

/* Drawing the x and y axis lines */

svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(600))
    .attr("y2", yScale(0))
    .attr("stroke", "black")

svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(0))
    .attr("y2", yScale(300))
    .attr("stroke", "black")

/*Drawing the x axis numbering values */
for (let i = 0; i <= 600; i = i + 25) {
    svg.append("text")
        .attr("x", xScale(i))
        .attr("y", svgHeight - bottomMargin + 20)
        .style("text-anchor", "middle")
        .style("alignment-baseline", "before-edge")
        .text(i)
}

/* Drawing the y axis numbering values */
for (let i = 0; i <= 300; i = i + 25) {
    svg.append("text")
        .attr("x", leftMargin - 35)
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
    .text("Study duration (minutes)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", leftMargin / 4-7)
    .style("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    .text("Habits duration (minutes)")
    .attr("transform", "rotate(-90)")

/*Drawing the key of the visualization of the energy levels*/

svg.append("text")
    .text("Energy Level (1-5)")
    .style("text-anchor", "middle")
    .attr("x", svgWidth / 2)
    .attr("y", topMargin - 75);

for (let i = 1; i <= 5; i++) {
    svg.append("circle")
        .attr("r", rScale(300))
        .attr("cx", leftMargin + 280 + i * 30)
        .attr("cy", topMargin - 25)
        .attr("stroke", "black")
        .attr("fill", function () {
            if (i == 1) {
                return "yellow";
            }
            else if (i == 2) {
                return "orange";
            }
            else if (i == 3) {
                return "red";
            }
            else if (i == 4) {
                return "lightblue";
            }
            else {
                return "green";
            }
        });

    svg.append("text")
        .text(i)
        .style("text-anchor", "middle")
        .attr("x", leftMargin + 280 + i * 30)
        .attr("y", topMargin - 40);
}

/*Drawing the key of the visualization of the sleep duration*/

svg.append("text")
    .text("Sleep duration (minutes)")
    .style("text-anchor", "middle")
    .attr("x", svgWidth / 2 +200)
    .attr("y", topMargin - 75);

svg.append("text")
    .text("200")
    .style("text-anchor", "middle")
    .attr("x", svgWidth / 2+150)
    .attr("y", topMargin - 25);

svg.append("text")
    .text("600")
    .style("text-anchor", "middle")
    .attr("x", svgWidth / 2 +250)
    .attr("y", topMargin - 25);

svg.append("circle")
    .attr("r", rScale(minSleepDuration))
    .attr("cx", leftMargin + 500)
    .attr("cy", topMargin - 25)
    .attr("stroke", "black")
    .attr("fill", "gray");

svg.append("circle")
    .attr("r", rScale(maxSleepDuration))
    .attr("cx", leftMargin + 570)
    .attr("cy", topMargin - 25)
    .attr("stroke", "black")
    .attr("fill", "gray");

/*Drawing a box for the keys*/
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", 400)
    .attr("height", 115)
    .attr("x", leftMargin + 280)
    .attr("y", topMargin - 93)




