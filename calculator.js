// operate: operates on two numbers
function operate(a, b, operator) {
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

document.addEventListener("DOMContentLoaded", () => {
    const allButtons = document.querySelectorAll(".button");
    let displayText = "";

    allButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let val = button.textContent.trim();

            if (val === "=") {
                // display the new value
            } else if (val === "Clear" | val === "On/Off") {
                displayText = "";
            } else {
                displayText += val;
            }

            document.querySelector("#display-text").textContent = displayText;
        });
    });
});
