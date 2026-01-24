"use strict"

/* IC: Declare global variables to store user-entered information and results here */
let routingNumber, transactionType, transactionLocation;

/* IC: We have set up the form buttons for you, as well as the code that will clear the output once the user has successfully filled out the form and the program has given them final output (instead of telling them they need to correct something). We have set things up so that the output area is cleared, but the form remains filled out. This is to make it easier to test your project with slightly different versions of information rather than having to fill out the whole form every time. */

document.getElementById("submit").addEventListener("click", processForm);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});

function processForm() {

    /* IC: Assign values from your form inputs here, remembering:
        1) Always work with the value property from the form input

        2) Form data always comes in as type String. You MAY want to convert some inputs to Numbers, but you ALSO may need to analyze some numeric inputs as text (for example, if you need to check how many digits were entered, or only look at certain digits)

        3) You can do additional pre-processing here, if needed, but everything related to validating form input or providing results should go into the other functions provided below OR by functions that those other functions call (which you may also write)
    */

    routingNumber = document.getElementById("number").value;
    transactionType = document.getElementById("type").value;
    transactionLocation = document.getElementById("location").value

    /* IC: This code looks for a true or false for whether the data is valid. It only continues to evaluate the answers if the data is valid. You DO NOT need to modify any code between here and the end of the function, nor should you, unless you have a good reason. All versions of this project can be completed WITHOUT modifying the code from this comment to the end of the function, so you should attempt to work with that restriction! */

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

/* IC: In this function, do any validation with validate the data was correctly entered in general, not for specific cases. Return false if you have told the user that they need to correct something. Return true if all data is valid. We have provided you with the basic constraints for the data, but you may improve the validation as a bonus (as long as you don't mess up our ability to test every option in your evaluateAnswers function!) */

function validateData() {
    let valid = true;

    if (routingNumber.length <9 || routingNumber.length > 9) {
        output("Please enter a 9 digits bank routing number!")
        valid = false;
    }

    if(transactionType=="0"){
        output("Please select a type of transaction!")
        valid = false;
    }

    if(transactionLocation=="0"){
        output("Please select a transaction location!")
        valid = false;
    }

    /*if(valid==true){
        output("All form data is valid")
    }*/
    
    return valid;

}

/* IC: In this function, use conditional logic to figure out if the user's input meets all of the constraints that we have provided. Return false if you have told the user that they need to correct something. Return true if all data is valid. NOTE: Although the focuses of this project are conditional logic and function returns, you may need to create additional variables, do some calculations, and/or do some String manipulation in order to successfully complete your project! */

function evaluateAnswers() {

    let valid = true;

    if (transactionType=="1" && routingNumber != "000000518") {
        output( "The routing number is incorrect for this type of transaction")
        valid = false;
    }
    else if(transactionType=="2" && routingNumber != "000000204" || "0000001193" || "000008002"){
        output( "The routing number is incorrect for this type of transaction")
        valid = false;
    }
    else if(transactionType=="3" && routingNumber != "000090007"){
        output( "The routing number is incorrect for this type of transaction")
        valid = false;
    } 
    else if(transactionType=="4"){

        if(transactionLocation == "1" && routingNumber.slice(0,4) != "0410" || "0412"){
        output( "The routing number is incorrect for this type of transaction")
        valid = false;
        }
        else if(transactionLocation == "2" && routingNumber.slice(0,4) != "0711"){
        output( "The routing number is incorrect for this type of transaction")
        valid = false;  
        }
        else if(transactionLocation == "2" && routingNumber.slice(0,4) != "0710"||"0712"||"0719"){
        output( "The routing number is incorrect for this type of transaction")
        valid = false;      

    }

    }

    return valid;
    output ("Sure, you can have ")
}

/* TIP: The above two functions are written using different techniques for communicating success or failure. In your project, we will be looking for consistency -- i.e., choose ONE of these methods (early returns, or tracking the success in a variable) and use it throughout your project! */