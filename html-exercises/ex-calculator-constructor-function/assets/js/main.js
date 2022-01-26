function Calculator() {

  this.display = document.querySelector('.display');
  this.btnClear = document.querySelector('.btn-clear');

  this.start = () => {
    this.buttonClick();
    this.pressEnterKey();
  };

  this.buttonClick = () => {
    document.addEventListener('click', (e) => {
      const el = e.target;

      if (el.classList.contains('btn-num')) {
        this.showBtnNumInDisplay(el.innerText);
      }

      if (el.classList.contains('btn-clear')) {
        this.clearDisplay();
      }

      if (el.classList.contains('btn-del')) {
        this.deleteLastNum();
      }

      if (el.classList.contains('btn-equal')) {
        this.calculateEquation();
      }
    });
  };

  this.pressEnterKey = () => {
    this.display.addEventListener('keyup', (e) => {
      const keyPress = e.keyCode;
      const enterKeyCode = 13;

      if (keyPress === enterKeyCode) this.calculateEquation();
    })
  };

  this.buttonClick = () => {
    document.addEventListener('click', (e) => {
      const el = e.target;

      if (el.classList.contains('btn-num')) {
        this.showBtnNumInDisplay(el.innerText);
      }

      if (el.classList.contains('btn-clear')) {
        this.clearDisplay();
      }

      if (el.classList.contains('btn-del')) {
        this.deleteLastNum();
      }

      if (el.classList.contains('btn-equal')) {
        this.calculateEquation();
      }
    });
  };
  
  this.showBtnNumInDisplay = (value) => {
    this.display.value += value;
  };

  this.clearDisplay = () => {
    this.display.value = '';
  };

  this.deleteLastNum = () => {
    this.display.value = this.display.value.slice(0, -1);
  };

  this.calculateEquation = () => {
    let equation = this.display.value;

    try {
      equation = eval(equation);

      if (!equation) {
        this.alertInvalidExpression();
        return;
      }
      
      this.display.value = String(equation);
    } catch (e) {
      this.alertInvalidExpression();
      return;
    }
  };

  this.alertInvalidExpression = () => {
    alert('Invalid expression');
    this.clearDisplay();
  };

}

const calculator = new Calculator();
calculator.start();
