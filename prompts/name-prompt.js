const { TextPrompt } = require("botbuilder-dialogs");
const { nameValidator } = require("../validators");
const { NAME_PROMPT } = require("../utils/prompt-ids");

const namePrompt = new TextPrompt(NAME_PROMPT, nameValidator);

exports.namePrompt = namePrompt;
