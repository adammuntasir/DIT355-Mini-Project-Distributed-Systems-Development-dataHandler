let jsonObject = {
    "dentists": [{
            "id": 1,
            "name": "Your Dentist",
            "owner": "Dan Tist",
            "dentists": 3,
            "address": "Spannmålsgatan 20",
            "city": "Gothenburg",
            "coordinate": "[11.969388,57.707619]",
            "openinghours": {
                "monday": "900-1700",
                "tuesday": "800-1700",
                "wednesday": "700-1600",
                "thursday": "900-1700",
                "friday": "900-1500"
            },
        },
        {
            "id": 2,
            "name": "Tooth Fairy Dentist",
            "owner": "Tooth Fairy",
            "dentists": 1,
            "address": "Slottskogen",
            "city": "Gothenburg",
            "coordinate": "[11.942625,57.685255]",
            "openinghours": {
                "monday": "700-1900",
                "tuesday": "700-1900",
                "wednesday": "700-1900",
                "thursday": "700-1900",
                "friday": "700-1900"
            },
        },
        {
            "id": 3,
            "name": "The Crown",
            "owner": "Carmen Corona",
            "dentists": 2,
            "address": "Lindholmsallén 19",
            "city": "Gothenburg",
            "coordinate": "[11.940386,57.709872]",
            "openinghours": {
                "monday": "600-1530",
                "tuesday": "800-1700",
                "wednesday": "700-1200",
                "thursday": "700-1700",
                "friday": "800-1600"
            },
        },
        {
            "id": 4,
            "name": "Lisebergs Dentists",
            "owner": "Glen Hysén",
            "dentists": 3,
            "address": "Liseberg",
            "city": "Gothenburg",
            "coordinate": "[11.991153,57.694723]",
            "openinghours": {
                "monday": "1000-1800",
                "tuesday": "1000-1800",
                "wednesday": "1000-1800",
                "thursday": "1000-1800",
                "friday": "1000-1800"
            },
        }
    ]
}

var Locations = {
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
    extractDentistData(message) {
        var parsed = JSON.parse(message) // when client clicks book in the marker
            //console.log(parsed)
        var id = parsed.dentistID
        var date = parsed.clientTime
            // the booking button will result in a payload that includes the dentist ID 
            //console.log(id + date)
        return id + date
    },

    extractDnetistCoordinates(message) {
        var parsed = JSON.parse(message) // when client clicks book in the marker
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
        var chance = 0
        for (var m = 0; m < countKey; m++) {
            mondays[m] = jsonObject.dentists[m].openinghours.monday // save opeining hours
                //console.log(mondays)
            var splitUpString = mondays[m].split('-');
            console.log(bookingTime)
            console.log(splitUpString[0])
            if ((parseInt(splitUpString[0]) < bookingTime) && (parseInt(splitUpString[1]) > bookingTime)) {
                console.log("its valid time in one of the mondays at least") // this allows us to save the date and time in the next function array 
                chance = 1

                //return true
            } else {
                console.log("its not valid")
            }

        }
        for (var m = 0; m < countKey; m++) {
            tuesdays[m] = jsonObject.dentists[m].openinghours.tuesday // save opeining hours
                //console.log(tuesday)
            var splitUpString = tuesdays[m].split('-');
            console.log(bookingTime)
            console.log(splitUpString[0])
            if ((parseInt(splitUpString[0]) < bookingTime) && (parseInt(splitUpString[1]) > bookingTime)) {
                console.log("its valid time in one of the tuesdays at least") // this allows us to save the date and time in the next function array 
                chance = 1
                
              //return true
            } else {
                console.log("its not valid")
            }
        }
        for (var m = 0; m < countKey; m++) {
            wednesdays[m] = jsonObject.dentists[m].openinghours.wednesday // save opeining hours
        }
        for (var m = 0; m < countKey; m++) {
            thursdays[m] = jsonObject.dentists[m].openinghours.thursday // save opeining hours
        }
        for (var m = 0; m < countKey; m++) {
            fridays[m] = jsonObject.dentists[m].openinghours.friday // save opeining hours
        }
        if (dayName == "Monday") { // get the day from the extract data, or from data handler
            console.log(mondays) // if monday is chosen by client we need to look at the items opening and closing hours for all mondays 

        } else if (dayName == "Tuesday") {
            console.log(tuesdays)
        } else if (dayName == "Wednesday") {
            console.log(wednesdays)
        } else if (dayName == "Thursday") {
            console.log(thursdays)
        } else if (dayName == "Friday") {
            console.log(fridays)
        }
        //console.log(parsedRegistry) // the whole array as JSON object
        if (chance > 0) {
            return true

        } else {
            return false
        }
    },
    
    storeChosenOnes(data) {
        var checkThis = data
        return data
    },
    sendJsonToVisualizer() {}
}


module.exports = Locations