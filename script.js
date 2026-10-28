function add(a, b){
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


function operate(operator, a, b){
    switch(operator){
        case "+": 
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "x":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        default:
            alert("Enter a valid operator");
    }
}


const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const currentValue = document.querySelector(".current-value");
const previousOperation = document.querySelector(".previous-operation");
const operators = ["+", "-", "x", "/"];
let num1 = 0;
let num2 = 0;
let result = 0;
let operator = "";
let isCalcOver = false;
buttons.forEach((button) => {
    button.addEventListener('click', event =>{
        //digits
        if ("0123456789".includes(button.textContent)) {
            if(isCalcOver){ // if result has been displayed
                currentValue.textContent = ""  // clear old result
                // so here we are starting a new calc, so we set isCalcOver to false
                isCalcOver = false; 
                operator = "";

            }
            currentValue.textContent += button.textContent;
            if(operator === ""){
                num1 = Number(currentValue.textContent);
                console.log(num1);
            }
            else{
                num2 = Number(currentValue.textContent);
                console.log(num2);
            }
            
        }
        //operator
        else if(operators.includes(button.textContent)){
            if(isCalcOver){
                num1 = Number(result);
                isCalcOver = false;
            }
            operator = button.textContent;
            currentValue.textContent = "";
        }
        //ALL CLEAR
        else if(button.textContent === "ALL CLEAR"){
            currentValue.textContent = "";
            num1 = 0;
            num2 = 0;
            result = 0;
            operator = "";
            isCalcOver = false;
        }
        //CLEAR
        else if(button.textContent === "CLEAR"){
            // when clear pressed after "="  that is, after calc over
            if(isCalcOver){
                currentValue.textContent = "";
                num1 = 0;
                num2 = 0;
                result = 0;
                operator = "";
                isCalcOver = false;
            }
            else{
                currentValue.textContent = currentValue.textContent.slice(0, -1);
                if (operator === "") {
                    num1 = Number(currentValue.textContent);
                }
                else {
                    num2 = Number(currentValue.textContent);
                }
            } 
        }
        // . decimal button
        else if (button.textContent === "."){
            // not more than one .
            if(!currentValue.textContent.includes(".")){
                currentValue.textContent += button.textContent;
            }
        }
        else if (button.textContent === "="){
            // divison by 0
            if(operator === "/" && num2 === 0){
                currentValue.textContent = "Division by zero not possible";
                isCalcOver = true;
            }
            else{
                result = operate(operator, num1, num2);
                currentValue.textContent = result;
                previousOperation.textContent = `${num1} ${operator} ${num2} = `;
                isCalcOver = true;
            }
        }
    });
});





