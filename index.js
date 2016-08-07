require('./asciimap.js')();

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
        this.update_neighbours(coords, passages);
        this.places.push({"coords":coords, "passages":passages});
        return true;
    }
    return false;
}

/* update neighbours' passages, taking the given place as the one with the "right passages" */

nodiverse.prototype.update_neighbours = function(coords, passages) {
    // Affect neighbours' passages. For each existing neighbour:
    // * if they have a passage to us and we don't have one to them, close it
    // * if they don't have a passage to us but we have one to them, open it

    var opposites = [
        [this.NW,this.SE],[this.N,this.S],[this.NE,this.SW],[this.W,this.E],[this.E,this.W],[this.SW,this.NE],[this.S,this.N],[this.SE,this.NW],
        [this.U,this.D],[this.UNW,this.DSE],[this.UN,this.DS],[this.UNE,this.DSW],[this.UW,this.DE],[this.UE,this.DW],[this.USW,this.DNE],[this.US,this.DN],[this.USE,this.DNW],
        [this.D,this.U],[this.DNW,this.USE],[this.DN,this.US],[this.DNE,this.USW],[this.DW,this.UE],[this.DE,this.UW],[this.DSW,this.UNE],[this.DS,this.UN],[this.DSE,this.UNW]
    ];

    for (var opIdx = 0; opIdx < opposites.length; opIdx++) {
        var neighbourCoords = this.shift_coords(coords,opposites[opIdx][0]);
        var neighbour = this.get(neighbourCoords);
        if ((neighbour !== null) && ((passages & opposites[opIdx][0]) != (neighbour.passages & opposites[opIdx][1]))) {
            // either we should have a passage or the neighbour shouldn't
            if (passages & opposites[opIdx][0]) {
                neighbour.passages += opposites[opIdx][1];
            } else {
                neighbour.passages -= opposites[opIdx][1];
            }
            this.update(neighbour);
        }
    }
}

/* given a set of coordinates and a direction, return the resulting coordinates */
nodiverse.prototype.shift_coords = function(coords,direction) {
    var shifted = Object.create(coords);

    // E vs W
    if ((direction & this.E) || (direction & this.NE) || (direction & this.SE) ||
            (direction & this.UE) || (direction & this.UNE) || (direction & this.USE) ||
            (direction & this.DE) || (direction & this.DNE) || (direction & this.DSE)) {
        shifted[0] = shifted[0] + 1;
    } else if ((direction & this.W) || (direction & this.NW) || (direction & this.SW) ||
            (direction & this.UW) || (direction & this.UNW) || (direction & this.USW) ||
            (direction & this.DW) || (direction & this.DNW) || (direction & this.DSW)) {
        shifted[0] = shifted[0] - 1;
    }

    // N vs S
    if ((direction & this.N) || (direction & this.NW) || (direction & this.NE) ||
            (direction & this.UN) || (direction & this.UNW) || (direction & this.UNE) ||
            (direction & this.DN) || (direction & this.DNW) || (direction & this.DNE)) {
        shifted[1] = shifted[1] + 1;
    } else if ((direction & this.N) || (direction & this.NW) || (direction & this.NE) ||
            (direction & this.UN) || (direction & this.UNW) || (direction & this.UNE) ||
            (direction & this.DN) || (direction & this.DNW) || (direction & this.DNE)) {
        shifted[1] = shifted[1] - 1;
    }

    // U vs D
    if (direction >= Math.pow(2, 8)) {
        if (direction >= Math.pow(2,17)) {
            shifted[2] = shifted[2] - 1;
        } else {
            shifted[2] = shifted[2] + 1;
        }
    }

    return shifted;
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
            this.update_neighbours(place.coords, place.passages);
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
    // There are many arguments that we might want to add here in the future, and many functionalities. For instance: 
    // * how big do we want the map to be? 
    // * what's the coordinates we should put at the center of the map?
    // * what "map style" do we want to present? (at least 2D vs 3D)
    // 
    // TODO
    return drawmap(3, [5,5], [0,0,0]);
}

