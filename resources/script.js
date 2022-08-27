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

// this will set to true whenever you've pressed = and an answer is displaying.
// If true, pressing a numeral will replace the displayed answer
// (so you can't add numerals to the end of an answer).
// Meanwhile, you can use the displayed answer as normal with operands.
// Set this to false when you press a numeral or an operand.
let justEvaluated = false;

// assigning functionality to the numeral buttons:
//const numeralButtonsTemp = document.querySelectorAll(".numerals button");
const numeralButtons = []; 
document.querySelectorAll(".numerals button").forEach((button) => {
    let num = Number(button.textContent);

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

// now we assign functionality to the operands. This will be easier.
const operandButtons = [
    document.querySelector(".add"),
    document.querySelector(".subtract"),
    document.querySelector(".multiply"),
    document.querySelector(".divide"),
    document.querySelector(".equals")
];
operandButtons.forEach((button) => {
    if(button.textContent === "=") button.addEventListener('click', evaluate);
    else button.addEventListener('click', () => inputOperand(button.textContent));
})

// This is where we'll create the display.
const display = document.querySelector(".display");
const displayFields = [];

displayFields.push(document.createElement("div"));
display.appendChild(displayFields[0]); 
displayFields[0].classList.add("display-field");

// This is the const that represents the height of the display.
// This is used for the function that removes old results before
// they can clip above the top.
// (we can't use display.offsetHeight because it'll change)
const displayHeight = display.offsetHeight;

clearField();

// This happens when you press =.
function evaluate(){ 
    if(displayValue.length === operandString.length){
        console.log("evaluate ERROR"); 
        return;
    }

    let oldEquation = displayFields[displayFields.length-1].textContent;

    // first is multiplication and division.
    // 5 + 10 / 2 - 3
    // 0 0  1 1 2 2 3
    // 5 +  5     - 3
    // 0 0  1     1 2 
    // turn tempResult into displayValue[i], 
    for(let i = 0; i < operandString.length; i++){
        if(operandString[i] === "x" || operandString[i] === "/"){
            let tempResult = operate(operandString[i], displayValue[i], displayValue[i+1]);
            
            // DEBUG
            //console.log(`${displayValue[i]} ${operandString[i]} ${displayValue[i+1]} is ${tempResult}.`);
            
            displayValue[i] = tempResult;
            displayValueString[i] = String(tempResult);
            displayValue.splice(i+1,1);
            displayValueString.splice(i+1,1);
            operandString.splice(i,1);
            
            //DEBUG
            //printDisplayValue();
            i = -1;
        }
    }
    // second is addition and subtraction.
    for(let i = 0; i < operandString.length; i++){
        if(operandString[i] === "+" || operandString[i] === "-"){
            let tempResult = operate(operandString[i], displayValue[i], displayValue[i+1]);
            
            // DEBUG
            //console.log(`${displayValue[i]} ${operandString[i]} ${displayValue[i+1]} is ${tempResult}.`)

            displayValue[i] = tempResult;
            displayValueString[i] = String(tempResult);
            displayValue.splice(i+1,1);
            displayValueString.splice(i+1,1);
            operandString.splice(i,1);

            // DEBUG
            //printDisplayValue();
            i = -1;
        }
    }

    clearFieldEvaluate(oldEquation, displayValue[0]);
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

// This happens when you press an operand (not =).
function inputOperand(oper){
    if(justEvaluated) justEvaluated = false;

    if(!operandFunctionOn){
        operandFunctionOn = true;
        if(decimalFunctionOn) decimalFunctionOn = false;
        if(displayValueString[numberCount].endsWith(".")){
            displayValueString[numberCount] = displayValueString[numberCount].slice(0, -1);
        }
    }

    operandString[numberCount] = oper;
    printDisplayValue();
}

// This happens when you press C.
// Let's sneakily make this what happens when it evaluates, too.
function clearField(){
    numberCount = 0;
    displayValue = [0];
    displayValueString = [String(displayValue[0])];
    operandString = [];

    printDisplayValue();
}
function clearFieldEvaluate(oldEquation, result){
    numberCount = 0;
    displayValue = [result];
    displayValueString = [String(displayValue[0])];
    operandString = [];

    justEvaluated = true;

    // I'll put some sort of function here that:
    // - takes this string: `${oldEquation} = <br><span class="solution">${result}</span>`
    // - assigns it to the current .display-field div
    // - does some javascript magic to add a new .display-field div
    // - and make it so that printDisplayValue() is altering the textContent of that instead.



    //newDisplayValue(0);
    (result === Math.floor(result)) ? decimalFunctionOn = false : decimalFunctionOn = true;
    
    
    displayFields[displayFields.length-1].innerHTML = `${oldEquation} = <br><span class="solution">${result}</span>`;
    newDisplayField();
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
    if(operandFunctionOn) {
        numberCount++;
        operandFunctionOn = false;
        displayValueString[numberCount] = String(num);
    } 
    else if(displayValueString[numberCount] === "0" || justEvaluated) displayValueString[numberCount] = String(num);
    else displayValueString[numberCount] += num;
    justEvaluated = false;
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
        (operandString[i] === "/") ? string += operandString[i]
                                   : string += " " + operandString[i] + " ";
    }
    if(operandString.length < displayValueString.length){
        string += displayValueString[displayValueString.length-1];
    }

    displayFields[displayFields.length-1].textContent = string;
}

function newDisplayField(){
    displayFields[displayFields.length-1].classList.add("old");

    displayFields.push(document.createElement("div"));
    display.appendChild(displayFields[displayFields.length-1]); 
    displayFields[displayFields.length-1].classList.add("display-field");

    // put something here to remove the first child of display if it clips 
    // above the display box.
    while(display.offsetHeight > displayHeight){
        display.removeChild(display.firstChild);
    }

    document.querySelectorAll(".old").forEach((old) => {
        let temp = window.getComputedStyle(old).getPropertyValue("opacity");
        temp *= 2 / 3;
        old.style.opacity = temp;
    });
}