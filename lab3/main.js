"use strict"

document.getElementById("submit").addEventListener("click", function () {

    let fahrenheit = document.getElementById("inputF").value; 
    let celsius = (fahrenheit - 32) * 5 / 9
    let kelvin = (Number(fahrenheit )+ 459.67) * 5 / 9 //the document.getElementId("inputF").value,changes 
                                                       // the number to a String value and that is why you have to convert it.
                                                       //You can see it in the DOM inspector, the value appers quotation marks. 
                                                       //It doesn't seem to affect subtractions
    console.log("Temperature (fahrenheit):" + fahrenheit)
    console.log("Temperature (celsius):" + celsius)
    console.log("Temperature (kelvin):" + kelvin)

});