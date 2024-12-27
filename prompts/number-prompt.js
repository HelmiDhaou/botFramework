const { NumberPrompt } = require("botbuilder-dialogs");
const { numberValidator } = require("../validators");
const { NUMBER_PROMPT } = require("../utils/prompt-ids");

const numberPrompt = new NumberPrompt(NUMBER_PROMPT, numberValidator);

exports.numberPrompt = numberPrompt;
