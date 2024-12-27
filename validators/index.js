const email = require("./email");
const name = require("./name");
const phone = require("./phone");
const number = require("./number");
exports.nameValidator = name.validateName;
exports.emailValidator = email.validateEmail;
exports.phoneValidator = phone.validatePhoneNumber;
exports.numberValidator = number.validateNumber;

