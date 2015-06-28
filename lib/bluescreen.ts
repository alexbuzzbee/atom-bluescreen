/// <reference path="../definitions/atom/atom.d.ts"/> // Get Atom definitions.

import displayBluescreen = require("./display");

var debug = true;

/**
* Handles adding of a Notification object and displays a bluescreen if necessery.
* parameter:	notification (AtomCore.Notification) the newly added notification object.
* returns:	nothing.
*/
export function onNotificationCreated(notification: any): void {
  if (notification.getType() !== "fatal") { // Since this will be called for *all* notifications, we need to make sure this is a Fatal Error before bluescreening.
    return;
  }

  var message = notification.getMessage();

  var isException = false; // Whether this is an exception.
  if (message.match(/Uncaught.*/) !== null) { // Special exception parsing.
    isException = true;
    if (debug) { // Debug logging.
      console.log("Raw uncaught error message: " + message);
      console.log("Raw uncaught error detail: " + notification.getDetail());
      console.log("Raw uncaught error notification JSON: " + JSON.stringify(notification));
    }
  }
  if (isException) { // Stack traces (for uncaught exceptions)!
    displayBluescreen("unknown package", isException, notification.getOptions().stack);
  } else {
    displayBluescreen("unknown package", isException, message);
  }
  notification.onDidDisplay(function(not: any) { // Kill the notification box as soon as it shows up.
    not.dismiss();
  });
}

/**
* Tests the bluescreen system by throwing an exception.
* parameter:	message (string)	the error message to throw.
* throws:	always a new Error(message). Don't catch if you want it to work.
*/
export function testUncaught(message: string): void {
  throw new Error(message);
}

/**
* Tests the bluescreen system by sending a Fatal notification.
* parameter:	message (string)	the error message to use.
*/
export function testOther(message: string): void {
	atom.notifications.addFatalError(message);
}

export function activate() {
  atom.notifications.onDidAddNotification(onNotificationCreated); // TS complains, but this works fine.
  atom.commands.add("atom-workspace", "bluescreen:test-uncaught", function() {
    testUncaught("Exception bluescreen test; don't panic!");
  });
  atom.commands.add("atom-workspace", "bluescreen:test-other", function() {
		testOther("Non-exception bluescreen test; don't panic!");
  })
}
