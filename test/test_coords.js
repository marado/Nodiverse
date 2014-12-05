// tests coords

var nodiverse = require('../');

(function testValidateCoords() {
    var myverse = nodiverse();            // my universe object creation
    if (myverse.NW  !== Math.pow(2, 0) ||
        myverse.N   !== Math.pow(2, 1) ||
        myverse.NE  !== Math.pow(2, 2) ||
        myverse.W   !== Math.pow(2, 3) ||
        myverse.E   !== Math.pow(2, 4) ||
        myverse.SW  !== Math.pow(2, 5) ||
        myverse.S   !== Math.pow(2, 6) ||
        myverse.SE  !== Math.pow(2, 7) ||
        myverse.U   !== Math.pow(2, 8) || 
        myverse.UNW !== Math.pow(2, 9) || 
        myverse.UN  !== Math.pow(2,10) || 
        myverse.UNE !== Math.pow(2,11) || 
        myverse.UW  !== Math.pow(2,12) || 
        myverse.UE  !== Math.pow(2,13) || 
        myverse.USW !== Math.pow(2,14) || 
        myverse.US  !== Math.pow(2,15) || 
        myverse.USE !== Math.pow(2,16) || 
        myverse.D   !== Math.pow(2,17) || 
        myverse.DNW !== Math.pow(2,18) || 
        myverse.DN  !== Math.pow(2,19) || 
        myverse.DNE !== Math.pow(2,20) || 
        myverse.DW  !== Math.pow(2,21) || 
        myverse.DE  !== Math.pow(2,22) || 
        myverse.DSW !== Math.pow(2,23) || 
        myverse.DS  !== Math.pow(2,24) || 
        myverse.DSE !== Math.pow(2,25) 
    ) throw new Error("can't read coords values properly!");
})();
