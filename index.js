const btns = document.querySelectorAll("button");
const display = document.querySelector("#display");
function evaluateExpression(string) {
    if (string === "") return "";
    for (let i = 0; i < string.length; i++) {
        if (isNaN(string[i]) && string[i] !== "." && string[i] !== " ") {
            const operator = string[i];
            const left = evaluateExpression(string.slice(0, i));
            const right = evaluateExpression(string.slice(i + 1));
            switch (operator) {
                case "+":
                    return left + right;
                case "-":
                    return left - right;
                case "*":
                    return left * right;
                case "/":
                    return left / right;
                default:
                    throw new Error("Unknown operator: " + operator);
            }
        }
    }
    return parseFloat(string);
}

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;
        if (value === "back-space") {
            if (display.textContent.length > 1) {
                display.textContent = display.textContent.slice(0, -1);
            } else {
                display.textContent = "0";
            }
        } else  if (value === "C") {
            display.textContent = "0";
        } else if (value === "=") {
            const result = evaluateExpression(display.textContent);
            display.textContent = result;
        } else {
            if (display.textContent === "0" || display.textContent === "Error") {
                display.textContent = value;
            }else {
                display.textContent += value;
            }
        }
    });
});