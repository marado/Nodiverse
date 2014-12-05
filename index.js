function nodiverse() {
    this.places = [];
    this.NW     = Math.pow(2, 0);
    this.N      = Math.pow(2, 1);
    this.NE     = Math.pow(2, 2);
    this.W      = Math.pow(2, 3);
    this.E      = Math.pow(2, 4);
    this.SW     = Math.pow(2, 5);
    this.S      = Math.pow(2, 6);
    this.SE     = Math.pow(2, 7);
    this.U      = Math.pow(2, 8);
    this.UNW    = Math.pow(2, 9);
    this.UN     = Math.pow(2,10);
    this.UNE    = Math.pow(2,11);
    this.UW     = Math.pow(2,12);
    this.UE     = Math.pow(2,13);
    this.USW    = Math.pow(2,14);
    this.US     = Math.pow(2,15);
    this.USE    = Math.pow(2,16);
    this.D      = Math.pow(2,17);
    this.DNW    = Math.pow(2,18);
    this.DN     = Math.pow(2,19);
    this.DNE    = Math.pow(2,20);
    this.DW     = Math.pow(2,21);
    this.DE     = Math.pow(2,22);
    this.DSW    = Math.pow(2,23);
    this.DS     = Math.pow(2,24);
    this.DSE    = Math.pow(2,25);
}

/* create a place, insert it on Nodiverse */
nodiverse.prototype.create = function(coords, passages) {
    // validate input, and check if place is empty
    if (this.validate_coords(coords) &&
        this.validate_passages(passages) &&
        (this.get(coords) === null)
    ) {
        this.places.push({"coords":coords, "passages":passages});
        // Affect neighbours' passages. For each existing neighbour:
        // * if they have a passage to us and we don't have one to them, close it
        // * if they don't have a passage to us but we have one to them, open it
        // NW
        var neighbour = this.get([coords[0]+1, coords[1]-1, coords[2]]);
        if ((neighbour !== null) &&
           (neighbour.passages & this.SE) !== (passages & this.NW)
        ) {
            if (passages & this.NW) {
                neighbour.passages += this.SE;
            } else {
                neighbour.passages -= this.SE;
            }
            this.update(neighbour);
        }
        // TODO: rest of coordinates
        return true;
    }
    return false;
}

/* see if coords are valid */
nodiverse.prototype.validate_coords = function(coords) {
    // Coords must be an [x,y,z] array, each element an int
    if (typeof coords === 'object' &&
        coords instanceof Array &&
        coords.length === 3
    ) {
        for (var i = 0; i < 3; i++) {
            if (typeof coords[i] !== 'number' || coords[i] % 1 !== 0)
                return false;
        }
        return true;
    }
    return false;
}

/* see if passages are valid */
nodiverse.prototype.validate_passages = function(passages) {

    // if there are no passages, variable can be undef, null or 0
    if (typeof passages === 'undefined' || passages === null || passages === 0)
        return true;

    // if there are passages, the value must be an int, between NW and (SE*2)-1
    if (typeof passages === 'number' &&
        passages % 1 === 0 &&
        (this.NW <= passages && passages < (this.DSE*2))
    ) return true;

    // invalid value
    return false;
}

/* get a place */
nodiverse.prototype.get = function(coords) {
    if (!this.validate_coords(coords)) return null;
    for (var p = 0; p < this.places.length ; p++) {
        if (this.places[p].coords[0] === coords[0] &&
            this.places[p].coords[1] === coords[1] &&
            this.places[p].coords[2] === coords[2]
        ) return this.places[p];
    }
    return null;
}

/* update a place */
nodiverse.prototype.update = function(place) {
    if (typeof place === 'undefined') return false;
    if (!this.validate_coords(place.coords)) return false;
    if (!this.validate_passages(place.passages)) return false;
    for (var p = 0; p < this.places.length ; p++) {
        if (this.places[p].coords[0] === place.coords[0] &&
            this.places[p].coords[1] === place.coords[1] &&
            this.places[p].coords[2] === place.coords[2]
        ) {
            // This is it - the place we want to update
            // TODO: check the neighbours first for inconsistencies on passages
            this.places[p] = place;
            return true;
        }
    }

    // There's no place there, so I can't update.
    // If the intention is to move the place's coordinates... I'm sorry, you
    // can't change the universe *that* way.
    return false;
}

/* destroy a place */
nodiverse.prototype.nuke = function(coords) {
    if (!this.validate_coords(coords)) return false;
    for (var p = 0; p < this.places.length ; p++) {
        if (this.places[p].coords[0] === coords[0] &&
            this.places[p].coords[1] === coords[1] &&
            this.places[p].coords[2] === coords[2]
        ) this.places.slice(p);
    }
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
