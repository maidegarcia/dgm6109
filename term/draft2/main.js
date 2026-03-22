"use strict"


let svgWidth = 2000
let svgHeight = 750

/* Margins*/


let topMargin = 30;
let rightMargin = 30;
let bottomMargin = 140;
let leftMargin = 80;



let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")



/*Global variables*/

let data, xAxis, yAxis, xScale, yScale, rScale, xAxisLabel, yAxisLabel
let allDates = []; //All the dates in my data
let isWeekend = [];
let isClassDay = [];
let isFreeDay = [];



/* To load my data and pass it to the function buildVisualization*/

(async function () {
    data = await d3.json("data.json").then(buildVisualization)
})();


/*To receive data from the JSON file and store it*/

function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);
    drawVisualization(renderData, svg);
    return data;
}

/*Scale functions*/

function buildScales(data) {

    xScale = d3.scalePoint()
        .domain(allDates)
        .range([leftMargin + 20, svgWidth - rightMargin])

    yScale = d3.scaleLinear()
        .domain([0, 600])
        .range([svgHeight - bottomMargin, topMargin])

    // rScale = d3.scaleSqrt()
    // .domain([1, 5])
    // .range([4, 15]);

}

/*To organize the data through any data manipulation*/

function organizeData(data) {

    allDates = data.map(function (value) { //To create an Array with only the dates in my data
        return value.date;
    });

    allDates.sort(function (a, b) { // To make sure all the dates are in the same format and organized properly
        if (new Date(a) > new Date(b)) {
            return 1;
        } else {
            return -1;
        }
    })

    isWeekend = data.filter(function (value) {
        return (value.typeOfDay == "weekend");
    })

    isClassDay = data.filter(function (value) {
        return (value.typeOfDay == "class");
    })

    isFreeDay = data.filter(function (value) {
        return (value.typeOfDay == "free");
    })


    return data;


}

/*To draw the data visualization*/

