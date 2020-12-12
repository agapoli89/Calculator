const ADDITION_ID = "js-addition";
const BACK_ID = "js-arrow";
const CANCEL_ID = "js-cancel";
const CLEAR_ID = "js-clear";
const COMMA_ID = "js-comma";
const DISPLAY_ID = "js-display";
const DIVIDE_ID = "js-divide";
const EQUAL_ID = "js-equal";
const FRACTION_ID = "js-fraction";
const INVERT_ID = "js-invert";
const MEMORY_ADD_ID = "js-M+";
const MEMORY_CLEAR_ID = "js-MC";
const MEMORY_MINUS_ID = "js-M-";
const MEMORY_READ_ID = "js-MR";
const MEMORY_SET_ID = "js-MS";
const MULTIPLY_ID = "js-multiply";
const NUMBER_CLASS_SELECTOR = ".buttons-area__btn--number";
const NUMBER_OF_NUMBERS_ON_KEYBOARD = 10;
const PERCENT_ID = "js-percent";
const SUBSTRACTION_ID = "js-substraction";
const SQUARE_ID = "js-sqrt";

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

        this.bindToDisplay();
        this.bindToNumbers();
        this.bindToButtons();
    }
    bindToDisplay() {
        const display = document.getElementById(DISPLAY_ID);
        
        if (!display) {
            throw("The element is not finded");
        }
        display.textContent = this.displayValue;
        this.display = display;  
    }
    bindToNumbers() {
        const numbers = document.querySelectorAll(NUMBER_CLASS_SELECTOR);
        
        if(numbers.length !== NUMBER_OF_NUMBERS_ON_KEYBOARD) {
            console.log('M');
            
        }
    }
    bindToButtons() {
        console.log('Bind to buttons');
    }
}

new Calculator();