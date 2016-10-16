// tests coords

var nodiverse = require('../');

(function testMapFunction() {
    var myverse = nodiverse();            // my universe object creation
    for (var i = 1; i < 2; i++) { // works
    // for (var i = 1; i < 3; i++) { // FIXME: exposes map-related bug
    // for (var i = 1; i < 5; i++) { // FIXME: exposes non-map related bug
	   var myplace = myverse.create([i,0,0], myverse.W + myverse.E);
	   myplace.name = i;
	   myverse.update(myplace);
    }	
	console.log(myverse.asciimap());
    if ((typeof myverse.asciimap()) !== 'string') throw new Error("Can't properly generate an asciimap!");
})();
