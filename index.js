var NW =   1,
    N  =   2,
    NE =   4,
    W  =   8,
    E  =  16,
    SW =  32,
    S  =  64,
    SE = 128;

function nodiverse() {
    this.places   = [];
}

/* create a place, insert it on Nodiverse */
nodiverse.prototype.create = function(coords, passages) {
    // TODO 
    return false;
}

/* get a place */
nodiverse.prototype.get = function(coords) {
    // TODO
    return false;
}

/* update a place */
nodiverse.prototype.update = function(place) {
    // TODO
    return false;
}

/* destroy a place */
nodiverse.prototype.nuke = function(coords) {
    // TODO
    return false;
}

/* print an ASCII map */
nodiverse.prototype.asciimap = function() {
    // TODO
    return "";
}

module.exports = function() {
    return new nodiverse();
}
