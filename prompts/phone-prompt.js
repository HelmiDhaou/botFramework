const { TextPrompt } = require("botbuilder-dialogs");
const { phoneValidator } = require("../validators");
const { PHONE_PROMPT } = require("../utils/prompt-ids");


const phonePrompt = new TextPrompt(PHONE_PROMPT, phoneValidator);

exports.phonePrompt = phonePrompt;
