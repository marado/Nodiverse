// tests the validate_coords method

// What's expected:
// >  validate_coords("a")
// false
// >  validate_coords()
// false
// >  validate_coords(null)
// false
// >  validate_coords(undefined)
// false
// >  validate_coords([])
// false
// >  validate_coords([1,2,3,4])
// false
// >  validate_coords([1,2,3,"4"])
// false
// >  validate_coords([1,2,"3"])
// false
// >  validate_coords([1,2.1,3])
// false
// >  validate_coords([1,2,3])
// true

var nodiverse = require('../');

(function testValidateCoords() {
    var myverse = nodiverse();            // my universe object creation
    if (!(!myverse.validate_coords("a") &&
        !myverse.validate_coords() &&
        !myverse.validate_coords(null) &&
        !myverse.validate_coords(undefined) &&
        !myverse.validate_coords([]) &&
        !myverse.validate_coords([1,2,3,4]) &&
        !myverse.validate_coords([1,2,3,"4"]) &&
        !myverse.validate_coords([1,2,"3"]) &&
        !myverse.validate_coords([1,2.1,3]) &&
        myverse.validate_coords([1,2,3])
    )) throw new Error("validate_coords is accepting values it shouldn't!");
})();
