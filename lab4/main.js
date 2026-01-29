"use strict"

/* IC: Declare global variables to store user-entered information and results here */
let routingNumber, transactionType, transactionLocation, confirmationCode, partialView, confirmationMessage;

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

/*For this function I decided to use the if conditional logic because of my thinking process, in this step
I prefer to evaluate each type of data separately. We are not in a step that is evaluating the input
values as a whole, just checking if each value is following the parameters needed to start evaluating 
the data*/

function validateData() {

    let valid = true;

    /*This is still a work in progress but is meant to analyze if the user entered a number */

    /*if (Number(routingNumber) == NaN){
        output("Please enter a number!")
        valid = false;
    }*/

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
    go to the html, you will see that"0"is an empty option, I put it so that when the user enters the page,
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

/* IC: In this function, use conditional logic to figure out if the user's input meets all of the constraints that we have provided. Return false if you have told the user that they need to correct something. Return true if all data is valid. NOTE: Although the focuses of this project are conditional logic and function returns, you may need to create additional variables, do some calculations, and/or do some String manipulation in order to successfully complete your project! */

/*For this function I used the if/else if conditional logic because in this case I'm evaluating
all three types of input data together, I'm seeing them as a whole unit that can appear in different
specific combinations.  */

function evaluateAnswers() {

    let valid = true;


    /*In this part I'm saying that if the user chose the first option and their routing number is not equal to
     "000000518", the system has to output an error message*/

    if (transactionType == "1" && routingNumber != "000000518") {
        output("The routing number is incorrect for this type of transaction")
        valid = false;
    }

    /*In this part I'm saying that if the user chose the second option and their routing number is not equal to
     any of those options, the system has to output an error message*/

    else if (transactionType == "2" && routingNumber != "000000204" && routingNumber != "000001193" && routingNumber != "000008002") {
        output("The routing number is incorrect for this type of transaction")
        valid = false;
    }

    /*In this part I'm saying that if the user chose the third option and their routing number is not equal to
     "000090007", the the system has to output an error message*/

    else if (transactionType == "3" && routingNumber != "000090007") {
        output("The routing number is incorrect for this type of transaction")
        valid = false;
    }

    /*In the next three conditionals I'm evaluating the different options that need to be true if the 
    user chose the fourth transaction type, the first, second or third transaction locations and if the 
    first 4 digits of the number they entered correspond to the ones assigned to each location.*/

    /*I could have put in one line the "else if (transactionType == "4"" and then nested the other 
    values that are the ones that change, but I prefered each option to have its own line of code, 
    it was easier for me visually to have it like it*/

    /*For this conditionals I had to use .slice(xn, yn), to be able to just evaluate the first four
    digits of the number. What this does is that it slices the string from the start character, in
    this case digit, that you choose (xn) to the end that you decide, that would be yn, but yn is not included 
    in the new string that will result out of this. I read about the string processing in the web page
    https://javascript.info/string */

    else if (transactionType == "4" && transactionLocation == "1" && routingNumber.slice(0, 4) != "0410" && routingNumber.slice(0, 4) != "0412") {
        output("The routing number is incorrect for this type of transaction")
        valid = false
    }

    else if (transactionType == "4" && transactionLocation == "2" && routingNumber.slice(0, 4) != "0711") {
        output("The routing number is incorrect for this type of transaction")
        valid = false;
    }

    else if (transactionType == "4" && transactionLocation == "3" && routingNumber.slice(0, 4) != "0710" && routingNumber.slice(0, 4) != "0712" && routingNumber.slice(0, 4) != "0719") {
        output("The routing number is incorrect for this type of transaction")
        valid = false;

    }

    /*This is a temporary conditional, if the data is valid, the system will output a message telling the
    user all data is valid */

    if (valid == true) {
        output("All form data is valid")
    }

    /*Here I will put the code that generates de confirmation code, the partial view and the message to let 
    know the user if the processing step was succesful. For the first one I will use string processing to be 
    able to get the individual digits in each of the 3 sets of 3 digits in the routing number and then add 
    them up to get the confirmation code. For the second one, I will also use string processing to get the 
    6th, 7th, 8th and 9th digit from the routing number and then append them to "XXXX-X" to get a partial view 
    of the routing number. Finally to generate the message , I would have to call the input values of the user, 
    the resulting string of the partial view  and the resulting number of the confirmation code function  */

    return valid;


}

/* TIP: The above two functions are written using different techniques for communicating success or failure. In your project, we will be looking for consistency -- i.e., choose ONE of these methods (early returns, or tracking the success in a variable) and use it throughout your project! */

