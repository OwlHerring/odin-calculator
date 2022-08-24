// initializing as [] mostly just as a reminder for myself.
// however, their initial states are set to [0] and ["0"] by clearField().
let displayValue = [];
let displayValueString = [];
// This 
let operandString = [];

// this will set to true whenever the decimal button has been pressed.
// If true, the decimal button will not have any function if pressed again.
// Set this back to false whenever an operand has been pressed or it's reset
let decimalFunctionOn = false;
// this is what determines which displayValue[] we're on, basically.
let numberCount = 0;


clearField();

// assigning functionality to the numeral buttons:
//const numeralButtonsTemp = document.querySelectorAll(".numerals button");
const numeralButtons = []; 
document.querySelectorAll(".numerals button").forEach((button) => {
    let num = Number(button.textContent);
    console.log(num);
    if(isNaN(num)) {
        if(button.textContent === "C"){
            button.addEventListener('click', clearField);
            return;
        }
        else{ // if it's the decimal button 
            button.addEventListener('click', enableDecimal);
        } 
    }
    else{
        numeralButtons[num] = button;
        numeralButtons[num].addEventListener('click', () => {
            alterDisplayValue(num);
            //alert("It works!")
        });
    }
})

// The thing that will separate this from newDisplayValue(0) is that it will
// clear the board of all operands.
function clearField(){
    displayValue = [0];
    displayValueString = [String(displayValue[0])];

    //newDisplayValue(0);
    decimalFunctionOn = false;
    printDisplayValue();
}

function enableDecimal(){
    if(decimalFunctionOn) ;
    else{
        decimalFunctionOn = true;
        alterDisplayValue(".");
    }
}

// this function is for adding a numeral (or decimal??) to displayValue and its string.
function alterDisplayValue(num){
    if(displayValueString[numberCount] === "0") displayValueString[numberCount] = String(num);
    else displayValueString[numberCount] += num;
    displayValue[numberCount] = Number(displayValueString[numberCount]);
    printDisplayValue();
}
// this function is for completely changing the displayValue and displayValueString.
//function newDisplayValue(num){
//    displayValue = num;
//    displayValueString = String(displayValue);
//    printDisplayValue();
//}

function printDisplayValue(){
    console.log(displayValueString[numberCount]);
}

function operate(op, a, b){
    switch(op){
        case "+": return a + b;
        case "-": return a - b;
        case "x": return a * b;
        case "/": return a / b;
    }
}