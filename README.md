Text My Calendar
================

This Google Apps Script creates a simple SMS interface to Google Calendar.

Installation
------------

### Dependencies ###

+ [Google Voice](http://voice.google.com) phone number
+ [Twilio](https://www.twilio.com/try-twilio) phone number (for now...)

### Setup ###

1. Set up a Google Voice number and make sure it forwards texts to your email. This can be changed in your Google Voice settings under _Voicemail & Text > Text Forwarding_.
2. Create a Gmail filter to catch the Google Voice emails you receive when you text yourself. Label them with **calendar**.
3. Obtain a Twilio phone number and fill in the fields of twilio.gs with your **Account SID**, **Auth Token**, your **Twilio phone number**, and the phone number you'd like to receive notifications from. You can find the first two on your Twilio dashboard and the third on the Numbers tab.
4. Create a new project at http://script.google.com. Copy and paste the scripts into script files.
5. Set triggers (under _Resources > Current project's triggers_) to run main every minute. _Note: the first time you do this, you will need to authorize the script to run._

Usage
-----

Text your Google Voice number! If the first word of your text is not a keyword, Text My Calendar assumes that you are trying to add an event.

### Keywords ###

+ **next**: texts you the next appointment on your calendar.
+ **five**: texts you the five next appointments between now and the day after tomorrow.
+ **tday**: texts you the remaining appointments for today.
+ **tomo**: texts you all the appointments for tomorrow.

### Adding an Event ###

Text My Calendar uses Google Calendar's quick add to create an event. Text your calendar something like

    Dinner with John tomorrow at 7 at Chez Panisse.
