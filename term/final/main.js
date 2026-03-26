"use strict"

/*DISCLAIMER: The code used in this project is based on the class and lab examples of Jay Taylor-Laird */

/*********************************************************************************************/
/* CANVAS MEASUREMENTS */
/***********************/

let svgWidth = 2000
let svgHeight = 750

/**********************************************************************************************/
/* MARGINS */
/***********/


let topMargin = 30;
let rightMargin = 80;
let bottomMargin = 140;
let leftMargin = 80;

/*********************************************************************************************/
/*DRAWING THE CANVAS */
/*********************/

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")



/********************************************************************************************/
/*GLOBAL VARIABLES*/
/******************/

let data, xAxis, yAxis1, xScale, yScale, xAxisLabel, yAxisLabel, yAxis2
let allDates = []; //All the dates in my data
let isWeekend = []; //Only the weekend days
let isClassDay = []; //Only the days that I had class
let isFreeDay = []; // The week days that I didn't have class

/* ************ async function () ********************************************************+*+/
PURPOSE:
Load my data and pass it to the function buildVisualization

REQUIREMENTS:
* d3.js 
* JSON file

GLOBAL VARIABLES USED/MODIFIED:
* Modifies data (Array of Objects)

PARAMETERS:
none

RETURNS:
Nothing
***************************************************************************************+++++*/

(async function () {
    data = await d3.json("data.json").then(buildVisualization)
})();

/* ************ function buildVisualization() ********************************************+*+/
PURPOSE:
Receives data from the JSON file and stores it in the global variable "data", triggers the data organization, builds the scales, and calls the drawing function.

GLOBAL VARIABLES USED/MODIFIED:
* Uses: svg (Object - d3 selection)

REQUIREMENTS:
* d3.js 
* The organizeData, buildScales, and drawVisualization functions

PARAMETERS:
data(Array of Objects): The dataset loaded from the JSON file

RETURNS:
data
**********************************************************************************************/

function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);
    drawVisualization(renderData, svg);
    return data;
}

/* ************ function buildScales() ********************************************************+/
PURPOSE:
It contains the functions to scale the data and make it fit in the canvas

GLOBAL VARIABLES USED/MODIFIED:
* Uses: allDates, leftMargin, rightMargin, svgWidth, svgHeight, bottomMargin, topMargin
* Modifies: xScale (Function), yScale (Function)

REQUIREMENTS
*d3.js 
*The allDates array 
*Canvas measurements (svgWidth, svgHeight, margins)

PARAMETERS:
data (Array of Objects): The dataset loaded from the JSON file (is not being used)

RETURNS:
Nothing
************************************************************************************************/

function buildScales(data) {

    xScale = d3.scalePoint()
        .domain(allDates)
        .range([leftMargin + 20, svgWidth - rightMargin])

    yScale = d3.scaleLinear()
        .domain([0, 600])
        .range([svgHeight - bottomMargin, topMargin])

}

/* ************ function organizeData() ********************************************************+/
PURPOSE:
Organizes the data by mapping dates, sorting them chronologically, and filtering the dataset into specific arrays based on the type of day (weekend, class, free).

GLOBAL VARIABLES USED/MODIFIED:
* Modifies: allDates (Array), isWeekend (Array), isClassDay (Array), isFreeDay (Array)

REQUIREMENTS:
* None

PARAMETERS:
data (Array of Objects): The dataset to be mapped, sorted and mapped

RETURNS:
data
************************************************************************************************/

function organizeData(data) {

    allDates = data.map(function (value) { //To create an Array with only the dates in my data
        return value.date;
    });

    allDates.sort(function (a, b) { // To make sure all the dates are in the same format and put in an ascending order
        if (new Date(a) > new Date(b)) {
            return 1;
        } else {
            return -1;
        }
    })

    isWeekend = data.filter(function (value) { //To filter the data and only get the weekend days
        return (value.typeOfDay == "weekend");
    })

    isClassDay = data.filter(function (value) { //To filter the data and only get the days I had class
        return (value.typeOfDay == "class");
    })

    isFreeDay = data.filter(function (value) { //To filter the data and only get the week day I didn't have class
        return (value.typeOfDay == "free");
    })


    return data;


}

/* ************ function drawVisualization() ********************************************************+/
PURPOSE:
Draw all the visual elements

GLOBAL VARIABLES USED/MODIFIED:
* Uses: svg, svgHeight, svgWidth, margins (topMargin, bottomMargin, leftMargin, rightMargin), xScale, yScale, xAxis, yAxis1, yAxis2, isFreeDay, isWeekend, isClassDay

REQUIREMENTS:
*d3.js 
*An svg element appended to the #canvas div in the HTML.
*Scales (xScale, yScale) 
*Data arrays (isFreeDay, isClassDay, isWeekend) must be populated.

PARAMETERS:
data (Array of Objects): The dataset used to draw the visualization

RETURNS:
Nothing
************************************************************************************************/

