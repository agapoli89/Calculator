const ADDITION_ID = "js-addition",
BACK_ID = "js-arrow",
CANCEL_ID = "js-cancel",
CLEAR_ID = "js-clear",
COMMA_ID = "js-comma",
DISPLAY_ID = "js-display",
DISPLAY_CALC_ID = "js-display-calc",
DIVIDE_ID = "js-divide",
EQUAL_ID = "js-equal",
FRACTION_ID = "js-fraction",
INVERT_ID = "js-invert",
MEMORY_ADD_ID = "js-M+",
MEMORY_CLEAR_ID = "js-MC",
MEMORY_MINUS_ID = "js-M-",
MEMORY_READ_ID = "js-MR",
MEMORY_SET_ID = "js-MS",
MULTIPLY_ID = "js-multiply",
NUMBER_CLASS = "buttons-area__btn--number",
NUMBER_OF_NUMBERS_ON_KEYBOARD = 10,
PERCENT_ID = "js-percent",
SUBSTRACTION_ID = "js-substraction",
SQUARE_ID = "js-sqrt";

class Calculator {
    constructor() {
        this.memoryValue = 0;
        this.displayValue = "0";
        this.previousValue = null;
        this.selectedFunction = null;
        this.isFunctionDone = false;
        this.repeatedValue = 0;
        this.wasEqualClicked = false;
        this.wasSpecialFunctionClicked = false;
        this.wasEqualToCalcClicked = false;
        this.lastValueToCalc = "";
        this.selectedFunctionToCalc = false;
        this.selectedFunctionToNotConcatCalc = false;
        this.valueToSquare = null;
        this.percentIsClicked = false;
        this.valueToReciproc = null;

        this.bindToDisplay();
        this.bindToNumbers();
        this.bindToButtons();
    }
    bindToDisplay() {
        const display = document.getElementById(DISPLAY_ID);
        const displayCalc = document.getElementById(DISPLAY_CALC_ID);
        
        if (!display) {
            throw("The element is not found");
        }
        display.textContent = this.displayValue;
        /* displayCalc.textContent = this.displayValue; */
        this.display = display;
        this.displayCalc = displayCalc;    
    }
    bindToNumbers() {
        const numbers = Array.from(document.getElementsByClassName(NUMBER_CLASS));
        numbers.forEach(number => number.addEventListener("click", event => this.concatenateNumber(event)));
    }

    bindToButtons() {
        this.bindFunctionToButton(MEMORY_CLEAR_ID, () => this.memoryClear());
        this.bindFunctionToButton(MEMORY_READ_ID, () => this.memoryRead());
        this.bindFunctionToButton(MEMORY_ADD_ID, () => this.memoryAdd());
        this.bindFunctionToButton(MEMORY_MINUS_ID, () => this.memoryMinus());
        this.bindFunctionToButton(MEMORY_SET_ID, () => this.memorySet());
        this.bindFunctionToButton(CLEAR_ID, () => this.clear());
        this.bindFunctionToButton(CANCEL_ID, () => this.cancel());
        this.bindFunctionToButton(ADDITION_ID, () => this.addition());
        this.bindFunctionToButton(SUBSTRACTION_ID, () => this.substraction());
        this.bindFunctionToButton(MULTIPLY_ID, () => this.multiplication());
        this.bindFunctionToButton(DIVIDE_ID, () => this.division());
        this.bindFunctionToButton(EQUAL_ID, () => this.equal());
        this.bindFunctionToButton(BACK_ID, () => this.back());
        this.bindFunctionToButton(INVERT_ID, () => this.inversion());
        this.bindFunctionToButton(COMMA_ID, () => this.addComma());
        this.bindFunctionToButton(PERCENT_ID, () => this.percent());
        this.bindFunctionToButton(SQUARE_ID, () => this.square());
        this.bindFunctionToButton(FRACTION_ID, () => this.oneXth());
    }

    bindFunctionToButton(id, callback) {
        const element = document.getElementById(id);

        if (!element) {
            console.warn(`The element ${id} is not found`);
            return;
        } 

        element.addEventListener('click', () => {
            callback();
            
            if (element.textContent === "+" || element.textContent === "-" || element.textContent === "*" || element.textContent === "/" || element.textContent === "=" || element.textContent === "√" || element.textContent === "%" || element.textContent === "1/x") {
                this.bindToDisplayCalc(element);
            }
        });
    }

