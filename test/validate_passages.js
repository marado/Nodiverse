// tests the validate_passages method

var nodiverse = require('../');

(function testValidatePassages() {
    var myverse = nodiverse();            // my universe object creation
    if (!(!myverse.validate_passages("a") &&
        myverse.validate_passages() &&
        myverse.validate_passages(null) &&
        myverse.validate_passages(undefined) &&
        !myverse.validate_passages([]) &&
        myverse.validate_passages(0) &&
        myverse.validate_passages(myverse.N) &&
        myverse.validate_passages(myverse.N + myverse.SW) &&
        myverse.validate_passages(
            myverse.NW +
            myverse.N  +
            myverse.NE +
            myverse.W  +
            myverse.E  +
            myverse.SW +
            myverse.S  +
            myverse.SE +
            myverse.U  +
            myverse.UNW+
            myverse.UN +
            myverse.UNE+
            myverse.UW +
            myverse.UE +
            myverse.USW+
            myverse.US +
            myverse.USE+
            myverse.D  +
            myverse.DNW+
            myverse.DN +
            myverse.DNE+
            myverse.DW +
            myverse.DE +
            myverse.DSW+
            myverse.DS +
            myverse.DSE 
        ) &&
        !myverse.validate_passages(
            myverse.NW +
            myverse.N  +
            myverse.NE +
            myverse.W  +
            myverse.E  +
            myverse.SW +
            myverse.S  +
            myverse.SE +
            myverse.U  +
            myverse.UNW+
            myverse.UN +
            myverse.UNE+
            myverse.UW +
            myverse.UE +
            myverse.USW+
            myverse.US +
            myverse.USE+
            myverse.D  +
            myverse.DNW+
            myverse.DN +
            myverse.DNE+
            myverse.DW +
            myverse.DE +
            myverse.DSW+
            myverse.DS +
            myverse.DSE+
            1
        )
    )) throw new Error("validate_passages is accepting values it shouldn't!");
})();
