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

// this will set to true whenever an operand (not =) has been pressed.
// If true, pressing any other operand will change the operand.
// While true, pressing a numeral button will:
// -- add 1 to numberCount
// -- alterDisplayValue(num), thereby progressing to the following number
// -- set this boolean to false
let operandFunctionOn = false;


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

// This happens when you press =.
function evaluate(){ 
    console.log("This has no effect yet.");
}

// This happens when you press an operand (not =).
function inputOperand(oper){
    operandString[numberCount] = oper;
    operandFunctionOn = true;
    printDisplayValue();
}

// This happens when you press C.
function clearField(){
    numberCount = 0;
    displayValue = [0];
    displayValueString = [String(displayValue[0])];
    operandString = [];

    //newDisplayValue(0);
    decimalFunctionOn = false;
    printDisplayValue();
}

// This happens when you press ".".
function enableDecimal(){
    if(decimalFunctionOn) ;
    else{
        decimalFunctionOn = true;
        alterDisplayValue(".");
    }
}

// This happens when you press a numeral, or ".".
// this function is for adding a numeral (or decimal) to displayValue and its string.
function alterDisplayValue(num){
    if(displayValueString[numberCount] === "0") displayValueString[numberCount] = String(num);
    else if(operandFunctionOn) {
        numberCount++;
        operandFunctionOn = false;
        displayValueString[numberCount] = String(num);
    }
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

// This is what produces the output for the display 
// (at the moment it only console.log()s it)
function printDisplayValue(){
    let string = "";
    for(let i = 0; i < operandString.length; i++){
        string += displayValueString[i];
        string += operandString[i];
    }
    if(operandString.length < displayValueString.length){
        string += displayValueString[displayValueString.length-1];
    }

    console.log(string);
}

// This doesn't do anything yet but it'll work with evaluate().
// the arguments will be (operandString[i], displayValue[i] and displayValue[i+1]).
function operate(op, a, b){
    switch(op){
        case "+": return a + b;
        case "-": return a - b;
        case "x": return a * b;
        case "/": return a / b;
    }
}