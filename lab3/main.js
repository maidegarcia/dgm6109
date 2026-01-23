"use strict"

document.getElementById("submit").addEventListener("click", function () {

    let fahrenheit = document.getElementById("inputF").value;
    let celsius = (fahrenheit - 32) * 5 / 9
    let kelvin = (fahrenheit + 459.67) * 5 / 9

    console.log("Temperature (fahrenheit):" + fahrenheit)
    console.log("Temperature (celsius):" + celsius)
    console.log("Temperature (kelvin):" + kelvin)

});