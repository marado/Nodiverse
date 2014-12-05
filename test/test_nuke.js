// tests get

var nodiverse = require('../');

(function testValidateCoords() {
    var myverse = nodiverse();            // my universe object creation
    myverse.create([0,0,0],0);
    if (myverse.nuke([0,0,0]) && (myverse.get([0,0,0]) !== null))
        throw new Error("Seems that nuking didn't nuke!");
})();