    bindToDisplayCalc(e) {

        if ((this.wasEqualToCalcClicked & !this.wasEqualClicked) || this.selectedFunctionToNotConcatCalc) {
            if (e.textContent === "√") {
                this.displayCalc.textContent = this.valueToSquare ? this.valueToSquare + e.textContent : this.previousValue + e.textContent;
                this.valueToSquare = this.displayValue;
            } else {
                this.displayCalc.textContent = this.previousValue + e.textContent;
            }
        } else if (this.selectedFunctionToCalc) {
            this.displayCalc.textContent = "";
            this.selectedFunctionToCalc = false;
        } else {
            if (e.textContent === "√") {
                this.displayCalc.textContent = this.valueToSquare ? this.valueToSquare + e.textContent : this.lastValueToCalc + e.textContent;
                this.valueToSquare = this.displayValue;
            } else if (e.textContent === "%") {
                this.displayCalc.textContent += this.lastValueToCalc + e.textContent;
                this.percentIsClicked = true;  
            } else if (e.textContent === "1/x") {
                this.displayCalc.textContent = this.valueToReciproc !== null ? `reciproc(${this.valueToReciproc})` : `reciproc(${this.lastValueToCalc})`;
                this.valueToReciproc = this.displayValue;              
            } else {
                if (this.percentIsClicked === true) {
                    this.displayCalc.textContent = "";
                } else {
                    this.displayCalc.textContent += this.lastValueToCalc + e.textContent;
                }
            }
        }
    }

    concatenateNumber(event) {
        this.displayValue = this.displayValue === null || this.displayValue === '0' || this.wasSpecialFunctionClicked
        ? event.target.textContent
        : this.displayValue + event.target.textContent;

        if (this.wasEqualClicked) {
            this.previousValue = null;
            this.repeatedValue = null;
            this.wasEqualClicked = false;
        }

        this.wasSpecialFunctionClicked = false;
        this.isFunctionDone = false;
        this.display.textContent = this.displayValue;
        this.lastValueToCalc = this.displayValue;   
        this.selectedFunctionToNotConcatCalc = false;  
    }

    memoryClear() {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = 0;
    }

    memoryRead() {
        this.wasSpecialFunctionClicked = true;
        this.changeDisplayValue(this.memoryValue);
        
    }

    memoryAdd() {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = this.memoryValue + Number(this.displayValue);
    }

    memoryMinus() {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = this.memoryValue - Number(this.displayValue);
    }

    memorySet () {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = Number(this.displayValue);
    }

    clear() {
        this.previousValue = null;
        this.selectedFunction = null;
        this.changeDisplayValue(null);
        this.displayCalc.textContent = "";
    }

    cancel() {
        this.changeDisplayValue(null);
        this.displayCalc.textContent = "";
    }

    addition(hasRepeatedValue) {
        this.callPreviousFunctionAndAssignNew(this.addition, hasRepeatedValue);

        if(this.isFunctionDone) {
            this.setValuesIfIsFunctionDone();

            return;
        }

        const displayValue = this.getDisplayValue();
        const previousValue = this.getPreviousValue(hasRepeatedValue);
        const newValue = displayValue + previousValue;
        
        this.getRepeatedValue(hasRepeatedValue, newValue);

        this.setValuesAfterSettingNewValue(newValue);
        this.selectedFunctionToNotConcatCalc = true;
    }

    substraction(hasRepeatedValue) {
        this.callPreviousFunctionAndAssignNew(this.substraction, hasRepeatedValue);

        if(this.isFunctionDone) {
            this.setValuesIfIsFunctionDone();

            return;
        }

        const displayValue = this.getDisplayValue();
        const previousValue = this.getPreviousValue(hasRepeatedValue);
        let newValue;

        if(this.previousValue !== null) {
            newValue = hasRepeatedValue
             ? displayValue - this.repeatedValue
             : previousValue - displayValue;

             this.getRepeatedValue(hasRepeatedValue, newValue);
        }

        this.setValuesAfterSettingNewValue(newValue);
        this.selectedFunctionToNotConcatCalc = true;
    }

