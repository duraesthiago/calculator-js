const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText; 
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""
    }
    // add Digit to calculator screen
    addDigit(digit){
        // check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit
        this.updateScreen();
    }

    // Process Operations
    processOperation(operation){
        //Checking if current value is empty
        if(this.currentOperationText.innerText === "" && operation != "C"){
            // Change Operation
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }
        

        // Get current and previous values
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;
        
        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
             case "DEL":
                this.processDelOperator();
                break;       
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }


    // Change values of calculator screen;
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else {
            // Checking if value is zero. If it is just add current value
            if(previous === 0){
                operationValue = current;
            }

            //Adding current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //Changing Math Operation
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];
        if (!mathOperations.includes(operation)){
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // DEL - Delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // CE - Erase current operator 
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    // C - Clear all oparations
    processClearAllOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // = Process
    processEqualOperator(){
        const operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
        this.currentOperationText.innerText = this.previousOperationText.innerText.split(" ")[0];
        this.previousOperationText.innerText = "";
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);


//For capture buttons´s actions
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        } else{
            calc.processOperation(value);
        }
    });
});

