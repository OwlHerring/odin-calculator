let displayValue = 0;

// assigning functionality to the numeral buttons:
const numeralButtonsTemp = document.querySelectorAll(".numerals button");
const numeralButtons = []; 
numeralButtonsTemp.forEach((button) => {
    let num = Number(button.textContent);
    console.log(num);
    if(isNaN(num)) {
        button.addEventListener('click', clearField);
        return;
    }
    else{
        numeralButtons[num] = button;
        numeralButtons[num].addEventListener('click', () => {
            displayValue = num;
            printDisplayValue();
            //alert("It works!")
        });
    }
})

function clearField(){
    displayValue = 0;
    printDisplayValue();
}

function printDisplayValue(){
    console.log(displayValue);
}

function operate(op, a, b){
    switch(op){
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
    }
}