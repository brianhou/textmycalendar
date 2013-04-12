function sendTexts(textArray) {
    sendfn = twilio; // sendfn must take one argument, the text message
    maxtext = 122; // maxtext is the number of characters allowed
    if (textArray != undefined) {
        for (var i = 0; i < textArray.length; i++) {
            var text = textArray[i];
            if (text.length > maxtext) {
                sendfn(text.slice(0, maxtext));
                textArray[i] = text.slice(maxtext);
                i--;
            } else {
                sendfn(text);
            }
        }
    }
}

function twilio(msg) {
    // message must be <= 122 characters or it will be truncated
    var maxtext = 122;
    msg = msg.slice(0, maxtext);
    Logger.log(msg);
    var accountSid = "YOUR TWILIO ID NUMBER";
    var authToken = "YOUR TWILIO AUTH TOKEN";
    var url = "https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/SMS/Messages.json";
    var options = {
        method: "post",
        headers: {
            Authorization: "Basic " + Utilities.base64Encode(accountSid + ":" + authToken)
        },
        payload: {
            From: "YOUR TWILIO NUMBER",
            To: "RECEIVING NUMBER",
            Body: msg
        }
    };
    var response = UrlFetchApp.fetch(url, options);
}
