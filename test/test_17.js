// tests bug 17
// more info: https://github.com/marado/Nodiverse/issues/17

var nodiverse = require('../');

(function testMapFunction() {
    var myverse = nodiverse();            // my universe object creation

    // draw the map
    myverse.create([0 , 0,0],null);
    myverse.create([1,  0,0], myverse.W);
    //myverse.create([0,  1,0], myverse.S);
    myverse.create([0, -1,0], myverse.N);
    myverse.create([1, -1,0], myverse.NW + myverse.N);
    myverse.create([1,  1,0], myverse.SW + myverse.S);

    // print the map, no 'center' argument
    console.log(myverse.asciimap());

    if ((typeof myverse.asciimap()) !== 'string')
		throw new Error("Can't properly generate an asciimap!");
})();
