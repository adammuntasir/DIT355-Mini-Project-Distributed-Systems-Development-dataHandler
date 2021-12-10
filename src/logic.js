var registry = require('../../registry')


var logic = {
    sendWholeJson() {
        return registry.jsonObject;
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
    extractWeekends(message) {
        var chosenDate;
        chosenDate = message

        var bytesString = String.fromCharCode(...chosenDate)
        var splitUpString = bytesString.split('/');
        var nameOfWeek = (splitUpString[3])
        return nameOfWeek
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
    validateTime(dayName, bookingTime) {
        var countKey = Object.keys(registry.jsonObject.dentists).length; // how many elements in the array
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
            mondays[m] = registry.jsonObject.dentists[m].openinghours.monday; // save opeining hours
            mondaysLunchTimes[m] = registry.jsonObject.dentists[m].LunchTimes.monday; // save Lunch hours
            mondaysFikaTimes[m] = registry.jsonObject.dentists[m].FikaTimes.monday; // save Lunch hours

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
            wednesdays[m] = registry.jsonObject.dentists[m].openinghours.wednesday; // save opeining hours
            wednesdaysLunchTimes[m] = registry.jsonObject.dentists[m].LunchTimes.wednesday; // save Lunch hours
            wednesdaysFikaTimes[m] = registry.jsonObject.dentists[m].FikaTimes.wednesday; // save Lunch hours

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
            thursdays[m] = registry.jsonObject.dentists[m].openinghours.thursday; // save opeining hours
            thursdaysLunchTimes[m] = registry.jsonObject.dentists[m].LunchTimes.thursday; // save Lunch hours
            thursdaysFikaTimes[m] = registry.jsonObject.dentists[m].FikaTimes.thursday; // save Lunch hours

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
            fridays[m] = registry.jsonObject.dentists[m].openinghours.friday; // save opeining hours
            fridaysLunchTimes[m] = registry.jsonObject.dentists[m].LunchTimes.friday; // save Lunch hours
            fridaysFikaTimes[m] = registry.jsonObject.dentists[m].FikaTimes.friday; // save Lunch hours

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
    }
}


module.exports = logic;