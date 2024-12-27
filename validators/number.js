const { MAX_NUMBER_OF_ATTEMPTS } = require("../utils/constants");

exports.validateNumber = async prompt => {
    const value = prompt.recognized ? prompt.recognized.value : prompt;
    
    const positiveIntegerRegex = /^[1-9]\d*$/;

    let isValid = positiveIntegerRegex.test(value);

    if (prompt.attemptCount > MAX_NUMBER_OF_ATTEMPTS) {
        if (!isValid && prompt.recognized) prompt.recognized.value = null;
        return true; 
    }

    if (value) {
        if (isValid) {
            return true; 
        } else {
            return false; 
        }
    } else {
        return false; 
    }
};
