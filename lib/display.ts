/// <reference path="../definitions/atom/atom.d.ts"/> // Get Atom definitions.

import generateBluescreenText = require("./generate");
var $ = require("./jquery.min");

function displayTextAsBluescreen(text: string): void {
  var panel;
  var encodedElement = $("<div><pre style='background-color:blue; color:white;''>" + text + "</pre><button>CONTINUE</button></div>");
  encodedElement.find("button").on("click", function() {
    panel.destroy();
  });
  panel = atom.workspace.addTopPanel({
    item: encodedElement
  });
  return;
}

/**
* Displays a bluescreen.
* parameter: 	package	(string) the package the error occured in.
* parameter: 	isException (boolean)	whether the error was an uncaught exception.
* parameter: 	extraInfo (string)	a stack trace for uncaught exceptions, otherwise any other extra information.
* returns:	nothing.
*/
export = function displayBluescreen(pack: string, isException: boolean, extraInfo?: string): void {
  displayTextAsBluescreen(generateBluescreenText(pack, isException, extraInfo));
  return;
}
