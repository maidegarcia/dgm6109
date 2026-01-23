"use strict"

document.getElementById("submit").addEventListener("click", function () {

    let fahrenheit = document.getElementById("inputF").value;
    let conversionType = document.getElementById("conversionChoice").value;
    let celsius = (fahrenheit - 32) * 5 / 9
    let kelvin = (Number(fahrenheit) + 459.67) * 5 / 9

    output("Temperature (fahrenheit):" + fahrenheit)

    /* if (conversionType == "c") {
         output("Temperature (celsius):" + celsius)
     }
 
     if (conversionType == "k") {
         output("Temperature (kelvin):" + kelvin)
     } */

    /*Although both conditional logics work, I prefer to use the if/else version because visually 
    it makes more sense to me and it actually helps my thinking process, I can see the action as 
    a whole and not as separate pieces that form part of the same thing*/

    if (conversionType == "c") {
        output("Temperature (celsius):" + (celsius.toFixed(2)))
    }

    else (output("Temperature (kelvin):" + (kelvin.toFixed(2))))

});