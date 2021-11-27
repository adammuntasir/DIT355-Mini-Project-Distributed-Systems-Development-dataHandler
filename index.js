var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var logic = require('./src/logic.js');
var time
var allJSON = logic.sendWholeJson();
var arrayOfMaps = new Array()




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

            if (booleanValue != true) {
                console.log("no booking the time chosen is not valid by any dentist office")
                publisher.publish(JSON.stringify({ time: "no booking the time chosen is not valid by any dentist office" }))

            } else {
                publisher.publish(payload)
            }
        }
        publisher.publish(payload)

    } catch (error) {
        console.log(error.message)
    }
})