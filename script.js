class OutOfRangeError extends Error {
            constructor(arg) {
                super(`Expression should only consist of integers and +-/* characters and not < ${arg} >`);
                this.name = "OutOfRangeError";
            }
        }

        class InvalidExprError extends Error {
            constructor() {
                super("Expression should not have an invalid combination of expression");
                this.name = "InvalidExprError";
            }
        }

        // EvalString Function
        function evalString(expression) {
            try {
                // Remove spaces
                expression = expression.replace(/\s+/g, '');

                // Check for invalid characters
                if (/[^0-9+\-*/]/.test(expression)) {
                    const invalidChar = expression.match(/[^0-9+\-*/]/)[0];
                    throw new OutOfRangeError(invalidChar);
                }

                // Check for invalid combination of operators
                if (/[\+\-\*/]{2,}/.test(expression)) {
                    throw new InvalidExprError();
                }

                // Check if expression starts with an invalid operator
                if (/^[+\-*/]/.test(expression)) {
                    throw new SyntaxError("Expression should not start with invalid operator");
                }

                // Check if expression ends with an invalid operator
                if (/[+\-*/]$/.test(expression)) {
                    throw new SyntaxError("Expression should not end with invalid operator");
                }

                // Evaluate the expression
                const result = eval(expression);
                return result;

            } catch (error) {
                // Handle and rethrow errors
                if (error instanceof OutOfRangeError || error instanceof InvalidExprError || error instanceof SyntaxError) {
                    throw error;
                } else {
                    throw new Error("An unknown error occurred");
                }
            }
        }

        // DOM Elements
        const inputField = document.getElementById('inputField');
        const evaluateButton = document.getElementById('evaluateButton');
        const resultDiv = document.getElementById('result');

        // Event Listener
        evaluateButton.addEventListener('click', () => {
            const expression = inputField.value;
            try {
                const result = evalString(expression);
                resultDiv.textContent = `Result: ${result}`;
                resultDiv.classList.remove('error');
            } catch (error) {
                resultDiv.textContent = `Error: ${error.message}`;
                resultDiv.classList.add('error');
            }
        });
    