function drawVisualization(data, drawing) {

    /*X and Y axis elements */
    xAxis = svg.append("g")
        .classed("x-axis text", true)
        .attr("transform", `translate(0, ${svgHeight - bottomMargin})`)
        .call(d3.axisBottom().scale(xScale).tickSize(22))
        .selectAll("text.allDates")


    yAxis = svg.append("g")
        .classed("y-axis text", true)
        .attr("transform", `translate (${leftMargin},0)`)
        .call(d3.axisLeft().scale(yScale).tickSize(9))


    /*X and Y axis labels */
    xAxisLabel = svg.append("text")
        .classed("axisLabel", true)
        .attr("x", svgWidth / 2)
        .attr("y", svgHeight - bottomMargin / 8)
        .style("text-anchor", "middle")
        .text("Dates (mm/dd/yy)");

    yAxisLabel = svg.append("text")
        .classed("axisLabel", true)
        .attr("x", -svgHeight / 2)
        .attr("y", leftMargin / 4)
        .style("text-anchor", "middle")
        .text("Studying Duration (minutes)")
        .attr("transform", "rotate(-90)")

    /*Drawing the stems*/

    svg.selectAll("line.stem")
        .data(data)
        .join("line")
        .classed("stem", true)
        .attr("x1", function (value) {
            return xScale(value.date);
        })
        .attr("y1", yScale(0))
        .attr("x2", function (value) {
            return xScale(value.date);
        })
        .attr("y2", function (value) {
            return yScale(value.studyingSession);
        })
        .attr("stroke", "green")
        .attr("stroke-width", "4")



    /*Drawing the circles for the petals (habits)*/

    let musicColor = "orange";
    let frenchColor = "red";
    let readingColor = "blue";
    let sleepingColor = "purple";

    svg.selectAll("circle.music")
        .data(isFreeDay)
        .join("circle")
        .classed("music", true)
        .attr("r", 10)
        .attr("cx", function (value) {
            return xScale(value.date) + 10;
        })
        .attr("cy", function (value) {
            return yScale(value.studyingSession) + 10;
        })
        .attr("fill", function (value) {
            if (value.musicSession > 0) {
                return musicColor;
            }
            return "none";
        })


    svg.selectAll("circle.french")
        .data(isFreeDay)
        .join("circle")
        .classed("french", true)
        .attr("r", 10)
        .attr("cx", function (value) {
            return xScale(value.date) + 10;
        })
        .attr("cy", function (value) {
            return yScale(value.studyingSession) - 10;
        })
        .attr("fill", function (value) {
            if (value.frenchSession > 0) {
                return frenchColor;
            }
            return "none";
        })


    svg.selectAll("circle.read")
        .data(isFreeDay)
        .join("circle")
        .classed("read", true)
        .attr("r", 10)
        .attr("cx", function (value) {
            return xScale(value.date) - 10;
        })
        .attr("cy", function (value) {
            return yScale(value.studyingSession) - 10;
        })
        .attr("fill", function (value) {
            if (value.readingSession > 0) {
                return readingColor;
            }
            return "none";
        })


    svg.selectAll("circle.sleep")
        .data(isFreeDay)
        .join("circle")
        .classed("sleep", true)
        .attr("r", 10)
        .attr("cx", function (value) {
            return xScale(value.date) - 10;
        })
        .attr("cy", function (value) {
            return yScale(value.studyingSession) + 10;
        })
        .attr("fill", function (value) {
            if (value.sleepingSession > 0) {
                return sleepingColor;
            }
            return "none";
        })

    /*Drawing the circles for the center of the flower (studying)*/

    svg.selectAll("circle.center")
        .data(isFreeDay)
        .join("circle")
        .classed("center", true)
        .attr("r", 8)
        .attr("cx", function (value) {
            return xScale(value.date);
        })
        .attr("cy", function (value) {
            return yScale(value.studyingSession);
        })
        
        .attr("fill", "yellow")
        .attr("opacity",1)
        .attr("stroke", "black")
        


    svg.selectAll("rect.music")
        .data(isWeekend)
        .join("rect")
        .classed("music", true)
        .attr("height", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("width", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("x", function (value) {
            return (xScale(value.date) + 10) - this.width.baseVal.value / 2
        })
        .attr("y", function (value) {
            return (yScale(value.studyingSession) + 10) - this.height.baseVal.value / 2
        })
        .attr("fill", function (value) {
            if (value.musicSession > 0) {
                return musicColor;
            }
            return "none";
        })

    svg.selectAll("rect.french")
        .data(isWeekend)
        .join("rect")
        .classed("french", true)
        .attr("height", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("width", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("x", function (value) {
            return (xScale(value.date) + 10) - this.width.baseVal.value / 2
        })
        .attr("y", function (value) {
            return (yScale(value.studyingSession) - 10) - this.height.baseVal.value / 2
        })
        .attr("fill", function (value) {
            if (value.frenchSession > 0) {
                return frenchColor;
            }
            return "none";
        })

    svg.selectAll("rect.read")
        .data(isWeekend)
        .join("rect")
        .classed("read", true)
        .attr("height", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("width", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("x", function (value) {
            return (xScale(value.date) - 10) - this.width.baseVal.value / 2
        })
        .attr("y", function (value) {
            return (yScale(value.studyingSession) - 10) - this.height.baseVal.value / 2
        })
        .attr("fill", function (value) {
            if (value.readingSession > 0) {
                return readingColor;
            }
            return "none";
        })

    svg.selectAll("rect.sleep")
        .data(isWeekend)
        .join("rect")
        .classed("sleep", true)
        .attr("height", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("width", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("x", function (value) {
            return (xScale(value.date) - 10) - this.width.baseVal.value / 2
        })
        .attr("y", function (value) {
            return (yScale(value.studyingSession) + 10) - this.height.baseVal.value / 2
        })
        .attr("fill", function (value) {
            if (value.sleepingSession > 0) {
                return sleepingColor;
            }
            return "none";
        })

    svg.selectAll("rect.center")
        .data(isWeekend)
        .join("rect")
        .classed("center", true)
        .attr("height", function () {
            return Math.sqrt(Math.PI * 8 * 8)
        })
        .attr("width", function () {
            return Math.sqrt(Math.PI * 8 * 8)
        })
        .attr("x", function (value) {
            return xScale(value.date) - this.width.baseVal.value / 2
        })
        .attr("y", function (value) {
            return yScale(value.studyingSession) - this.height.baseVal.value / 2
        })
        .attr("stroke", "black")
        .attr("fill", "yellow");

    function closedPolygon(...args) {
        if (args.length < 2) {
            console.log("WARNING: No points defined")
            return "";
        }
        let polyString = "";
        // grab each pair of points and add to string of points
        for (let i = 0; i < args.length; i++) {
            polyString += args[i];
            polyString += " ";
        }

        polyString += args[0] + " " + args[1];

        return polyString; // send back our completed String
    }

    svg.selectAll("polyline.music")
        .data(isClassDay)
        .classed("music", true)
        .join("polyline")
        .attr('points', function (value) {
            let x = xScale(value.date); // scale our indices. Could also use an xScale function for this
            let y = yScale(value.studyingSession); // scale our data. Could also use a yScale function for this
            return closedPolygon((x - 10) + 10, (y + 7) + 10, x + 10, (y - 12) + 10, (x + 10) + 10, (y + 7) + 10); // define a triangle in relative terms
        })
        .attr("fill", function (value) {
            if (value.musicSession > 0) {
                return musicColor;
            }
            return "none";
        })

    svg.selectAll("polyline.french")
        .data(isClassDay)
        .classed("french", true)
        .join("polyline")
        .attr('points', function (value) {
            let x = xScale(value.date);
            let y = yScale(value.studyingSession);
            return closedPolygon((x - 10) + 10, (y + 7) - 10, x + 10, (y - 12) - 10, (x + 10) + 10, (y + 7) - 10);
        })
        .attr("fill", function (value) {
            if (value.frenchSession > 0) {
                return frenchColor;
            }
            return "none";
        })

    svg.selectAll("polyline.read")
        .data(isClassDay)
        .classed("read", true)
        .join("polyline")
        .attr('points', function (value) {
            let x = xScale(value.date);
            let y = yScale(value.studyingSession);
            return closedPolygon((x - 10) - 10, (y + 7) - 10, x - 10, (y - 12) - 10, (x + 10) - 10, (y + 7) - 10);
        })
        .attr("fill", function (value) {
            if (value.readingSession > 0) {
                return readingColor;
            }
            return "none";
        })

    svg.selectAll("polyline.sleep")
        .data(isClassDay)
        .classed("sleep", true)
        .join("polyline")
        .attr('points', function (value) {
            let x = xScale(value.date);
            let y = yScale(value.studyingSession);
            return closedPolygon((x - 10) - 10, (y + 7) + 10, x - 10, (y - 12) + 10, (x + 10) - 10, (y + 7) + 10);
        })
        .attr("fill", function (value) {
            if (value.sleepingSession > 0) {
                return sleepingColor;
            }
            return "none";
        })


    svg.selectAll("polyline.center")
        .data(isClassDay)
        .classed("center", true)
        .join("polyline")
        .attr('points', function (value) {
            let x = xScale(value.date);
            let y = yScale(value.studyingSession);
            return closedPolygon(x - 10, y + 7, x, y - 12, x + 10, y + 7);
        })
        .attr('stroke', 'black')
        .attr('fill', 'yellow');




    /*Drawing the keys */

    let key = svg.append("g")

    let keyLeft = leftMargin - 180;
    let keyTop = topMargin;

    key.append("rect")
        .attr("width", 290)
        .attr("height", 170)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("x", leftMargin + 870)
        .attr("y", 40 - topMargin)

    key.append("text")
        .text("Type of habit")
        .style("text-anchor", "middle")
        .attr("x", leftMargin + 928)
        .attr("y", 60 - topMargin);

    for (let i = 1; i <= 4; i++) {
        key.append("circle")
            .attr("r", 8)
            .attr("cx", leftMargin + 900)
            .attr("cy", 60 - topMargin + i * 30)
            .attr("stroke", "black")
            .attr("fill", function () {
                if (i == 1) {
                    return musicColor;
                }
                else if (i == 2) {
                    return frenchColor;
                }
                else if (i == 3) {
                    return readingColor;
                }
                else {
                    return sleepingColor;
                }

            });

        key.append("text")
            .text(function () {
                if (i == 1) {
                    return "Music";
                }
                else if (i == 2) {
                    return "French";
                }
                else if (i == 3) {
                    return "Reading";
                }
                else {
                    return "Sleeping";
                }
            })
            .style("alignment-baseline", "middle")
            .attr("x", leftMargin + 925)
            .attr("y", 60 - topMargin + i * 30);
    }


    key.append("text")
        .text("Type of day")
        .style("text-anchor", "middle")
        .attr("x", leftMargin + 1100)
        .attr("y", 60 - topMargin);

    key.append("circle")
        .attr("r", 8)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("cx", leftMargin + 1070)
        .attr("cy", 30 + topMargin)

    key.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("x", leftMargin + 1060)
        .attr("y", 45 + topMargin)

    key.append("polyline")
        .attr('points', closedPolygon(leftMargin + 1060, 125, leftMargin + 1070, 105, leftMargin + 1080, 125))
        .attr('stroke', 'black')
        .attr('fill', 'none');

    for (let i = 1; i <= 3; i++) {
        key.append("text")
            .text(function () {
                if (i == 1) {
                    return "Free";
                }
                else if (i == 2) {
                    return "Weekend";
                }
                else {
                    return "Class";
                }
            })
            .style("alignment-baseline", "middle")
            .attr("x", leftMargin + 1090)
            .attr("y", 60 - topMargin + i * 30);

    }

    key.attr("transform", `translate(${keyLeft},${keyTop})`)




}

