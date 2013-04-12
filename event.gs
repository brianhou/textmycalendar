function getEvents(allCalendars, startDate, endDate) {
    function sortEventsByStart(eventOne, eventTwo) {
        var oneDate = eventOne.getStartTime().getTime();
        var twoDate = eventTwo.getStartTime().getTime();
        if (oneDate < twoDate) {
            return -1;
        }
        if (oneDate > twoDate) {
            return 1;
        }
        return 0;
    }

    var allEvents = [];
    allCalendars.forEach(function(cal) {
        allEvents = allEvents.concat(cal.getEvents(startDate, endDate));
    });
    allEvents.sort(sortEventsByStart);
    return allEvents;
}

function formatEvents(calEvents) {
    var result = [];
    for (var i = 0; i < calEvents.length; i++) {
        var curr = "CAL: ";
        var e = calEvents[i];
        curr += e.getTitle() + " @ ";
        curr += dateString(e.getStartTime()) + " to ";
        curr += dateString(e.getEndTime()) + " at ";
        curr += e.getLocation();
        result.push(curr);
    }
    return result;
}

function createEvent(text) {
    var event = CalendarApp.createEventFromDescription(text);
    return [ event.getTitle() + " added!" ];
}

function dateString(date) {
    // e.g. Fri Apr 12 5:30p
    var result = date.toDateString().split(' ').slice(0, -1).join(' ') + " ";
    result += (date.getHours() > 12) ? (date.getHours() - 12) : (date.getHours());
    result += (date.getMinutes() >= 10) ? (":" + date.getMinutes()) : (":0" + date.getMinutes());
    result += (date.getHours() >= 12) ? "p" : "a";
    return result;
}
