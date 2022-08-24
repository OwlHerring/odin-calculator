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
        numeralButtons[num].addEventListener('click', () => alert("It works!"));
    }
})

function clearField(){
    console.log("Clear doesn't work yet.");
}

function operate(op, a, b){
    switch(op){
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
    }
}