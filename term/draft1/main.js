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
        .range([leftMargin, svgWidth - rightMargin])

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

    return data;


}

/*To draw the data visualization*/

function drawVisualization(data, drawing) {

    /*X and Y axis elements */
    xAxis = svg.append("g")
        .classed("x-axis text", true)
        .attr("transform", `translate(0, ${svgHeight - bottomMargin})`)
        .call(d3.axisBottom().scale(xScale))
        .selectAll("text.allDates")
        

    yAxis = svg.append("g")
        .classed("y-axis text", true)
        .attr("transform", `translate (${leftMargin},0)`)
        .call(d3.axisLeft().scale(yScale))


    /*X and Y axis labels */
    xAxisLabel = svg.append("text")
        .classed("axisLabel", true)
        .attr("x", svgWidth / 2)
        .attr("y", svgHeight - bottomMargin / 8)
        .style("text-anchor", "middle")
        .text("Dates (dd/mm/yy)");

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
        .attr("stroke-width", "3")


    /*Drawing the circles for the petals (habits)*/

    svg.selectAll("circle.music")
        .data(data)
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
                return "orange";
            }
            return "none";
        })


    svg.selectAll("circle.french")
        .data(data)
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
                return "red";
            }
            return "none";
        })


    svg.selectAll("circle.read")
        .data(data)
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
                return "blue";
            }
            return "none";
        })


    svg.selectAll("circle.sleep")
        .data(data)
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
                return "purple";
            }
            return "none";
        })

    /*Drawing the circles for the center of the flower (studying)*/

    svg.selectAll("circle.center")
        .data(data)
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
        .attr("stroke", "black")


    /*Drawing the keys */
    svg.append("text")
        .text("Type of habit")
        .style("text-anchor", "middle")
        .attr("x", leftMargin + 928)
        .attr("y", 60 - topMargin);

    for (let i = 1; i <= 4; i++) {
        svg.append("circle")
            .attr("r", 8)
            .attr("cx", leftMargin + 900)
            .attr("cy", 60 - topMargin + i * 30)
            .attr("stroke", "black")
            .attr("fill", function () {
                if (i == 1) {
                    return "orange";
                }
                else if (i == 2) {
                    return "red";
                }
                else if (i == 3) {
                    return "blue";
                }
                else {
                    return "purple";
                }

            });

        svg.append("text")
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

}