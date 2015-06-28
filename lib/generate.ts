/// <reference path="../definitions/atom/atom.d.ts"/> // Get Atom definitions.

/**
* Generates text for a bluescreen.
* parameter: 	pack	(string) the package the error occured in.
* parameter: 	isException (boolean)	whether the error was an uncaught exception.
* parameter: 	extraInfo (string)	a stack trace for uncaught exceptions, otherwise any other extra information.
* returns:	the generated text.
*/
export = function generateBluescreenText(pack: string, isException: boolean, extraInfo?: string): string {
  var message = "A PROBLEM WAS DETECTED AND SOME OPERATIONS WERE CANCELED TO PREVENT DAMAGE TO YOUR DATA. ";
  message += "IT MAY BE POSSIBLE TO CONTINUE NORMALLY.\n\n";

  message += "TECHNICAL INFORMATION:\n\n";

  if (isException) {
    message += "UNCAUGHT EXCEPTION IN '";
  } else {
    message += "FATAL ERROR DURING AN OPERATION IN '";
  }

  message += pack;
  message += "'.\n\n";

  if (isException) {
    message += "STACK TRACE:\n\n";
    if (extraInfo != null && typeof(extraInfo) != "undefined") {
      message += extraInfo;
    } else {
      message += "NONE";
    }
  } else if (extraInfo != null && typeof(extraInfo) != "undefined") {
    message += "EXTRA INFORMATION:\n\n";
    message += extraInfo;
  }

  return message;
}
