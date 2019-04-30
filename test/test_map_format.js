// tests map format
// more info: https://github.com/marado/Nodiverse/issues/13

var nodiverse = require('../');

(function testMapFunction() {
    var myverse = nodiverse();            // my universe object creation

    // draw the map
    myverse.create([0 , 0,0],null);
    myverse.create([-1, 0,0], myverse.E);
    myverse.create([1,  0,0], myverse.W);
    myverse.create([0,  1,0], myverse.S);
    myverse.create([0, -1,0], myverse.N);
    myverse.create([-1,-1,0], myverse.NE);
    myverse.create([1, -1,0], myverse.NW);
    myverse.create([-1, 1,0], myverse.SE);
    myverse.create([1,  1,0], myverse.SW);

    // print the map, no 'center' argument
    console.log(myverse.asciimap());
    // print the same map, but with colors
    console.log(myverse.asciimap(null,true)); // null center, true color

    if ((typeof myverse.asciimap()) !== 'string')
		throw new Error("Can't properly generate an asciimap!");
})();
