let displayValue = 0;
let displayValueString = String(displayValue);

// assigning functionality to the numeral buttons:
//const numeralButtonsTemp = document.querySelectorAll(".numerals button");
const numeralButtons = []; 
document.querySelectorAll(".numerals button").forEach((button) => {
    let num = Number(button.textContent);
    console.log(num);
    if(isNaN(num)) {
        button.addEventListener('click', clearField);
        return;
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
    newDisplayValue(0);
}

// this function is for adding a numeral (or decimal??) to displayValue and its string.
function alterDisplayValue(num){
    if(displayValueString === "0") displayValueString = String(num);
    else displayValueString += num;
    displayValue = Number(displayValueString);
    printDisplayValue();
}
// this function is for completely changing the displayValue and displayValueString.
function newDisplayValue(num){
    displayValue = num;
    displayValueString = String(displayValue);
    printDisplayValue();
}

function printDisplayValue(){
    console.log(displayValueString);
}

function operate(op, a, b){
    switch(op){
        case "+": return a + b;
        case "-": return a - b;
        case "x": return a * b;
        case "/": return a / b;
    }
}