const {
    ConfirmPrompt,
    WaterfallDialog,
    TextPrompt,
    ComponentDialog,
    ChoicePrompt
} = require('botbuilder-dialogs');
const { DateResolverDialog } = require('./dateResolverDialog');
const { MessageFactory, InputHints } = require('botbuilder');
const { emailPrompt, namePrompt, phonePrompt, numberPrompt } = require('../prompts');
const { EMAIL_PROMPT, TEXT_PROMPT, CONFIRM_PROMPT, CHOICE_PROMPT, NAME_PROMPT, PHONE_PROMPT, NUMBER_PROMPT } = require('../utils/prompt-ids');

const WATERFALL_DIALOG = 'waterfallDialog';
const DATE_RESOLVER_DIALOG = 'dateResolverDialog';

class HotelReservationDialog extends ComponentDialog {
    constructor(id) {
        super(id || 'HotelReservationDialog');
        this.initialDialogId = WATERFALL_DIALOG;

        
        // Add necessary dialogs
        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new DateResolverDialog(DATE_RESOLVER_DIALOG));
        this.addDialog(namePrompt);
        this.addDialog(emailPrompt);
        this.addDialog(phonePrompt);
        this.addDialog(numberPrompt);
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.greetUser.bind(this),
            this.handleGreetingResponse.bind(this),
            this.askName.bind(this),
            this.saveName.bind(this),
            this.askEmail.bind(this),
            this.saveEmail.bind(this),
            this.askPhone.bind(this),
            this.savePhone.bind(this),
            this.askCheckInDate.bind(this),
            this.saveCheckInDate.bind(this),
            this.askCheckOutDate.bind(this),
            this.saveCheckOutDate.bind(this),
            this.askRoomDetails.bind(this),
            this.saveRoomDetails.bind(this),
            this.askGuestDetails.bind(this),
            this.saveGuestDetails.bind(this),
            this.confirmBooking.bind(this),
            this.finalStep.bind(this),
            this.handleChangeChoice.bind(this)
        ]));
        
    }
    
    //  Greet the user and ask if they want to start a reservation
    async greetUser(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails.startBooking) {
            const messageText = 'Hello! Would you like to start a hotel reservation?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            return await stepContext.prompt(CONFIRM_PROMPT, {
                prompt: msg
            });
        } else {
            return await stepContext.next();
        }
    }
    
    // Handle the user response after greeting
    async handleGreetingResponse(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails.startBooking) {
            if (stepContext.result) {
                bookingDetails.startBooking = stepContext.result;
                return await stepContext.next();
            } else {
                await stepContext.context.sendActivity('Thank you for visiting! If you need assistance later, feel free to ask.');
                return stepContext.endDialog();
            }
        } else {
            return await stepContext.next();
        }
    }
    
    /**
    * Ask for the user's name.
    */
    async askName(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails?.name) {
            const messageText = 'What is your name?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            
            const repromptMessageText = "Please provide a valid name.";
            const repromptMessage = MessageFactory.text(repromptMessageText, repromptMessageText, InputHints.ExpectingInput);
            
            return await stepContext.prompt(NAME_PROMPT, {
                prompt: msg,
                retryPrompt: repromptMessage
            });
        } else {
            return await stepContext.next();
        }
    }
    
    async saveName(stepContext) {
        const bookingDetails = stepContext.options;
        if(stepContext.result)
            bookingDetails.name = stepContext.result;
        return await stepContext.next();
    }
    /**
    * Ask for the user's email address.
    */
    async askEmail(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails.email) {
            const messageText = 'What is your email address?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            
            const repromptMessageText = "Please provide a valid email address (e.g., user@example.com).";
            const repromptMessage = MessageFactory.text(repromptMessageText, repromptMessageText, InputHints.ExpectingInput);
            
            return await stepContext.prompt(EMAIL_PROMPT, {
                prompt: msg,
                retryPrompt: repromptMessage
            });
        } else {
            return await stepContext.next();
        }
        
    }
    
    // Save email method
    async saveEmail(stepContext) {
        const bookingDetails = stepContext.options;
        if(stepContext.result)
            bookingDetails.email = stepContext.result;
        return await stepContext.next();
    }
    
    
    /**
    * Ask for the user's phone number.
    */
    async askPhone(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails.phone) {
            const messageText = 'What is your phone number?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            
            const repromptMessageText = "Please provide a valid phone number.";
            const repromptMessage = MessageFactory.text(repromptMessageText, repromptMessageText, InputHints.ExpectingInput);
            
            return await stepContext.prompt(PHONE_PROMPT, {
                prompt: msg,
                retryPrompt: repromptMessage
            });
        } else {
            return await stepContext.next();
        }
    }
    
    // Save phone method
    async savePhone(stepContext) {
        const bookingDetails = stepContext.options;
        if(stepContext.result)
            bookingDetails.phone = stepContext.result;
        return await stepContext.next();
    }
    /**
    * Ask for the check-in date.
    */
    async askCheckInDate(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails.checkInDate) {
            return await stepContext.beginDialog(DATE_RESOLVER_DIALOG, { date: bookingDetails.checkInDate });
        } else {
            return await stepContext.next();
        }
    }
    
    // Save check-in date method
    async saveCheckInDate(stepContext) {
        const bookingDetails = stepContext.options;
        if(stepContext.result)
            bookingDetails.checkInDate = stepContext.result;
        return await stepContext.next();
    }
    
    /**
    * Ask for the check-out date.
    */
    async askCheckOutDate(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails.checkOutDate) {
            return await stepContext.beginDialog(DATE_RESOLVER_DIALOG, { date: bookingDetails.checkOutDate, checkout: true });
        } else {
            return await stepContext.next();
        }
    }
    
    async saveCheckOutDate(stepContext) {
        const bookingDetails = stepContext.options;
        if(stepContext.result)
            bookingDetails.checkOutDate = stepContext.result;
        return await stepContext.next();
    }
    /**
    * Ask for room details (number of rooms, number of guests).
    */
    async askRoomDetails(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails.rooms) {
            const messageText = 'How many rooms would you like to reserve?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            
            const repromptMessageText = "Please provide a positive number.";
            const repromptMessage = MessageFactory.text(repromptMessageText, repromptMessageText, InputHints.ExpectingInput);
            
            return await stepContext.prompt(NUMBER_PROMPT, {
                prompt: msg,
                retryPrompt: repromptMessage
            });
        } else {
            return await stepContext.next();
        }
    }
    
    // Save room details method
    async saveRoomDetails(stepContext) {
        const bookingDetails = stepContext.options;
        if(stepContext.result)
            bookingDetails.rooms = stepContext.result;
        return await stepContext.next();
    }
    
    /**
    * Ask for number of guests.
    */
    async askGuestDetails(stepContext) {
        const bookingDetails = stepContext.options;
        if (!bookingDetails.guests) {
            const messageText = 'For how many guests would you like to reserve?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            const repromptMessageText = "Please provide a positive number.";
            const repromptMessage = MessageFactory.text(repromptMessageText, repromptMessageText, InputHints.ExpectingInput);
            
            return await stepContext.prompt(NUMBER_PROMPT, {
                prompt: msg,
                retryPrompt: repromptMessage
            });
        } else {
            return await stepContext.next();
        }
    }
    
    // Save guest details method
    async saveGuestDetails(stepContext) {
        const bookingDetails = stepContext.options;
        if(stepContext.result)
            bookingDetails.guests = stepContext.result;
        return await stepContext.next();
    }
    
    /**
    * Confirm the details with the user.
    */
    async confirmBooking(stepContext) {
        const bookingDetails = stepContext.options;
        const messageText =
        `Please confirm, your booking details are:\n
Name: **${bookingDetails.name}**\n
Email: **${bookingDetails.email}**\n
Phone: **${bookingDetails.phone}**\n
Check-in Date: **${bookingDetails.checkInDate}**\n
Check-out Date: **${bookingDetails.checkOutDate}**\n
Rooms: **${bookingDetails.rooms}**\n
Guests: **${bookingDetails.guests}**\n
Is this information correct?`;
        const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        
        return await stepContext.prompt(CONFIRM_PROMPT, { prompt: msg });
    }
    
    /**
    * Final step, either complete or update the booking request
    */
    async finalStep(stepContext) {
        if (stepContext.result) {
            await stepContext.context.sendActivity('Thank you! Your reservation is confirmed!.');
            return stepContext.endDialog();
        } else {
            const changeOptions = ['Name', 'Email', 'Phone', 'Check-in Date', 'Check-out Date', 'Rooms', 'Guests'];
            const messageText = 'Which booking detail would you like to change?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            
            return await stepContext.prompt(CHOICE_PROMPT, {
                prompt: msg,
                choices: changeOptions.map(option => ({ value: option })),
                style: 1
            });
        }
    }
    
    async handleChangeChoice(stepContext) {
        const bookingDetails = stepContext.options;
        const userChoice = stepContext.result.value;
        switch (userChoice) {
            case 'Name':
            return await stepContext.replaceDialog(this.id, {
                ...bookingDetails,
                name: null
            });
            case 'Email':
            return await stepContext.replaceDialog(this.id, {
                ...bookingDetails,
                email: null
            });
            case 'Phone':
            return await stepContext.replaceDialog(this.id, {
                ...bookingDetails,
                phone: null
            });
            case 'Check-in Date':
            return await stepContext.replaceDialog(this.id, {
                ...bookingDetails,
                checkInDate: null
                
            });
            case 'Check-out Date':
            return await stepContext.replaceDialog(this.id, {
                ...bookingDetails,
                checkOutDate: null
            });
            case 'Rooms':
            return await stepContext.replaceDialog(this.id, {
                ...bookingDetails,
                rooms: null
            });
            case 'Guests':
            return await stepContext.replaceDialog(this.id, {
                ...bookingDetails,
                guests: null
            });
        }
    }
}

module.exports.HotelReservationDialog = HotelReservationDialog;
