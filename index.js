var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var logic = require('./src/logic.js');
var time
var access = require('../global_values')
var okToSend

subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module

subscriber.eventListener.on("mqttRecieved", function(topic, payload) {
    try {
        console.log(payload.length)
            // The if works when we subscribe to a specific time 
        if (payload.length < 50) { // date payload length is a maximum of 27
            var dayName = logic.extractDay(payload)
            var timeChosen = logic.extractTime(payload)
            var booleanValue = logic.validateTime(dayName, timeChosen)
            time = logic.hourMinute(payload)
            console.log(booleanValue)
            if (booleanValue != true) {
                console.log("no booking the time chosen is not valid by any dentist office")
                okToSend = 0;
            } else {
                okToSend = 1
                publisher.publish(payload)
            }
        }
        if (okToSend == 1) {
            publisher.publish(payload) // the problem is that when its false it will send the ok to the booking 
        } else {
            publisher.publish(JSON.stringify({ Fika: "Lunch and Fika times chosen, clinic is closed" }))
        }

    } catch (error) {
        console.log(error.message)
    }
})