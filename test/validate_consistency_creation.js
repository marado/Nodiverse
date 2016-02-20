// tests the universe consistence on object creation

var nodiverse = require('../');

(function testValidateConsistencyCreation() {
    var myverse = nodiverse();            // my universe object creation

    if (!myverse.create([0,0,0],null)) // no passages
        throw new Error("failed creating a place!");

    // validate that it has no passages
    var isolatedPlace = myverse.get([0,0,0]);
    if (isolatedPlace.passages !== null) throw new Error("the resulting universe isn't consistent (on creation on new places)! [isolated]");

    if (!myverse.create([5,5,5],myverse.E)) // passage to east
        throw new Error("failed creating a place!");

    // validate that the passage is there (to nowhere)
    var crowdedPlace = myverse.get([5,5,5]);
    if (crowdedPlace.passages !== myverse.E) throw new Error("the resulting universe isn't consistent (on creation on new places)! [crowded]");

    if (!myverse.create([4,5,5],myverse.E)) // place west of crowdedPlace
        throw new Error("failed creating a place!");

    // validate neighbourPlace's passage
    var neighbourPlace = myverse.get([4,5,5]);
    if (neighbourPlace.passages !== myverse.E) throw new Error("the resulting universe isn't consistent (on creation on new places)! [neighbour]");
    // validate crowdedPlace's passage
    crowdedPlace = myverse.get([5,5,5]);
    if (crowdedPlace.passages !== (myverse.W + myverse.E)) throw new Error("the resulting universe isn't consistent (on creation on new places)! [updated-crowded]");

})();