/* given a place, return array of neighbours */
nodiverse.prototype.get_neighbours = function(place) {
    // initial validations
    if (typeof place === 'undefined') return [];
    if (!this.validate_passages(place.passages)) return [];
    if (place.passages == 0) return [];

    // figuring out what our passages are
    var passages = [];
    for (var i = 0; i < 26; i++) {
        if (place.passages & Math.pow(2, i)) {
            // there's a passage on i
            if (Math.pow(2, i) == this.NW ) passages.push(this.get([place.coords[0] - 1,place.coords[1] + 1,place.coords[2] + 0]));
            if (Math.pow(2, i) == this.N  ) passages.push(this.get([place.coords[0] + 0,place.coords[1] + 1,place.coords[2] + 0]));
            if (Math.pow(2, i) == this.NE ) passages.push(this.get([place.coords[0] + 1,place.coords[1] + 1,place.coords[2] + 0]));
            if (Math.pow(2, i) == this.W  ) passages.push(this.get([place.coords[0] - 1,place.coords[1] + 0,place.coords[2] + 0]));
            if (Math.pow(2, i) == this.E  ) passages.push(this.get([place.coords[0] + 1,place.coords[1] + 0,place.coords[2] + 0]));
            if (Math.pow(2, i) == this.SW ) passages.push(this.get([place.coords[0] - 1,place.coords[1] - 1,place.coords[2] + 0]));
            if (Math.pow(2, i) == this.S  ) passages.push(this.get([place.coords[0] + 0,place.coords[1] - 1,place.coords[2] + 0]));
            if (Math.pow(2, i) == this.SE ) passages.push(this.get([place.coords[0] + 1,place.coords[1] - 1,place.coords[2] + 0]));
            if (Math.pow(2, i) == this.U  ) passages.push(this.get([place.coords[0] + 0,place.coords[1] + 0,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.UNW) passages.push(this.get([place.coords[0] - 1,place.coords[1] + 1,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.UN ) passages.push(this.get([place.coords[0] + 0,place.coords[1] + 1,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.UNE) passages.push(this.get([place.coords[0] + 1,place.coords[1] + 1,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.UW ) passages.push(this.get([place.coords[0] - 1,place.coords[1] + 0,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.UE ) passages.push(this.get([place.coords[0] + 1,place.coords[1] + 0,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.USW) passages.push(this.get([place.coords[0] - 1,place.coords[1] - 1,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.US ) passages.push(this.get([place.coords[0] + 0,place.coords[1] - 1,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.USE) passages.push(this.get([place.coords[0] + 1,place.coords[1] - 1,place.coords[2] + 1]));
            if (Math.pow(2, i) == this.D  ) passages.push(this.get([place.coords[0] + 0,place.coords[1] + 0,place.coords[2] - 1]));
            if (Math.pow(2, i) == this.DNW) passages.push(this.get([place.coords[0] - 1,place.coords[1] + 1,place.coords[2] - 1]));
            if (Math.pow(2, i) == this.DN ) passages.push(this.get([place.coords[0] + 0,place.coords[1] + 1,place.coords[2] - 1]));
            if (Math.pow(2, i) == this.DNE) passages.push(this.get([place.coords[0] + 1,place.coords[1] + 1,place.coords[2] - 1]));
            if (Math.pow(2, i) == this.DW ) passages.push(this.get([place.coords[0] - 1,place.coords[1] + 0,place.coords[2] - 1]));
            if (Math.pow(2, i) == this.DE ) passages.push(this.get([place.coords[0] + 1,place.coords[1] + 0,place.coords[2] - 1]));
            if (Math.pow(2, i) == this.DSW) passages.push(this.get([place.coords[0] - 1,place.coords[1] - 1,place.coords[2] - 1]));
            if (Math.pow(2, i) == this.DS ) passages.push(this.get([place.coords[0] + 0,place.coords[1] - 1,place.coords[2] - 1]));
            if (Math.pow(2, i) == this.DSE) passages.push(this.get([place.coords[0] + 1,place.coords[1] - 1,place.coords[2] - 1]));
        }
    }
    passages = passages.filter(function(p) { return (p !== null); });
    return passages;
}

module.exports = function() {
    return new nodiverse();
}
