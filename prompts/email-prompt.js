const { TextPrompt } = require("botbuilder-dialogs");
const { emailValidator } = require("../validators");
const { EMAIL_PROMPT } = require("../utils/prompt-ids");

const emailPrompt = new TextPrompt(EMAIL_PROMPT, emailValidator);

exports.emailPrompt = emailPrompt;
