// parse: parses if the input string is a valid combination of numbers and operators
function parse(inputString) {
    const regex = /(\d+(\.\d+)?[\+−×÷])(\d+(\.\d+)?)/;
    if (regex.test(inputString)) { // valid expression
        const matcher = /(\d+(\.\d+)?)|([\+−×÷])/g;
        return inputString.match(matcher); // return array in the form ["1", "+", "1"]
    } else {
        return []; // not a valid input, so return empty array
    }
}

// operate: operates on two numbers
function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (operator === "+") {
        return a + b;
    } else if (operator === "−") {
        return a - b;
    } else if (operator === "×") {
        return a * b;
    } else if (operator === "÷") {
        return a / b;
    }
}

// calculate: goes through the parsed expression and calculates with the operations from left to right
function calculate(arr) {
    let accumulator = arr[0]; // start with the first number
    opIndex = 1;
    numIndex = 2;
    while (numIndex < arr.length) {
        accumulator = operate(accumulator, arr[numIndex], arr[opIndex])
        numIndex += 2;
        opIndex += 2;
    }

    return accumulator;
}

document.addEventListener("DOMContentLoaded", () => {
    const allButtons = document.querySelectorAll(".button");
    let displayText = "";

    allButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let val = button.textContent.trim();

            if (val === "=") {
                let parsedExpr = parse(displayText);

                if (parsedExpr == []) {
                    displayText = "invalid expression";
                } else {
                    displayText = calculate(parsedExpr);
                }
                
            } else if (val === "Clear" || val === "On/Off") {
                displayText = "";
            } else {
                displayText += val;
            }

            document.querySelector("#display-text").textContent = displayText;
        });
    });
});
