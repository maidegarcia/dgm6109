"use strict"

let routingNumber, transactionType, transactionLocation, confirmationCode, partialView;

document.getElementById("submit").addEventListener("click", processFormValues);

document.getElementById("reset").addEventListener("click", function () {
    clear();

    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});

function processFormValues() { //This function is to get the values from the user input

    routingNumber = document.getElementById("number").value;
    transactionType = document.getElementById("type").value;
    transactionLocation = document.getElementById("location").value;

    processData();
}

function processData() { //This function passes information on to the functions validateData() and evaluateAnswers

    let evaluationCompleted = false;

    if (validateData()) {
        evaluationCompleted = evaluateAnswers();
    }

    if (evaluationCompleted) {
        document.getElementById("submit").toggleAttribute("hidden");
        document.getElementById("reset").toggleAttribute("hidden");
    } else {
        rule();
    }
}




/* validateData() is to check if the data was correctly entered in general, not for specific cases. Each condition 
returns false if there is somethimg incorrect with the data, if the data is ok, they will return true 

For this function I decided to use the if conditional logic because of my thinking process, in this step I prefer to 
evaluate each type of data and condition separately.*/

function validateData() {

    let valid = true;

    /*This analyzes if the user entered a number. If they didn't, the system will ask them to put a number. For this I used isNaN()
    tha checks if a number is a NaN(not a number). I learned that here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN */

    if (isNaN(Number(routingNumber))) {
        output("Please enter ONLY numbers in the bank routing number box!");
        valid = false;
    }

    /*Since the rounting number has to be of exactly 9 digits, I used the string processing .length
    to evaluate the number of digits that the user entered, if the number's length is not equal to 9,
    the system will output a message. Eventually I'm planning to make another conditional evaluating 
    if the user put other characters besides of numbers, in that case, the system would have to output 
    a message saying what's wrong. I read about the string processing in the web page https://javascript.info/string */

    if (routingNumber.length != 9) {
        output("Please enter a 9 digits bank routing number!")
        valid = false;
    }

    /*Here I'm saying that if the transaction type equals to "0", the system will output a message. If you
    go to the html, you will see that "0"is an empty option, I put it so that when the user enters the page,
    they see everything in blank, it was a design decision*/

    if (transactionType == "0") {
        output("Please select a type of transaction!")
        valid = false;
    }

    /*For this conditional I used the exact same logic that in the previous one, if the transaction location
    equals "0", an empty option, the system will output a message*/

    if (transactionLocation == "0") {
        output("Please select a transaction location!")
        valid = false;
    }

    return valid;

}

/* This function evaluates if the user's input meets all of the constraints. Each conditional will return false if one of the 
constraints is not met and the system will output an error message. If everything is correct, they will return true and the system 
will create an output message with the result of the transaction. 

For this function I used the if/else if conditional logic because in this case I'm evaluating all three types of input data together, 
I'm seeing them as a whole unit that can appear in different specific combinations. */

function evaluateAnswers() {

    let valid = true;


    /*In this part I'm saying that if the user chose the transaction Treasury Check and their routing number is not equal to
     "000000518", the system has to output an error message*/

    if (transactionType == "Treasury Check" && routingNumber != "000000518") {
        output("The routing number is incorrect for this type of transaction!")
        valid = false;
    }

    /*In this part I'm saying that if the user chose the transaction Money Order and their routing number is not equal to
     any of those options, the system has to output an error message*/

    else if (transactionType == "Money Order" && routingNumber != "000000204" && routingNumber != "000001193" && routingNumber != "000008002") {
        output("The routing number is incorrect for this type of transaction!")
        valid = false;
    }

    /*In this part I'm saying that if the user chose the transaction Savings Bond and their routing number is not equal to
     "000090007", the the system has to output an error message*/

    else if (transactionType == "Savings Bond" && routingNumber != "000090007") {
        output("The routing number is incorrect for this type of transaction!")
        valid = false;
    }

    /*The next three conditionals are to evaluate when the user wants to do a Local Deposit. I'm also evaluating 
    the transaction location and if the routing number does not correspond to the ones assigned to each location.

    I could have put in one line the "else if (transactionType == "4")" and then nested the other 
    values that are the ones that change, but I prefered each option to have its own line of code, 
    it was easier for me visually to have it like that.

    For this conditionals I had to use .slice(xn, yn), to be able to just evaluate the first four
    digits of the number. What this does is that it slices the string from the indicated character, in
    this case digit, that you choose (xn) to the end that you decide, that would be yn, but yn is not included 
    in the new string that will result out of this. It is important to say that in this processes, the first character 
    is "0" and not "1". I read about the string processing in the web page
    https://javascript.info/string  .*/

    else if (transactionType == "Local Deposit" && transactionLocation == "Cleveland,OH" && routingNumber.slice(0, 4) != "0410" && routingNumber.slice(0, 4) != "0412") {
        output("The routing number is incorrect for this type of transaction location!")
        valid = false
    }

    else if (transactionType == "Local Deposit" && transactionLocation == "Peoria, IL" && routingNumber.slice(0, 4) != "0711") {
        output("The routing number is incorrect for this type of transaction location!")

        valid = false;
    }

    else if (transactionType == "Local Deposit" && transactionLocation == "Chigago, IL" && routingNumber.slice(0, 4) != "0710" && routingNumber.slice(0, 4) != "0712" && routingNumber.slice(0, 4) != "0719") {
        output("The routing number is incorrect for this type of transaction location!")
        valid = false;

    }

    /*This conditional is to create a 6 digits confirmation code in case the data is valid. I had to convert the String values of the routing
    number to Number values, in order to do calculations and get a number. The idea is to think about the routing number as abc|abc|abc, the 
    sum of each set of a, b and c is going to create the confirmation code. Since sometimes the result is a one digit number, I'm
    putting a conditional saying that, if the resulting number is less than 10, the system has to add a zero in front of it. I put 
    zero as a String, because if I left it as a number I would get the same number with which I started. 
    
    I used another String processing method the str[] and is to get a specific character of the string. I learned this during class #4
    but you can also find it here https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Useful_string_methods */

    if (valid == true) {

        let a, b, c;

        a = Number(routingNumber[0]) + Number(routingNumber[3]) + Number(routingNumber[6])
        if (a < 10) {
            a = "0" + a
        }

        b = Number(routingNumber[1]) + Number(routingNumber[4]) + Number(routingNumber[7])
        if (b < 10) {
            b = "0" + b
        }

        c = Number(routingNumber[2]) + Number(routingNumber[5]) + Number(routingNumber[8])
        if (c < 10) {
            c = "0" + c
        }
        /*This is to create a partial view of the routing number */
        partialView = "XXXX-X" + routingNumber.slice(5, 8) + "-" + routingNumber[8];

        /*This is to create a message with the transaction's result */
        output("Your " + transactionType + " has been iniated at our branch in " + transactionLocation + " using routing number " + partialView + " (only the last 4 digits are shown, for security purposes). Your confirmation code is " + a + b + c + ".")
    }
    return valid;


}












