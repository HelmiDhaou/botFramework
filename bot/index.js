const { ActivityHandler} = require('botbuilder');
const { DialogSet } = require('botbuilder-dialogs');
const { HotelReservationDialog } = require('./hotelReservationDialog');

class HotelReservationBot extends ActivityHandler {
    constructor(conversationState, userState) {
        super();

        this.conversationState = conversationState;
        this.userState = userState;

        // Create the DialogSet from conversationState property
        this.dialogs = new DialogSet(conversationState.createProperty('dialogs'));

        // Add the HotelReservationDialog to the DialogSet
        this.dialogs.add(new HotelReservationDialog('hotelReservationDialog'));

        // Handle incoming messages
        this.onMessage(async (context, next) => {
            const dialogContext = await this.dialogs.createContext(context);
            // If there is an active dialog, continue the dialog; else, start a new dialog
            if (dialogContext.activeDialog) {
                await dialogContext.continueDialog();
            } else {
                // Start the hotel reservation dialog
                await dialogContext.beginDialog('hotelReservationDialog');
            }

            // Save changes to conversation state
            await this.conversationState.saveChanges(context);
            await next();
        });

        // Handle the event when a new user joins the conversation
        // this.onMembersAdded(async (context, next) => {
        //     const membersAdded = context.activity.membersAdded;
        //     for (let member of membersAdded) {
        //         if (member.id !== context.activity.recipient.id) {
        //             const dialogContext = await this.dialogs.createContext(context);
        //             await dialogContext.beginDialog('hotelReservationDialog',{startBooking: false});
        //         }
        //     }

        //     await next();
        // });
    }
}

module.exports.HotelReservationBot = HotelReservationBot;