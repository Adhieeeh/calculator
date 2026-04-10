const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        
        if (button.classList.contains('number') || button.classList.contains('decimal')) {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            display.value = currentInput;
        } else if (button.classList.contains('operator')) {
            if (currentInput === '' && previousInput !== '') {
                operator = value;
                return;
            }
            if (previousInput !== '' && currentInput !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else if (button.classList.contains('equals')) {
            if (previousInput !== '' && currentInput !== '') {
                calculate();
                operator = '';
            }
        } else if (button.classList.contains('clear')) {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else if (button.classList.contains('backspace')) {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
    });
});

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    display.value = result;
    currentInput = result.toString();
    previousInput = '';
}
