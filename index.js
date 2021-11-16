var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var Locations = require('./src/Locations.js');
var indexChecker = new Array();


subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module


subscriber.eventListener.on("mqttRecieved", function(topic, payload) {
    try {
        if (payload.length < 50) { // date payload length is a maximum of 27
            var dayName = Locations.extractDay(payload)
            var timeChosen = Locations.extractTime(payload)
            var booleanValue = Locations.validateTime(dayName, timeChosen)

            if (booleanValue != true) {
                publisher.publish("no booking the time chosen is not valid by any dentist office"); // the visualize will give booking response of rejection
            }
        } else {
            var dentistData = Locations.extractDentistData(payload) // booking payload load length is about 70
            var Takencoordinates = Locations.storeChosenOnes(dentistData)
            console.log(Takencoordinates)
            if (indexChecker.includes(Takencoordinates)) {
                publisher.publish("Its already taken")
            } else {
                indexChecker.push(Takencoordinates)
                console.log(indexChecker)
                publisher.publish("Confirmation")

            }


        }
        //publisher.publish(Takencoordinates);
        //publisher.publish(OKcoordinates);

        publisher.publish(dayName)

    } catch (error) {
        console.log(error.message)
    }

});