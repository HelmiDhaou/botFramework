const { MAX_NUMBER_OF_ATTEMPTS } = require("../utils/constants");


exports.validateEmail = async prompt => {
  const email = prompt.recognized ? prompt.recognized.value : prompt;
  const emailRegex = new RegExp("[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,6}");
  let isValid = emailRegex.test(email);
  if (prompt.attemptCount > MAX_NUMBER_OF_ATTEMPTS) {
    if (!isValid && prompt.recognized) prompt.recognized.value = null;
    return true;
  }
  if (email) {
    if (isValid) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