function drawVisualization(data) {

    /********************************************************************/
    /*X AND Y AXIS ELEMETS*/
    /**********************/

    xAxis = svg.append("g")
        .classed("x-axis text", true)
        .attr("transform", `translate(0, ${svgHeight - bottomMargin})`)
        .call(d3.axisBottom().scale(xScale).tickSize(22))
        .selectAll("text.allDates")


    yAxis1 = svg.append("g")
        .classed("y-axis text", true)
        .attr("transform", `translate (${leftMargin},0)`)
        .call(d3.axisLeft().scale(yScale).tickSize(9))


    yAxis2 = svg.append("g")
        .classed("y-axis text", true)
        .attr("transform", `translate (${svgWidth - rightMargin},0)`)
        .call(d3.axisRight().scale(yScale).tickSize(9))


    /**********************************************************************/
    /*X AND Y AXIS LABELS */
    /**********************/

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

    /**********************************************************************/
    /* STEMS (MINUTES OF STUDY) */
    /****************************/

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



    /*********************************************************************/
    /* PETALS (HABITS) */
    /*******************/

    let musicColor = "orange"; //I'm declaring these variables to make it easier for me to assign the colors to the petals and easily change their color if I wanted to
    let frenchColor = "red";
    let readingColor = "blue";
    let sleepingColor = "purple";


    /**********************************/
    /* PETALS FOR FREE DAYS (CIRCLES) */
    /**********************************/

    let popUpWindow = d3.select("body").append("div") // Here I'm assigning a div to contain the pop up window with the additional information
        .attr("class", "popUpWindow")
        .style("opacity", 0); //To put the div in an invisible state

    /*Music Circle Petals */

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
        .on("mouseover", function (event, value) { //To make the pop-up window to appear
            popUpWindow.transition().style("opacity", 0.9); //To establish how the pop-up window is going to show up
            popUpWindow.html(`<p><strong>Music session duration:</strong>${value.musicSession} minutes</p>`) //Content of the pop-up window
                .style("left", (event.pageX) + "px") //Horizontal position relative to the cursor
                .style("top", (event.pageY - 20) + "px"); //Vertical position relative to the cursor

        })
        .on("mouseout", function () { //To make the pop-up window to disappear
            popUpWindow.transition()//To establish how the pop-up window is going to disappear
                .duration(500)
                .style("opacity", 0);
        });

    /*French Circle Petals */
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

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>French session duration:</strong>${value.frenchSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Reading Circle Petals */
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

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Reading session duration:</strong>${value.readingSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Sleeping Circle Petals */
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

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Sleeping session duration:</strong>${value.sleepingSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Center Circle of the Flower */
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
        .attr("opacity", 1)
        .attr("stroke", "black")

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Habits total duration:</strong> ${value.musicSession + value.frenchSession + value.readingSession + value.sleepingSession} minutes.   <strong>Energy Level (1 (lowest) - 5 (highest)):</strong> ${value.energyLevel} </p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*************************************/
    /* PETALS FOR WEEKEND DAYS (SQUARES) */
    /*************************************/

    /*Music Square Petals */
    svg.selectAll("rect.music")
        .data(isWeekend)
        .join("rect")
        .classed("music", true)
        .attr("height", function () {
            return Math.sqrt(Math.PI * 9 * 9) //To calculate the area of the squares and make it similar to the one of the circles, instead of using 10 (radius of the circled petals) I decided to use 9 for design purposes
        })
        .attr("width", function () {
            return Math.sqrt(Math.PI * 9 * 9)
        })
        .attr("x", function (value) {
            return (xScale(value.date) + 10) - this.width.baseVal.value / 2 //To make the squares to have the same positioning as the circled petals
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
        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Music session duration:</strong>${value.musicSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");

        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*French Square Petals */

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

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>French session duration:</strong>${value.frenchSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Reading Square Petals */
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

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Reading session duration:</strong>${value.readingSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Sleeping Square Petals */
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
        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Sleeping session duration:</strong>${value.sleepingSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Center Square of the Flower */
    svg.selectAll("rect.center")
        .data(isWeekend)
        .join("rect")
        .classed("center", true)
        .attr("height", function () {
            return Math.sqrt(Math.PI * 8 * 8) //To calculate the area of the squares and make it the same as the one of the circles
        })
        .attr("width", function () {
            return Math.sqrt(Math.PI * 8 * 8)
        })
        .attr("x", function (value) {
            return xScale(value.date) - this.width.baseVal.value / 2 //To make the squares to have the same positioning as the circled petals
        })
        .attr("y", function (value) {
            return yScale(value.studyingSession) - this.height.baseVal.value / 2
        })
        .attr("stroke", "black")
        .attr("fill", "yellow")

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Habits total duration:</strong> ${value.musicSession + value.frenchSession + value.readingSession + value.sleepingSession} minutes.   <strong>Energy Level (1 (lowest) - 5 (highest)):</strong> ${value.energyLevel} </p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /********************************************/
    /* PETALS FOR DAYS WITH CLASSES (TRIANGLES) */
    /********************************************/

    /* ************ function closedPolygon() ********************************************************+/
   //PURPOSE:
   //Take a list of values, in this case the variables values, and convert them to a String so the attribute points can process them
   
   //GLOBAL VARIABLES USED/MODIFIED:
   //None

   //REQUIREMENTS:
   //* An array of numerical coordinates passed as arguments
   
   //PARAMETERS:
   //...args: a rest operator that helps to storing the values sent to the function into an Array named "args"
   
   //RETURNS:
   //A String with the coordinates of the values
   //************************************************************************************************/

    function closedPolygon(...args) {
        if (args.length < 2) { //This conditional is to make sure that there are at least two values to make a point
            return "";
        }
        let polyString = ""; // Takes every value and converts it to a String

        for (let i = 0; i < args.length; i++) { //This loop goes through all the args Array, grabs each value and adds it to the String that is being created and a space
            polyString += args[i];
            polyString += " ";
        }

        polyString += args[0] + " " + args[1]; //This line is to make sure the polygon is closed

        return polyString; // returns the resulting String
    }

    /*Music Triangle Petals */
    svg.selectAll("polyline.music")
        .data(isClassDay)
        .classed("music", true)
        .join("polyline")
        .attr('points', function (value) {
            let x = xScale(value.date); // To store the x axis' values in a variable
            let y = yScale(value.studyingSession); // To store the y axis' values in a variable
            return closedPolygon((x - 10) + 10, (y + 7) + 10, x + 10, (y - 12) + 10, (x + 10) + 10, (y + 7) + 10); // To configure the points of the triangle
        })
        .attr("fill", function (value) {
            if (value.musicSession > 0) {
                return musicColor;
            }
            return "none";
        })

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Music session duration:</strong>${value.musicSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");

        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*French Triangle Petals */
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
        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>French session duration:</strong>${value.frenchSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Reading Triangle Petals */
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

        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Reading session duration:</strong>${value.readingSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Sleeping Triangle Petals */
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
        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Sleeping session duration:</strong>${value.sleepingSession} minutes</p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*Center Triangle of the flower */
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
        .attr('fill', 'yellow')
        .on("mouseover", function (event, value) {
            popUpWindow.transition().style("opacity", 0.9);
            popUpWindow.html(`<p><strong>Habits total duration:</strong> ${value.musicSession + value.frenchSession + value.readingSession + value.sleepingSession} minutes.   <strong>Energy Level (1 (lowest) - 5 (highest)):</strong> ${value.energyLevel} </p>`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            popUpWindow.transition()
                .duration(500)
                .style("opacity", 0);
        });




    /**************************************************************************/
    /* KEYS*/
    /*******/

    let key = svg.append("g") //I created this variable so I could group all the elements of the key and make it easier to position all the elements while manteining their relative position
    let keyLeft = leftMargin - 180; //I created these next two variables to position the key relative to the left and top margin, so that if I change their measurements, they key will mantain its relativeposition
    let keyTop = topMargin;

    /*Color Key */
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

    for (let i = 1; i <= 4; i++) { //A loop to draw the different options of colors and types of habit
        key.append("circle")
            .attr("r", 8)
            .attr("cx", leftMargin + 900)
            .attr("cy", 60 - topMargin + i * 30)
            .attr("stroke", "black")
            .attr("fill", function () {
                if (i == 1) { //A conditional to assign the colors
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
                if (i == 1) { //A conditional to assign the types of habit
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

    /*Shape Key */
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

    for (let i = 1; i <= 3; i++) {//A loop to draw the different types of day
        key.append("text")
            .text(function () {
                if (i == 1) { //A conditional to assign the types of day
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

    key.attr("transform", `translate(${keyLeft},${keyTop})`) //To position the key




}

