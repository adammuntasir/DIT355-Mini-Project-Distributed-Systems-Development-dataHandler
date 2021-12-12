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
    validateMonday(bookingTime) {

        var countKey = Object.keys(registry.jsonObject.dentists).length; // how many elements in the array
        let mondays = new Array(); // create an empty array
        mondaysLunchTimes = new Array();
        mondaysFikaTimes = new Array();
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
                (parseInt(splitUpString[0]) <= bookingTime &&
                    parseInt(splitUpString[1]) >= bookingTime) &&
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
        if (chance > 0) {
            return true;
        } else {
            return false;
        }
    },
    validateTuesday(bookingTime) {

        var countKey = Object.keys(registry.jsonObject.dentists).length; // how many elements in the array
        let tuesdays = new Array(); // create an empty array
        tuesdaysLunchTimes = new Array();
        tuesdaysFikaTimes = new Array();
        var chance = 0;

        for (var m = 0; m < countKey; m++) {
            tuesdays[m] = registry.jsonObject.dentists[m].openinghours.tuesday; // save opeining hours
            tuesdaysLunchTimes[m] = registry.jsonObject.dentists[m].LunchTimes.tuesday; // save Lunch hours
            tuesdaysFikaTimes[m] = registry.jsonObject.dentists[m].FikaTimes.tuesday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = tuesdays[m].split("-");
            var splitUpStringLunch = tuesdaysLunchTimes[m].split("-");
            var splitUpStringFika = tuesdaysFikaTimes[m].split("-");

            if (
                (parseInt(splitUpString[0]) <= bookingTime &&
                    parseInt(splitUpString[1]) >= bookingTime) &&
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
        if (chance > 0) {
            return true;
        } else {
            return false;
        }
    },
    validateWednesday(bookingTime) {
        var countKey = Object.keys(registry.jsonObject.dentists).length; // how many elements in the array
        let wednesdays = new Array(); // create an empty array
        wednesdaysLunchTimes = new Array();
        wednesdaysFikaTimes = new Array();
        var chance = 0;

        for (var m = 0; m < countKey; m++) {
            wednesdays[m] = registry.jsonObject.dentists[m].openinghours.wednesday; // save opeining hours
            wednesdaysLunchTimes[m] = registry.jsonObject.dentists[m].LunchTimes.wednesday; // save Lunch hours
            wednesdaysFikaTimes[m] = registry.jsonObject.dentists[m].FikaTimes.wednesday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = wednesdays[m].split("-");
            var splitUpStringLunch = wednesdaysLunchTimes[m].split("-");
            var splitUpStringFika = wednesdaysFikaTimes[m].split("-");

            if (
                (parseInt(splitUpString[0]) <= bookingTime &&
                    parseInt(splitUpString[1]) >= bookingTime) &&
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
        if (chance > 0) {
            return true;
        } else {
            return false;
        }
    },
    validateThursday(bookingTime) {
        var countKey = Object.keys(registry.jsonObject.dentists).length; // how many elements in the array
        let thursdays = new Array(); // create an empty array
        thursdaysLunchTimes = new Array();
        thursdaysFikaTimes = new Array();
        var chance = 0;

        for (var m = 0; m < countKey; m++) {
            thursdays[m] = registry.jsonObject.dentists[m].openinghours.thursday; // save opeining hours
            thursdaysLunchTimes[m] = registry.jsonObject.dentists[m].LunchTimes.thursday; // save Lunch hours
            thursdaysFikaTimes[m] = registry.jsonObject.dentists[m].FikaTimes.thursday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = thursdays[m].split("-");
            var splitUpStringLunch = thursdaysLunchTimes[m].split("-");
            var splitUpStringFika = thursdaysFikaTimes[m].split("-");

            if (
                (parseInt(splitUpString[0]) <= bookingTime &&
                    parseInt(splitUpString[1]) >= bookingTime) &&
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
        if (chance > 0) {
            return true;
        } else {
            return false;
        }
    },
    validateFriday(bookingTime) {
        var countKey = Object.keys(registry.jsonObject.dentists).length; // how many elements in the array
        let fridays = new Array(); // create an empty array
        fridaysLunchTimes = new Array();
        fridaysFikaTimes = new Array();
        var chance = 0;

        for (var m = 0; m < countKey; m++) {
            fridays[m] = registry.jsonObject.dentists[m].openinghours.friday; // save opeining hours
            fridaysLunchTimes[m] = registry.jsonObject.dentists[m].LunchTimes.friday; // save Lunch hours
            fridaysFikaTimes[m] = registry.jsonObject.dentists[m].FikaTimes.friday; // save Lunch hours

            //console.log(mondays)
            var splitUpString = fridays[m].split("-");
            var splitUpStringLunch = fridaysLunchTimes[m].split("-");
            var splitUpStringFika = fridaysFikaTimes[m].split("-");

            if (
                (parseInt(splitUpString[0]) <= bookingTime &&
                    parseInt(splitUpString[1]) >= bookingTime) &&
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
        if (chance > 0) {
            return true;
        } else {
            return false;
        }
    },

}


module.exports = logic;