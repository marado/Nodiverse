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
	console.log(myverse.asciimap());
    if ((typeof myverse.asciimap()) !== 'string')
		throw new Error("Can't properly generate an asciimap!");
})();
