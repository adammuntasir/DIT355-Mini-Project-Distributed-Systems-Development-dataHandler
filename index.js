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
        if (payload.length < 50 && payload.length > 10) { // date payload length is a maximum of 27
            var dayName = logic.extractDay(payload)
            var timeChosen = logic.extractTime(payload)
            if (logic.extractWeekends(payload) == "Saturday" || logic.extractWeekends(payload) == "Sunday") {
                publisher.publish(JSON.stringify({ time: "Not Open" }))
            } else {
                var booleanValue = logic.validateTime(dayName, timeChosen)
                time = logic.hourMinute(payload)
                console.log(booleanValue)
                if (booleanValue != true) {
                    console.log("no booking because the time chosen is not valid by any clinic")
                    okToSend = 0;
                    publisher.publish(JSON.stringify({ time: "Not Open" }))

                } else {
                    okToSend = 1
                    publisher.publish(payload)
                }
            }
        } else { // receive from circuit breaker length is 15
            var bytesString = String.fromCharCode(...payload)

            console.log(bytesString)
            publisher.publish(payload)

        }

    } catch (error) {
        console.log(error.message)
    }
})