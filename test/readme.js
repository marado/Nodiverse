// tests the methods described at README

var nodiverse = require('../');

(function testREADME() {
    var myverse = nodiverse();            // my universe object creation
    // let's create a place... 
    // let's say, a room in the center of the universe, with a passage towards north and another towards southeast
    if (!myverse.create([0,0,0], myverse.N + myverse.SE))
        throw Error("cannot create a place");

    // let's get a local copy of that place, maybe to change it
    var myplace = myverse.get([0,0,0]);

    if (myplace === null) throw Error("place wasn't properly created, or retrieved");

    myplace.name = "clearing";
    myplace.description = "This is a clearing.";
    // let's update the universe with this place's changes
    myverse.update(myplace);
    // we can, of course, also destroy a place
    myverse.nuke([0,0,0]);
    // and if we want to update the universe properties themselves:
    myverse.geometry="plane";
    myverse.entrypoint=[0,0,0];
    // finally, it might be useful to be able to see a visual representation of the universe
    console.log(myverse.asciimap());
})();
