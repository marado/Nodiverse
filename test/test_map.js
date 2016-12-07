// tests coords

var nodiverse = require('../');

(function testMapFunction() {
    var myverse = nodiverse();            // my universe object creation
    for (var i = 0; i < 3; i++) {
	   if (!myverse.create([i,0,0], myverse.W + myverse.E)) {
		   throw new Error("failed to create place");
	   }
	   var myplace = myverse.get([i,0,0]);
	   myplace.name = i.toString();
	   if (!myverse.update(myplace)) { throw new Error("place update failed!"); }
    }	
	// print the map, no 'center' argument
	console.log(myverse.asciimap());
	// print the map, one tile to the side
	console.log(myverse.asciimap([1,0,0]));
	// print the map, center on an empty tile
	console.log(myverse.asciimap([2,2,0]));
    if ((typeof myverse.asciimap()) !== 'string')
		throw new Error("Can't properly generate an asciimap!");
})();
