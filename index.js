var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var Locations = require('./src/Locations.js');
var indexChecker = new Array();
var takenCoordinatesRed = new Array();
var bookedCoordinates = new Array();
var stringTaken = "0";
var allCoordinates = Locations.entireCoordinates();
var allJSON = Locations.sendWholeJson();
var time
var readyForBookingDate
var arrayOfMaps = new Array()
var instantRed
var takeToWebsite = [16.942625, 50.685255]



subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module


subscriber.eventListener.on("mqttRecieved", function(topic, payload) {
    try {
        console.log(payload.length)
            // The if works when we subscribe to a specific time 
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



                extractRetreiveTopic = Locations.extractRetreiveTopic(payload)

                takenCoordinatesRed = [
                    [22.942625, 33.685255]
                ]

                for (var i = 0; i < arrayOfMaps.length; i++) {
                    arrayOfMaps[i].forEach(function(value, key) { // get all values in the array 

                        if (key == extractRetreiveTopic) { // each time we check for the topic from visualizer 
                            takenCoordinatesRed.push(value) // we will send the pure coordinate values to Visualizers each time 
                        }
                    })
                }

                /*
                                    const allTimesAndCoordinates = new Map([
                                        ["2022-9-16 12:00", [22.942625, 33.685255]]
                                    ]);

                                          arrayOfMaps = [
                    allTimesAndCoordinates // this will be updated when we book and its a confirmation
                ]

                    */

                //---------------------------------------------------------------------------


                /*
                var allTimesAndCoordinates

                allTimesAndCoordinates = new Map([
                    ["2022-9-16 12:00", [22.942625, 33.685255]]
                ]);

                takenCoordinatesRed = [
                    [22.942625, 33.685255]
                ]


                if (allTimesAndCoordinates.get(extractRetreiveTopic)) {
                    var weFoundOne = (allTimesAndCoordinates.get(extractRetreiveTopic)) // get the value only if it exists 
                    console.log("We found one")
                    takenCoordinatesRed.push(weFoundOne)
                    console.log(weFoundOne)
                } else {
                    console.log("Nothing is found")
                    takenCoordinatesRed = [
                        [29.942625, 37.685255]
                    ]
                }
*/
                var newObject = { takenData: takenCoordinatesRed }

                var sendThis = JSON.stringify(newObject)
                var wholeJson = JSON.stringify(allJSON)



                var newJSON = ("[" + wholeJson + "," +
                    sendThis + "]")
                publisher.publish(newJSON)

            }
        } else {
            var dentistData = Locations.extractDentistData(payload, readyForBookingDate) // booking payload load length is about 70
            var takenDate = Locations.storeChosenOnes(dentistData)
                //console.log(takenDate)
            if (indexChecker.includes(takenDate)) { // MUST INCLUDE THE USERID
                console.log("the date is taken")

                /*
                var takenCoordinates = Locations.extractDentistCoordinates(payload)
                takenCoordinatesRed.push(takenCoordinates)
                    //console.log(takenCoordinatesRed)
                stringTaken = JSON.stringify(takenCoordinatesRed)
*/
                var userId = Locations.extractUserId(payload)
                var requestId = Locations.extractRequestId(payload)

                // publisher.publish(stringTaken) DONT UNCOMMENT
                publisher.publish(JSON.stringify({
                    userId,
                    requestId,
                    time: "none"
                }))
            } else if (!indexChecker.includes(takenDate)) {
                console.log("the date is NOT taken")

                indexChecker.push(takenDate)
                console.log(indexChecker)
                var userId = Locations.extractUserId(payload)
                var requestId = Locations.extractRequestId(payload)
                var coordinates = Locations.extractDentistCoordinates(payload)
                publisher.publish(JSON.stringify({
                    userId,
                    requestId,
                    time
                }))


                // if a booking happens this block will be invoked 
                // it will save the coordinate to a spefic time key 
                // we will have a huge array that will always be filled with time:key when we click on the time subscribe then we click on the book 

                // we need key value pairs to be saved when there is a booking successfull 
                // time : coordinateTaken

                // website receives the time : coordinate when we click on the subscribe we get time 
                // when we click on the marker we get the coordinate 
                // if the time is already taken the coordinate will become red

                // the key is the coordinate because many people can have different times but times will never duplicate (the coordinate will stay one)
                // we have coordinate not an array of coordinates, because each person can book once, a different person will have a different coordinate to book at that time  

                bookedCoordinates.push(JSON.stringify(coordinates))
                var fullTime = Locations.extractClientTime(payload)
                allTimesAndCoordinates = new Map([
                    [fullTime, coordinates]
                ]);

                arrayOfMaps.push(allTimesAndCoordinates)
                for (var i = 0; i < arrayOfMaps.length; i++) {
                    console.log(arrayOfMaps[i])
                }

                // when a person subscribes, we put the date in the get function 
                // if the date matches we dont show the coordinate of the chosen date or we show it as red coordinate (it will not be clickable anyways)
                // else we show all coordinates

                console.log(fullTime)
                if (allTimesAndCoordinates.get(fullTime)) {
                    console.log(allTimesAndCoordinates.get(fullTime))
                    instantRed = (allTimesAndCoordinates.get(fullTime)) // it would be a nice feature to publish instantRed when we book, this will make the marker red as soon as you get a confirmation 

                    // when I push the array of Maps I will have to make the visualizer look for the subscribedTime in the visualizer component, and then the result of that will be an array of markers that are supposed to be red for that specific time, then I loop through that array in the mapbox to display them 
                    // the reason for doing that is that I cannot use the fullTime above to get instantRed, because this time is only accessible when we book, I want to show all the red markers for thos that subscribe, if I dont give this if statement in the visualizer, the visualizer will make all the markers in the arrayOfMaps red
                    // I can take the subscribed time from this component BUT it will not be right because its too late, its for those who probably subscribed, I want the red markers appear for future clients that will subscribe to to different times, then we check if the time they have matches one of the keys 

                    // I will be using this function in the visualzier 
                    /*    if (allTimesAndCoordinates.get(fullTime)) {
                    console.log(allTimesAndCoordinates.get(fullTime))
                    instantRed = (allTimesAndCoordinates.get(fullTime)) 
                    */
                    // full time is retrieveTopic()

                    takenCoordinatesRed.push(instantRed) // the marker chsoen will become red marker for other users that try to subscribe to this date as soon as we book 

                    // but will remain blue and visible when we book, if you click again on the same visible blue marker you will see that its already take (by you) 

                    //other people who subscribed after you or before you (but did not book this marker yet)will still see it blue, if you book it before them they will see rejection 

                    // BUT in the future if anyone tries to subscribe to this fullTime (or any fullTime) they will see a red marker for that period specifically so they will not even be able to try to book and then see a rejection

                } else {
                    console.log("its not in the map")
                }

            }

            // if array size is 1 

            allCoordinates = Locations.entireCoordinates();


            var countKey = Object.keys(stringTaken).length; // how many elements in the array
            console.log(countKey)
            if (countKey == "1") { // when there are no coordinates taken by booking online the countkey = 1
                var coordinatesInString = JSON.stringify(allCoordinates)
                console.log(coordinatesInString) // all of our coorindates in the json file
                    //var withoutQuotes = coordinatesInString.replace(/"/g, '');
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

        var allCoordinates = Locations.entireCoordinates();

        for (var i = 0; i < takenCoordinatesRed.length; i++) {
            console.log("the length of red coordinates")
            console.log(takenCoordinatesRed.length)
            var taken = takenCoordinatesRed[i]
            var stringifiedTaken = (JSON.stringify(taken))
            var stringifiedAllCoordinates = (JSON.stringify(allCoordinates))
            console.log(stringifiedAllCoordinates.includes(stringifiedTaken))

            if (stringifiedAllCoordinates.includes(stringifiedTaken)) {
                var allCordinatesParsed = JSON.parse(stringifiedAllCoordinates)
                console.log(allCordinatesParsed)
                allCordinatesParsed.splice(i, 1)
                    //console.log(allCoordinates)

                //var withoutQuotes = coordinatesInString.replace(/"/g, '');
                wihtoutQuotesString = JSON.stringify(allCordinatesParsed)

                console.log(allCordinatesParsed)
                    //console.log(coordinatesInString)
                publisher.publish(wihtoutQuotesString)


            }
        }

    } catch (error) {
        console.log(error.message)
    }

});