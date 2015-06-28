/// <reference path="../definitions/atom/atom.d.ts"/> // Get Atom definitions.
module.exports = function generateBluescreenText(pack, isException, extraInfo) {
    var message = "A PROBLEM WAS DETECTED AND SOME OPERATIONS WERE CANCELED TO PREVENT DAMAGE TO YOUR DATA. ";
    message += "IT MAY BE POSSIBLE TO CONTINUE NORMALLY.\n\n";
    message += "TECHNICAL INFORMATION:\n\n";
    if (isException) {
        message += "UNCAUGHT EXCEPTION IN '";
    }
    else {
        message += "FATAL ERROR DURING AN OPERATION IN '";
    }
    message += pack;
    message += "'.\n\n";
    if (isException) {
        message += "STACK TRACE:\n\n";
        if (extraInfo != null && typeof (extraInfo) != "undefined") {
            message += extraInfo;
        }
        else {
            message += "NONE";
        }
    }
    else if (extraInfo != null && typeof (extraInfo) != "undefined") {
        message += "EXTRA INFORMATION:\n\n";
        message += extraInfo;
    }
    return message;
};
