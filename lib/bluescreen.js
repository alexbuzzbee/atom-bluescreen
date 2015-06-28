/// <reference path="../definitions/atom/atom.d.ts"/> // Get Atom definitions.
var displayBluescreen = require("./display");
var debug = true;
function onNotificationCreated(notification) {
    if (notification.getType() !== "fatal") {
        return;
    }
    var message = notification.getMessage();
    var isException = false;
    if (message.match(/Uncaught.*/) !== null) {
        isException = true;
        if (debug) {
            console.log("Raw uncaught error message: " + message);
            console.log("Raw uncaught error detail: " + notification.getDetail());
            console.log("Raw uncaught error notification JSON: " + JSON.stringify(notification));
        }
    }
    if (isException) {
        displayBluescreen("unknown package", isException, notification.getOptions().stack);
    }
    else {
        displayBluescreen("unknown package", isException, message);
    }
    notification.onDidDisplay(function (not) {
        not.dismiss();
    });
}
exports.onNotificationCreated = onNotificationCreated;
function testUncaught(message) {
    throw new Error(message);
}
exports.testUncaught = testUncaught;
function testOther(message) {
    atom.notifications.addFatalError(message);
}
exports.testOther = testOther;
function activate() {
    atom.notifications.onDidAddNotification(onNotificationCreated);
    atom.commands.add("atom-workspace", "bluescreen:test-uncaught", function () {
        testUncaught("Exception bluescreen test; don't panic!");
    });
    atom.commands.add("atom-workspace", "bluescreen:test-other", function () {
        testOther("Non-exception bluescreen test; don't panic!");
    });
}
exports.activate = activate;
