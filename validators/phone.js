const { MAX_NUMBER_OF_ATTEMPTS } = require("../utils/constants");

exports.validatePhoneNumber = async prompt => {
    const phone = prompt.recognized ? prompt.recognized.value : prompt;
    const phoneRegex = /^\+?[1-9]\d{7,14}$/;

    let isValid = phoneRegex.test(phone.trim()); 

    if (prompt.attemptCount > MAX_NUMBER_OF_ATTEMPTS) {
        if (!isValid && prompt.recognized) prompt.recognized.value = null;
        return true; 
    }

    if (phone) {
        if (isValid) {
            return true; 
        } else {
            return false;
        }
    } else {
        return false; 
    }
};
