// tests get

var nodiverse = require('../');

(function testValidateCoords() {
    var myverse = nodiverse();            // my universe object creation
    if (myverse.get([0,0,0]) !== null) 
        throw new Error("getting something that isn't there");
    myverse.create([0,0,0],0);
    if (myverse.get([0,0,0]) === null) 
        throw new Error("not getting something that is there");
})();
