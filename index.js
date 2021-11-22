var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var Locations = require('./src/Locations.js');
var indexChecker = new Array();
var takenCoordinatesRed = new Array();
var availableCoordinatesRed = new Array();
var stringTaken = "0";
var allCoordinates = Locations.entireCoordinates();
var allJSON = Locations.sendWholeJson();
var time
var readyForBookingDate

subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module


subscriber.eventListener.on("mqttRecieved", function(topic, payload) {
    try {
        console.log(payload.length)
        if (payload.length < 50) { // date payload length is a maximum of 27
            var dayName = Locations.extractDay(payload)
            var timeChosen = Locations.extractTime(payload)
            var booleanValue = Locations.validateTime(dayName, timeChosen)
            time = Locations.hourMinute(payload)

            readyForBookingDate = Locations.extractDateForBooking(payload)

            if (booleanValue != true) {
                console.log("no booking the time chosen is not valid by any dentist office")
                publisher.publish(JSON.stringify({ time: "no booking the time chosen is not valid by any dentist office" }))

            } else {
                // var coordinatesInString = JSON.stringify(allCoordinates)
                // var withoutQuotes = coordinatesInString.replace(/"/g, '');
                // console.log(withoutQuotes)

                var wholeJson = JSON.stringify(allJSON)
                    //var wihtoutQuotesString = JSON.stringify(withoutQuotes)
                    //console.log(wihtoutQuotesString)
                publisher.publish(wholeJson)
            }
        } else {
            var dentistData = Locations.extractDentistData(payload, readyForBookingDate) // booking payload load length is about 70
            var takenDate = Locations.storeChosenOnes(dentistData)
                //console.log(takenDate)
            if (indexChecker.includes(takenDate)) {
                console.log("the date is taken")
                var takenCoordinates = Locations.extractDnetistCoordinates(payload)
                takenCoordinatesRed.push(takenCoordinates)
                    //console.log(takenCoordinatesRed)
                stringTaken = JSON.stringify(takenCoordinatesRed)

                var userId = Locations.extractUserId(payload)
                var requestId = Locations.extractRequestId(payload)

                // publisher.publish(stringTaken) DONT UNCOMMENT
                publisher.publish(JSON.stringify({
                    userId,
                    requestId,
                    time: "none"
                }))
            } else {
                console.log("the date is NOT taken")

                indexChecker.push(takenDate)
                console.log(indexChecker)
                var userId = Locations.extractUserId(payload)
                var requestId = Locations.extractRequestId(payload)

                publisher.publish(JSON.stringify({
                    userId,
                    requestId,
                    time
                }))
            }



            var countKey = Object.keys(stringTaken).length; // how many elements in the array
            console.log(countKey)
            if (countKey == "1") {
                var coordinatesInString = JSON.stringify(allCoordinates)
                var withoutQuotes = coordinatesInString.replace(/"/g, '');
                // console.log(withoutQuotes)

                var wihtoutQuotesString = JSON.stringify(withoutQuotes)
                    // publisher.publish(wihtoutQuotesString)
            } else {

                for (var i = 0; i < takenCoordinatesRed.length; i++) {
                    var taken = takenCoordinatesRed[i]
                    if (allCoordinates.includes(taken)) {
                        allCoordinates.splice(i, 1)
                            //console.log(allCoordinates)

                        var coordinatesInString = JSON.stringify(allCoordinates)
                        var withoutQuotes = coordinatesInString.replace(/"/g, '');
                        var wihtoutQuotesString = JSON.stringify(withoutQuotes)

                        //console.log(coordinatesInString)
                        // publisher.publish(wihtoutQuotesString)
                    }
                }
            }
        }


    } catch (error) {
        console.log(error.message)
    }

});