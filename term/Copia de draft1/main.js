"use strict"

/*
    Adjust these values to fit your visualization, but be sure to keep them within the size limit given for the project! Feel free to change these variable names if they help you to better understand your code!

    Be sure to remove all code comments and unused variables and code before submitting each version of your visualization!
*/

let svgWidth = 2000
let svgHeight = 750

/* You may use 4 individual variables (such as marginTop or topMargin) if you prefer that to using an Object with 4 properties */


let topMargin = 30;
let rightMargin = 30;
let bottomMargin = 140;
let leftMargin = 80;


/*
    Adjust the below-given SVG creation method to fit your project. In the example code, we have appended an SVG that is the same size as our svgWidth and svgHeight variables.

    We recommend drawing a thin black border around your whole SVG so that it's visually distinctive from the rest of your page, but if you have other ways of distinguishing it, feel free to remove ours!

    Below this, we have commented-out code that will create an SVG "group". You can use this code and then add all elements of your visualization to the group, if you prefer doing this to having to calculate using the margins everywhere.

    The dashed box that we added to the SVG group is useful as a "placeholder" for what should be the maximum area used by your visualization (if you use margins as we have, but that is also totally up to you!). However, we recommend making this box invisible in your final visualization so taht it doesn't clutter your axes and other visual elements.

    If you decide not to use parts of this code, be sure to delete it! Also, be sure to delete this and all other instructional code comments!
*/


let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")

/* let viz = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

viz.append("rect")
    .attr("width", svgWidth - (margin.left + margin.right))
    .attr("height", svgHeight - (margin.top + margin.bottom))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5,5") */

/* Some global variables that you may use. You may also add additional ones. Be sure to write a code comment explaining what each variable does, even if you only use the ones that we provided. Remove any that you end up not using.

TIP: You can do end-of-line comments across a list of variables, like this:

    let data,   // my dataset
    xAxis,      // storage for the x axis group
*/

let data, xAxis, yAxis, xScale, yScale, xAxisLabel, yAxisLabel
let allDates = [];



/*
    Replace "data.json" with your own well-named JSON file. You can use the name data.json to replace our file, or you can come up with a name that's more specific for your project data (as long as it's a well-named file that ends with .json)!
 
    REMINDER: All you need to understand about the async function code is that it loads your data and then passes it as a parameter to the function named in .then() (here, function buildVisualization). When that function returns the data, it is then stored in global variable data so that it can be used elsewhere!
*/

(async function () {
    data = await d3.json("data.json").then(buildVisualization)
    console.log("here")
})();


/*
    TIP: You may need to reorganize the buildVisualization function to suit your application. Think about what each line does!

    Remove any lines of code and variables that you don't need. Your final product should contain the code necessary to produce your visualization! 

    And of course be sure to write good formal function documentation!
*/

function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);
    drawVisualization(renderData, svg);
    return data;
}


function buildScales(data) {
    /*
    Create your scale functions here. If appropriate for your project, you can use the global xScale and yScale variables that we created, but you may need to create additional globals for other scales (such as radius, color, etc.)
    */



    xScale = d3.scalePoint()
        .domain(allDates)
        .range([leftMargin, svgWidth - rightMargin])

    yScale = d3.scaleLinear()
        .domain([0, 600])
        .range([svgHeight - bottomMargin, topMargin])

}

function organizeData(data) {
    // let organized = [data];
    /*
    You can use this function to organize your data for rendering. If you need to do any sorting, filtering, mapping, or other data manipulation, you might want to put that code here. Be sure to document the function accurately and to explain what your code does!

    You can also write additional functions, of course. We are only providing you a basic suggested structure here.

    The "organized" variable provided here is just to remind you that you need to send the processed data back in order to work further with it.
    */

    allDates = data.map(function (value) {
        return value.date;
    });

    return data;


}

/**** function drawVisualization(data, viz) *****
 *  
 * This is just a reminder to write good function documentation that includes a description of what the function does, a list of each parameter's expected data type and purpose, and what the function returns (if anything). Be sure to review the lessons on function documentation as you work on this!
 * 
 * Our provided starting point for the function suggests processing your dataset as the first parameter and the SVG or group that you wish to draw to as your second parameter.
 * 
 * You can change these variables as needed. Just make sure that you explain what your code is doing. For example, it is a good idea to additionally list any global variables that your functions depend on.
 * 
*****/
function drawVisualization(data, drawing) {
    /*
    Use this function to draw your data visualization. This includes drawing the X and Y axes, visualizing your data, and providing clear labels and keys.
    
    You may break this up into multiple well-named and well-documented functions if you prefer. You may especially want to do this if you are creating an interactive visualization. One function might draw the elements that only need to be drawn once (e.g., the axes, keys, and labels) while another might draw the elements that get changed in response to a user interaction.
    */
    /*X and Y axis elements */
    xAxis = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${svgHeight - bottomMargin})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text.allDates")
        .attr("transform", "rotate(-90)")


    yAxis = svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate (${leftMargin},0)`)
        .call(d3.axisLeft().scale(yScale))


    /*X and Y axis labels */
    xAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("x", svgWidth / 2)
        .attr("y", svgHeight - bottomMargin / 8)
        .style("text-anchor", "middle")
        .text("Dates (dd/mm/yy)");

    yAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
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
            .attr("r", 9)
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
            .text(function (value) {
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