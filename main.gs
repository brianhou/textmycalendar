/** Instructions:
 *  1, create a Gmail label and filter to catch things
 *  2, copy and paste the following code into a new script editor page
 *  3, authorize everything
 *  4, set current triggers to every minute
 */

function main() {
    var texts = GmailApp.getUserLabelByName('calendar');
    var threads = texts.getThreads();

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var tomorrow = new Date(today.getTime() + 24*60*60*1000);
    var dayafter = new Date(tomorrow.getTime() + 24*60*60*1000);

    for (thread in threads) {
        var textsToSend;
        var messages = threads[0].getMessages();
        var message = messages[messages.length-1].getBody();

        // switch through all the cases of the key word
        message = message.replace("<br>", " ");
        var allCalendars = CalendarApp.getAllCalendars();
        var calendars = [];
        allCalendars.forEach(function(cal) {
            if (cal.isSelected() && cal.getName() != 'Weather') {
                calendars.push(cal);
            }
        });

        switch (message.toLowerCase().split(/[\s\n]/, 1)[0]) {
        case "next":
            // return the next event
            textsToSend = formatEvents(getEvents(calendars, now, dayafter).slice(0, 1));
            break;
        case "five":
            // return the next five events
            textsToSend = formatEvents(getEvents(calendars, now, dayafter).slice(0, 5));
            break;
        case "tday":
            // return all the events from now until midnight
            textsToSend = formatEvents(getEvents(calendars, now, tomorrow));
            break;
        case "tomo":
            // return all of tomorrow's events
            textsToSend = formatEvents(getEvents(calendars, tomorrow, dayafter));
            break;
        default:
            // add this to the calendar
            textsToSend = createEvent(message);
        }
    }
    sendTexts(textsToSend);
    texts.removeFromThreads(threads);
}
