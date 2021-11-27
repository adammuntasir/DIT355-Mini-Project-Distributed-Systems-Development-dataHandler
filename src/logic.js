let jsonObject = {
    "dentists": [{
            "id": 1,
            "name": "Your Dentist",
            "owner": "Dan Tist",
            "dentists": 3,
            "address": "Spannmålsgatan 20",
            "city": "Gothenburg",
            "coordinate": [11.969388, 57.707619],
            "openinghours": {
                "monday": "900-1700",
                "tuesday": "800-1700",
                "wednesday": "700-1600",
                "thursday": "900-1700",
                "friday": "900-1500"
            },
            "LunchTimes": {
                "monday": "1200-1300",
                "tuesday": "1200-1300",
                "wednesday": "1200-1300",
                "thursday": "1200-1300",
                "friday": "1200-1300",
            },
            "FikaTimes": {
                "monday": "1500-1530",
                "tuesday": "1500-1530",
                "wednesday": "1500-1530",
                "thursday": "1500-1530",
                "friday": "1500-1530",
            }
        },
        {
            "id": 2,
            "name": "Tooth Fairy Dentist",
            "owner": "Tooth Fairy",
            "dentists": 1,
            "address": "Slottskogen",
            "city": "Gothenburg",
            "coordinate": [11.942625, 57.685255],
            "openinghours": {
                "monday": "700-1900",
                "tuesday": "700-1900",
                "wednesday": "700-1900",
                "thursday": "700-1900",
                "friday": "700-1900"
            },
            "LunchTimes": {
                "monday": "1200-1300",
                "tuesday": "1200-1300",
                "wednesday": "1200-1300",
                "thursday": "1200-1300",
                "friday": "1200-1300",
            },
            "FikaTimes": {
                "monday": "1500-1530",
                "tuesday": "1500-1530",
                "wednesday": "1500-1530",
                "thursday": "1500-1530",
                "friday": "1500-1530",
            }
        },
        {
            "id": 3,
            "name": "The Crown",
            "owner": "Carmen Corona",
            "dentists": 2,
            "address": "Lindholmsallén 19",
            "city": "Gothenburg",
            "coordinate": [11.940386, 57.709872],
            "openinghours": {
                "monday": "600-1530",
                "tuesday": "800-1700",
                "wednesday": "700-1200",
                "thursday": "700-1700",
                "friday": "800-1600"
            },
            "LunchTimes": {
                "monday": "1200-1300",
                "tuesday": "1200-1300",
                "wednesday": "1200-1300",
                "thursday": "1200-1300",
                "friday": "1200-1300",
            },
            "FikaTimes": {
                "monday": "1500-1530",
                "tuesday": "1500-1530",
                "wednesday": "1500-1530",
                "thursday": "1500-1530",
                "friday": "1500-1530",
            }
        },
        {
            "id": 4,
            "name": "Lisebergs Dentists",
            "owner": "Glen Hysén",
            "dentists": 3,
            "address": "Liseberg",
            "city": "Gothenburg",
            "coordinate": [11.991153, 57.694723],
            "openinghours": {
                "monday": "1000-1800",
                "tuesday": "1000-1800",
                "wednesday": "1000-1800",
                "thursday": "1000-1800",
                "friday": "1000-1800"
            },
            "LunchTimes": {
                "monday": "1200-1300",
                "tuesday": "1200-1300",
                "wednesday": "1200-1300",
                "thursday": "1200-1300",
                "friday": "1200-1300",
            },
            "FikaTimes": {
                "monday": "1500-1530",
                "tuesday": "1500-1530",
                "wednesday": "1500-1530",
                "thursday": "1500-1530",
                "friday": "1500-1530",
            }
        }
    ]
}

