// parse: parses if the input string is a valid combination of numbers and operators
function parse(inputString) {
    const regex = /^(\d+(\.\d+)?[\+−×÷])(\d+(\.\d+)?)/;
    if (regex.test(inputString)) { // valid expression
        const matcher = /(\d+(\.\d+)?)|([\+−×÷])/g;
        return inputString.match(matcher); // return array in the form ["1", "+", "1"]
    } else {
        return null; // not a valid input, so return empty array
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
        if (b === 0) {
            return "Div by 0 Error"
        } else {
            return a / b;
        }
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

    return numCleanup(accumulator);
}

function numCleanup(number) {
    let tenCounter = 0;
    let res = String(number);
    if (number > 999999999999999) { // write in scientific notation
        while (number > 10) {
            number /= 10;
            tenCounter += 1;
        }

        res = truncate(number, 12) + "e" + String(tenCounter);
        console.log(res);
        
    } else {
        res = truncate(number, 15);
    }

    return res;
}

function truncate(number, digits) {
    return String(number).slice(0, digits);
}

document.addEventListener("DOMContentLoaded", () => {
    const allButtons = document.querySelectorAll(".button");
    let displayText = "";

    allButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let val = button.textContent.trim();

            if (val === "=") {
                let parsedExpr = parse(displayText);
                console.log(parsedExpr);

                if (parsedExpr == null) {
                    displayText = "Invalid Expression";
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
