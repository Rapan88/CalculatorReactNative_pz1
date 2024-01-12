export const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    lastType: null,
};

export const handleNumber = (value, state) => {
    if (state.currentValue === "0" || state.lastType === "operator") {
        return {currentValue: `${value}`, lastType: null};
    }

    return {
        currentValue: `${state.currentValue}${value}`,
    };
};

const handleEqual = (state) => {
    const {currentValue, previousValue, operator} = state;

    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    const resetState = {operator: null, previousValue: null};

    switch (operator) {
        case "+":
            return {
                currentValue: `${previous + current}`,
                ...resetState,
            };
        case "-":
            return {
                currentValue: `${previous - current}`,
                ...resetState,
            };
        case "*":
            return {
                currentValue: `${previous * current}`,
                ...resetState,
            };
        case "/":
            return {
                currentValue: `${previous / current}`,
                ...resetState,
            };

        default:
            return state;
    }
};

const calculator = (type, value, state) => {
    switch (type) {
        case "number":
            return handleNumber(value, state);
        case "clear":
            return initialState;
        case "posneg":
            return {
                currentValue: `${parseFloat(state.currentValue) * -1}`,
            };
        case "percentage":
            return {
                currentValue: `${parseFloat(state.currentValue) * 0.01}`,
            };
        case "operator":
            if (state.lastType === "operator") {
                return {
                    operator: value,
                };
            }
            return {
                operator: value,
                previousValue: state.currentValue,
                currentValue: "0",
                lastType: "operator",
            };
        case 'dot':
            if (!state.currentValue.includes('.')) {
                return {
                    currentValue: `${state.currentValue}.`
                };
            }
            return state;
        case "equal":
            return handleEqual(state);
        default:
            return state;
    }
};

export default calculator;