    multiplication(hasRepeatedValue) {
        this.callPreviousFunctionAndAssignNew(this.multiplication, hasRepeatedValue);

        if(this.isFunctionDone) {
            this.setValuesIfIsFunctionDone();

            return;
        }

        const displayValue = this.getDisplayValue();
        const previousValue = this.getPreviousValue(hasRepeatedValue);
        const newValue = displayValue * previousValue;

        this.getRepeatedValue(hasRepeatedValue, newValue);

        this.setValuesAfterSettingNewValue(newValue);
        this.selectedFunctionToNotConcatCalc = true;
    }

    division(hasRepeatedValue) {
        this.callPreviousFunctionAndAssignNew(this.division, hasRepeatedValue);

        if(this.isFunctionDone) {
            this.setValuesIfIsFunctionDone();

            return;
        }

        const displayValue = this.getDisplayValue();
        const previousValue = this.getPreviousValue(hasRepeatedValue);
        const newValue = hasRepeatedValue
            ? displayValue / this.repeatedValue
            : previousValue === 0
                ? displayValue
                : previousValue / displayValue;

        this.getRepeatedValue(hasRepeatedValue, newValue);
        this.setValuesAfterSettingNewValue(newValue);
        this.selectedFunctionToNotConcatCalc = true;
    }

    percent() {
        const newValue = this.previousValue * this.displayValue / 100;

        this.callSpecialFunction(newValue);
    }

    square() {
        const newValue = this.displayValue ? Math.sqrt(this.displayValue) : Math.sqrt(this.previousValue);

        this.callSpecialFunction(newValue);
    }

    oneXth() {
        const newValue = 1/this.displayValue;

        this.callSpecialFunction(newValue);
    }

    callSpecialFunction(value) {
        this.wasSpecialFunctionClicked = true;
        this.wasEqualClicked = false;
        this.changeDisplayValue(value);
    }

    equal() {
        this.isFunctionDone = false;
        
        if (this.previousValue === null & this.selectedFunction === null) {
            throw("Any function was selected");
        }
        
        if (!this.wasEqualClicked) {

            this.selectedFunction(false);
        } else {
            this.selectedFunction(true);
            this.selectedFunctionToCalc = true;
        }
        this.wasEqualClicked = true;
        this.wasEqualToCalcClicked = true;
        this.selectedFunctionToNotConcatCalc = false;
    }

    inversion() {
        this.changeDisplayValue(this.displayValue >= 0 ? -Math.abs(this.displayValue) : Math.abs(this.displayValue));
        this.lastValueToCalc = this.displayValue;
    }

    back() {
        this.changeDisplayValue(this.displayValue ? this.displayValue.slice(0,-1) : null);
    }

    addComma() {
        if (!this.display.textContent.includes('.')) {
            this.changeDisplayValue(`${this.displayValue ? this.displayValue : 0}.`);
        }
    }

    callPreviousFunctionAndAssignNew(currentFunction, hasRepeatedValue) {
        if (this.selectedFunction !== currentFunction && this.selectedFunction) {
            this.selectedFunction(hasRepeatedValue)
        }
        this.selectedFunction = currentFunction;
    }

    setValuesIfIsFunctionDone() {
        this.repeatedValue = Number(this.previousValue);
        this.displayValue = '0';
        this.wasEqualClicked = false;
    }

    getDisplayValue() {
        return Number(this.display.textContent);
    }

    getPreviousValue(hasRepeatedValue) {
        return hasRepeatedValue ? this.repeatedValue : Number(this.previousValue);
    }

    getRepeatedValue(hasRepeatedValue, newValue) {
        this.repeatedValue = hasRepeatedValue 
        ? this.repeatedValue 
        : this.wasEqualClicked 
            ? newValue
            : Number(this.display.textContent);
    }

    setValuesAfterSettingNewValue(newValue) {
        this.isFunctionDone = true;
        this.wasEqualClicked = false;
        this.displayValue = null;
        this.display.textContent = this.previousValue !== null ? newValue : this.display.textContent;
        this.previousValue = this.previousValue !== null ? newValue : this.display.textContent;
    }
    
    changeDisplayValue(value) {
        const isNoValue = value === null || value === "";
        this.displayValue = value;
        this.display.textContent = isNoValue ? "0" : value.toString();
    }
}

new Calculator();