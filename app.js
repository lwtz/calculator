const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__buttons');
const operatorKeys = calculator.querySelectorAll('[data-type="operator"]');
const display = calculator.querySelector('.calculator__screen');

keys.addEventListener('click', (e) => {
  if (!event.target.closest('span')) return;

  const key = e.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === 'number') {
    if (displayValue === '0' || previousKeyType === 'operator') {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  if (type === 'operator') {
    operatorKeys.forEach((key) => (key.dataset.state = ''));
    key.dataset.state = 'selected';

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === 'equal') {
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    display.textContent = operate(firstNumber, operator, secondNumber);
    operatorKeys.forEach((item) => (item.style.backgroundColor = '#8b87a3'));
  }

  if (type === 'clear') {
    display.textContent = '0';
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
  }

  if (type === 'del') {
    display.textContent = display.textContent.slice(0, -1);
  }

  calculator.dataset.previousKeyType = type;
});

const operate = (firstArgument, operator, secondArgument) => {
  const operations = {
    plus: (a, b) => a + b,
    minus: (a, b) => a - b,
    times: (a, b) => a * b,
    divide: (a, b) => (b === 0 ? null : a / b),
  };

  const operation = operations[operator];
  if (!operation) {
    throw new ValueError('Invalid operator');
  }
  return operation(firstArgument, secondArgument);
};
