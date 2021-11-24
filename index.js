var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var Locations = require('./src/Locations.js');
var indexChecker = new Array();
var stringTaken = "0";
var allJSON = Locations.sendWholeJson();
var time
var readyForBookingDate
var takeToWebsite = [16.942625, 50.685255]
var toBecomeRed = [19.942625, 50.685255]
var combination
var takenCoordinates
var takenCoordinatesRed = new Array();
var extractRetreiveTopic
var numberFoundDates = 0
subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module


subscriber.eventListener.on("mqttRecieved", function(topic, payload) {
    try {
        console.log(payload.length)

        extractRetreiveTopic = Locations.extractRetreiveTopic(payload)

        if (payload.length < 30) { // date payload length is a maximum of 27
            var dayName = Locations.extractDay(payload)
            var timeChosen = Locations.extractTime(payload)
            var booleanValue = Locations.validateTime(dayName, timeChosen)
            time = Locations.hourMinute(payload)



            if (booleanValue != true) {
                console.log("no booking the time chosen is not valid by any dentist office")
                publisher.publish(JSON.stringify({ time: "no booking the time chosen is not valid by any dentist office" }))

            } else {



                console.log("this is the indexchecker " + indexChecker)
                console.log("this is the time chosen" + extractRetreiveTopic)


                var countKey = Object.keys(indexChecker).length; // how many elements in the array

                for (var x = 0; x < countKey; x++) {

                    var splitIndex = indexChecker[x].split("/");
                    for (var i = 0; i < splitIndex.length; i++) {
                        if (splitIndex[i] == (extractRetreiveTopic)) {
                            console.log("we found a matching date")
                            numberFoundDates = 1
                            console.log(splitIndex[i])
                            console.log(splitIndex[i + 1])
                            toBecomeRed = (splitIndex[i + 1])

                            var stringRed = JSON.stringify(toBecomeRed)
                            var noBrackets1 = stringRed.replace('[', '');
                            var noBrackets2 = noBrackets1.replace(']', '');


                            removeLastChar = noBrackets2.slice(0, noBrackets2.length - 1);
                            getLat = removeLastChar.slice(1);
                            var parsedIntointLat = parseFloat(getLat)
                            var getLong = removeLastChar.slice(11, 20);
                            var parsedIntointLong = parseFloat(getLong)


                            takenCoordinatesRed.push([parsedIntointLat, parsedIntointLong])

                        }
                    }
                }

                if (numberFoundDates == 0) {
                    console.log("we did not find")
                    takenCoordinatesRed = []
                }
                takenCoordinatesRed.push(takeToWebsite)




                var newObject = { takenData: takenCoordinatesRed }


                var sendThis = JSON.stringify(newObject)
                var wholeJson = JSON.stringify(allJSON)
                    //var wihtoutQuotesString = JSON.stringify(withoutQuotes)
                    //console.log(wihtoutQuotesString)
                var newJSON = ("[" + wholeJson + "," +
                    sendThis + "]")
                publisher.publish(newJSON)
            }
        } else {
            var readyForBookingDate = Locations.extractClientTime(payload)
            var dentistData = Locations.extractDentistData(payload, readyForBookingDate) // booking payload load length is about 70
            takenCoordinates = Locations.extractDnetistCoordinates(payload)

            combination = dentistData + "/" + "[" + takenCoordinates + "]"

            var takenDateAndCoordinates = Locations.storeChosenOnes(combination)
            if (indexChecker.includes(takenDateAndCoordinates)) {
                console.log("the date is taken")

                //stringTaken = JSON.stringify(takenCoordinatesRed)
                var userId = Locations.extractUserId(payload)
                var requestId = Locations.extractRequestId(payload)


                publisher.publish(JSON.stringify({
                    userId,
                    requestId,
                    time: "none",
                    takenCoordinatesRed
                }))
            } else {
                console.log("the date is NOT taken")

                indexChecker.push(combination) // so that it will not be taken again
                var userId = Locations.extractUserId(payload)
                var requestId = Locations.extractRequestId(payload)

                takenCoordinates = Locations.extractDnetistCoordinates(payload)
                    //takenCoordinatesRed.push(takenCoordinates)

                publisher.publish(JSON.stringify({
                    userId,
                    requestId,
                    time,
                }))
            }

            /* THIS IS THE LOGIC WE HAD BEFORE IF WE ONLY HAD COORDINATES TO SEND AND LOOP THROUGH IN MAPBOX, BUT WE NEED TO SEND MORE THAN COORDINATES, THATS WHY WE CANNOT USE THIS LOGIC FOR NOW

            i could use this logic and loop through the coordinates only for the red 
            but still this logic does not include only the corresponding date 

                        var allCoordinates = Locations.entireCoordinates();

                        var countKey = Object.keys(stringTaken).length; // how many elements in the array
                        console.log(countKey)
                        if (countKey == "1") {
                            var coordinatesInString = JSON.stringify(allCoordinates)
                            var withoutQuotes = coordinatesInString.replace(/"/g, '');
                            // console.log(withoutQuotes)

                            wihtoutQuotesString = JSON.stringify(withoutQuotes)
                                //publisher.publish(wihtoutQuotesString)
                        } else {

                            for (var i = 0; i < takenCoordinatesRed.length; i++) {
                                var taken = takenCoordinatesRed[i]
                                if (allCoordinates.includes(taken)) {
                                    allCoordinates.splice(i, 1)
                                        //console.log(allCoordinates)

                                    var coordinatesInString = JSON.stringify(allCoordinates)
                                    var withoutQuotes = coordinatesInString.replace(/"/g, '');
                                    wihtoutQuotesString = JSON.stringify(withoutQuotes)

                                    //console.log(coordinatesInString)
                                    // publisher.publish(wihtoutQuotesString)
                                }
                            }
                        }
                        */
        }


    } catch (error) {
        console.log(error.message)
    }

});