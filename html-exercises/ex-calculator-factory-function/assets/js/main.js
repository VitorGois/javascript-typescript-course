function calculatorConstructor() {
  return {
    display: document.querySelector('.display'),
    btnClear: document.querySelector('.btn-clear'),
    
    start() {
      this.buttonClick();
      this.pressEnterKey();
    },

    pressEnterKey() {
      this.display.addEventListener('keyup', (e) => {
        const keyPress = e.keyCode;
        const enterKeyCode = 13;

        if (keyPress === enterKeyCode) this.calculateEquation();
      })
    },

    buttonClick() {
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
    },

    showBtnNumInDisplay(value) {
      this.display.value += value;
    },

    clearDisplay() {
      this.display.value = '';
    },

    deleteLastNum() {
      this.display.value = this.display.value.slice(0, -1);
    },

    calculateEquation() {
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
    },

    alertInvalidExpression() {
      alert('Invalid expression');
      this.clearDisplay();
    },
  }; 
};

const calculator = calculatorConstructor();
calculator.start();