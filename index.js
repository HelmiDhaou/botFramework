require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Import bot configuration and bot logic
const { adapter, conversationState, userState } = require('./config/botConfig');
const { HotelReservationBot } = require('./bot');

const app = express();
const port = process.env.PORT || 3005;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Instantiate the bot with the conversation and user states
const bot = new HotelReservationBot(conversationState, userState);

// Handle incoming requests to the /api/messages endpoint
app.post('/api/messages', (req, res) => {
    // Process incoming activity with the Bot Framework Adapter
    adapter.processActivity(req, res, async (context) => {
        try {
            // Run the bot with the incoming context
            await bot.run(context);
        } catch (error) {
            console.error('Error handling activity:', error);
            res.status(500).send('Internal server error');
        }
    });
});

// Root route to check if the server is running
app.get('/', (req, res) => {
    res.status(200).send("Custom Bot Server is running!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
