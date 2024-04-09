let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    if (buffer.length > 14) {
        buffer = buffer.substring(0, 14);
    }

    screen.innerText = buffer;
}


function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;

        case '=':
            if (previousOperator === undefined) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = undefined;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;

        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function handleSquareRoot() {
    const squareRootValue = Math.sqrt(parseFloat(buffer));
    screen.innerText = squareRootValue;
    buffer = squareRootValue.toString();
    runningTotal = squareRootValue;
    previousOperator = undefined;
}


function init() {
    document.querySelector('.calc_buttons').
        addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        })
}

init();
