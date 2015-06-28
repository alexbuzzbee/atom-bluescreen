/// <reference path="../definitions/atom/atom.d.ts"/> // Get Atom definitions.
var generateBluescreenText = require("./generate");
var $ = require("./jquery.min");
function displayTextAsBluescreen(text) {
    var panel;
    var encodedElement = $("<div><pre style='background-color:blue; color:white;''>" + text + "</pre><button>CONTINUE</button></div>");
    encodedElement.find("button").on("click", function () {
        panel.destroy();
    });
    panel = atom.workspace.addTopPanel({
        item: encodedElement
    });
    return;
}
module.exports = function displayBluescreen(pack, isException, extraInfo) {
    displayTextAsBluescreen(generateBluescreenText(pack, isException, extraInfo));
    return;
};
