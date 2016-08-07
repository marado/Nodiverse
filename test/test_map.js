// tests coords

var nodiverse = require('../');

(function testMapFunction() {
    var myverse = nodiverse();            // my universe object creation
    if ((typeof myverse.asciimap()) !== 'string') throw new Error("Can't properly generate an asciimap!");
})();
