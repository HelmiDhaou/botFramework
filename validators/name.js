const { MAX_NUMBER_OF_ATTEMPTS } = require("../utils/constants");

exports.validateName = async prompt => {
    const name = prompt.recognized ? prompt.recognized.value : prompt;
    const nameRegex = /^[A-Za-z\s]+$/; 
    let isValid = nameRegex.test(name.trim()); 

    if (prompt.attemptCount > MAX_NUMBER_OF_ATTEMPTS) {
        if (!isValid && prompt.recognized) prompt.recognized.value = null;
        return true; 
    }

    if (name) {
        if (isValid) {
            return true; 
        } else {
            return false;
        }
    } else {
        return false; 
    }
};