var logic = {

    sendWholeJson() {
        return jsonObject;
    },
    extractRetreiveTopic(message) {
        var chosenDate;
        //console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate) // https://programmingwithswift.com/how-to-convert-byte-array-to-string-with-javascript/ EQUAL TO STRING
        var splitUpString = bytesString.split('/');
        var year = (splitUpString[0])
        var month = (splitUpString[1])
        var day = (splitUpString[2])
        var hour = (splitUpString[4])
        var minute = (splitUpString[5])
        return year + "-" + month + "-" + day + " " + hour + ":" + minute
    },

    // find the name of the day
    extractDay(message) {
        var chosenDate;
        //console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate) // https://programmingwithswift.com/how-to-convert-byte-array-to-string-with-javascript/ EQUAL TO STRING
        var splitUpString = bytesString.split('/');
        var day = (splitUpString[3])
            //console.log(bytesString)
        return day
    },
    extractTime(message) {
        var chosenDate;
        console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate)
        var splitUpString = bytesString.split('/');
        var hour = (splitUpString[4])
        var minute = (splitUpString[5])
        return hour + minute
    },
    extractDateForBooking(message) {
        var chosenDate;
        console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate)
        var splitUpString = bytesString.split('/');
        var year = (splitUpString[0])
        var month = (splitUpString[1])
        var day = (splitUpString[2])
        var dayName = (splitUpString[3])
        var hour = (splitUpString[4])
        var minute = (splitUpString[5])
        return year + month + day + dayName + hour + minute
    },
    extractUserId(message) {
        var parsed = JSON.parse(message)
        var userId = parsed.userId

        return userId
    },
    extractRequestId(message) {
        var parsed = JSON.parse(message)
        var requestId = parsed.requestId

        return requestId
    },
    hourMinute(message) {
        var chosenDate;
        console.log('We received from Visualizer client choice: ' + message);
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate)
        var splitUpString = bytesString.split('/');
        var hour = (splitUpString[4])
        var minute = (splitUpString[5])
        console.log(hour + ":" + minute)
        return hour + ":" + minute
    },
    extractDentistData(message, dateFilledOut) {
        var parsed = JSON.parse(message) // when client clicks book in the marker
            //console.log(parsed)
            //var id = parsed.dentistID
        var date = dateFilledOut
            //console.log(dateFilledOut)
            //var dateWithoutQuotes = date.replace(/"/g, ''); // remove the quotes 

        // the booking button will result in a payload that includes the dentist ID 

        return date
    },
    extractClientTime(message) {
        var parsed = JSON.parse(message) // when client clicks book in the marker

        var date = parsed.date
        return date;
    },
    extractDnetistCoordinates(message) {
        var parsed = JSON.parse(message) // when client clicks book in the marker
        console.log(parsed)
        var coordinates = parsed.clientCoordinates
        return coordinates;
    },

    entireCoordinates() {
        var allCoordinates = new Array();
        var countKey = Object.keys(jsonObject.dentists).length; // how many elements in the array
        for (var m = 0; m < countKey; m++) {
            allCoordinates[m] = jsonObject.dentists[m].coordinate // save all coordinates
        }
        return allCoordinates
    },

    validateTime(dayName, bookingTime) {
        var countKey = Object.keys(jsonObject.dentists).length; // how many elements in the array
        let mondays = new Array(); // create an empty array
        let tuesdays = new Array();
        let wednesdays = new Array();
        let thursdays = new Array();
        let fridays = new Array();

        mondaysLunchTimes = new Array();
        tuesdaysLunchTimes = new Array();
        wednesdaysLunchTimes = new Array();
        thursdaysLunchTimes = new Array();
        fridaysLunchTimes = new Array();

        mondaysFikaTimes = new Array();
        tuesdaysFikaTimes = new Array();
        wednesdaysFikaTimes = new Array();
        thursdaysFikaTimes = new Array();
        fridaysFikaTimes = new Array();

        var chance = 0;
        for (var m = 0; m < countKey; m++) {
            mondays[m] = jsonObject.dentists[m].openinghours.monday; // save opeining hours
            mondaysLunchTimes[m] = jsonObject.dentists[m].LunchTimes.monday; // save Lunch hours
            mondaysFikaTimes[m] = jsonObject.dentists[m].FikaTimes.monday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = mondays[m].split("-");
            var splitUpStringLunch = mondaysLunchTimes[m].split("-");
            var splitUpStringFika = mondaysFikaTimes[m].split("-");

            if (
                (parseInt(splitUpString[0]) < bookingTime &&
                    parseInt(splitUpString[1]) > bookingTime) &&
                (
                    ((parseInt(splitUpStringLunch[0]) > bookingTime || parseInt(splitUpStringLunch[1]) < bookingTime))
                ) &&

                (parseInt(splitUpStringFika[0]) > bookingTime || parseInt(splitUpStringFika[1]) < bookingTime)
            ) {
                console.log("its valid time in one of the mondays at least"); // this allows us to save the date and time in the next function array
                chance = 1;

                //return true
            } else {
                console.log("its not valid");
            }
        }

        for (var m = 0; m < countKey; m++) {
            tuesdays[m] = jsonObject.dentists[m].openinghours.tuesday; // save opeining hours
            tuesdaysLunchTimes[m] = jsonObject.dentists[m].LunchTimes.tuesday; // save Lunch hours
            tuesdaysFikaTimes[m] = jsonObject.dentists[m].FikaTimes.tuesday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = tuesdays[m].split("-");
            var splitUpStringLunch = tuesdaysLunchTimes[m].split("-");
            var splitUpStringFika = tuesdaysFikaTimes[m].split("-");
            console.log(splitUpStringLunch)
            if (
                (parseInt(splitUpString[0]) < bookingTime &&
                    parseInt(splitUpString[1]) > bookingTime) &&
                (parseInt(splitUpStringLunch[0]) >= bookingTime &&
                    parseInt(splitUpStringLunch[1]) <= bookingTime) &&
                (parseInt(splitUpStringFika[0]) >= bookingTime &&
                    parseInt(splitUpStringFika[1]) <= bookingTime)
            ) {
                console.log("its valid time in one of the tuesdays at least"); // this allows us to save the date and time in the next function array
                chance = 1;

                //return true
            } else {
                console.log("its not valid");
            }
        }
        for (var m = 0; m < countKey; m++) {
            wednesdays[m] = jsonObject.dentists[m].openinghours.wednesday; // save opeining hours
            wednesdaysLunchTimes[m] = jsonObject.dentists[m].LunchTimes.wednesday; // save Lunch hours
            wednesdaysFikaTimes[m] = jsonObject.dentists[m].FikaTimes.wednesday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = wednesdays[m].split("-");
            var splitUpStringLunch = wednesdaysLunchTimes[m].split("-");
            var splitUpStringFika = wednesdaysFikaTimes[m].split("-");
            console.log(splitUpStringLunch)

            if (
                (parseInt(splitUpString[0]) < bookingTime &&
                    parseInt(splitUpString[1]) > bookingTime) &&
                (
                    ((parseInt(splitUpStringLunch[0]) > bookingTime || parseInt(splitUpStringLunch[1]) < bookingTime))
                ) &&

                (parseInt(splitUpStringFika[0]) > bookingTime || parseInt(splitUpStringFika[1]) < bookingTime)
            ) {
                console.log("its valid time in one of the mondays at least"); // this allows us to save the date and time in the next function array
                chance = 1;

                //return true
            } else {
                console.log("its not valid");
            }
        }
        for (var m = 0; m < countKey; m++) {
            thursdays[m] = jsonObject.dentists[m].openinghours.thursday; // save opeining hours
            thursdaysLunchTimes[m] = jsonObject.dentists[m].LunchTimes.thursday; // save Lunch hours
            thursdaysFikaTimes[m] = jsonObject.dentists[m].FikaTimes.thursday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = thursdays[m].split("-");
            var splitUpStringLunch = thursdaysLunchTimes[m].split("-");
            var splitUpStringFika = thursdaysFikaTimes[m].split("-");
            console.log(splitUpStringLunch)

            if (
                (parseInt(splitUpString[0]) < bookingTime &&
                    parseInt(splitUpString[1]) > bookingTime) &&
                (
                    ((parseInt(splitUpStringLunch[0]) > bookingTime || parseInt(splitUpStringLunch[1]) < bookingTime))
                ) &&

                (parseInt(splitUpStringFika[0]) > bookingTime || parseInt(splitUpStringFika[1]) < bookingTime)
            ) {
                console.log("its valid time in one of the mondays at least"); // this allows us to save the date and time in the next function array
                chance = 1;

                //return true
            } else {
                console.log("its not valid");
            }
        }
        for (var m = 0; m < countKey; m++) {
            fridays[m] = jsonObject.dentists[m].openinghours.friday; // save opeining hours
            fridaysLunchTimes[m] = jsonObject.dentists[m].LunchTimes.friday; // save Lunch hours
            fridaysFikaTimes[m] = jsonObject.dentists[m].FikaTimes.friday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = fridays[m].split("-");
            var splitUpStringLunch = fridaysLunchTimes[m].split("-");
            var splitUpStringFika = fridaysFikaTimes[m].split("-");
            console.log(splitUpStringLunch)

            if (
                (parseInt(splitUpString[0]) < bookingTime &&
                    parseInt(splitUpString[1]) > bookingTime) &&
                (
                    ((parseInt(splitUpStringLunch[0]) > bookingTime || parseInt(splitUpStringLunch[1]) < bookingTime))
                ) &&

                (parseInt(splitUpStringFika[0]) > bookingTime || parseInt(splitUpStringFika[1]) < bookingTime)
            ) {
                console.log("its valid time in one of the mondays at least"); // this allows us to save the date and time in the next function array
                chance = 1;

                //return true
            } else {
                console.log("its not valid");
            }
        }
        if (dayName == "Monday") {
            // get the day from the extract data, or from data handler
            console.log(mondays); // if monday is chosen by client we need to look at the items opening and closing hours for all mondays
        } else if (dayName == "Tuesday") {
            console.log(tuesdays);
        } else if (dayName == "Wednesday") {
            console.log(wednesdays);
        } else if (dayName == "Thursday") {
            console.log(thursdays);
        } else if (dayName == "Friday") {
            console.log(fridays);
        }
        //console.log(parsedRegistry) // the whole array as JSON object
        if (chance > 0) {
            return true;
        } else {
            return false;
        }
    },
    storeChosenOnes(data) {
        return data;
    }
}


module.exports = logic;