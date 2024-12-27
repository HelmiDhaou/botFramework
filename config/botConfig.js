const { BotFrameworkAdapter } = require('botbuilder');
const { MemoryStorage, ConversationState, UserState } = require('botbuilder');

// Bot configuration (app credentials are optional in local development)
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID || '',
    appPassword: process.env.MICROSOFT_APP_PASSWORD || ''
});

// Set up state storage (you can replace this with a database like CosmosDB if needed)
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);
module.exports = {
    adapter,
    conversationState,
    userState,
    
};
