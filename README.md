# Nodiverse

## What is Nodiverse?

Nodiverse is a 3D Universe generator Node.js library.

### Roadmap

* v1:
 - universe consists of places
 - places are defined by (coords, exits)
  - coords: x, y, z
  - exits: bitmask (NW & N & NE & W & E & SW & S & SE)
 - places can have other non-mandatory fields (name, description, ...)
 - methods
  - new universe; edit universe (non-mandatory initial parameters)
  - create place; destroy place; edit place
  - ascii map
* v2:
 - universe is an octree (see https://www.npmjs.org/package/octree )
* v3:
 - non-mandatory initial parameters:
  - geometry (plane, sphere, ...)
  - default place
 - deal properly with defined geometry

### Installation

Whenever this is in a state of any kind of usefulness (probably 0.1.0) it will
be added to npm. At that time, you'll be able to:
    
    npm install nodiverse 
 
### Usage

Since nothing of this exists yet, this section is roughly the development plan:
    
    var nodiverse = require('nodiverse'); // library load
    var myverse = nodiverse();            // my universe object creation
    // let's create a place... 
    // let's say, a room in the center of the universe, with a passage towards north and another towards southeast
    myverse.create([0,0,0], myverse.N & myverse.SE);
    // let's get a local copy of that place, maybe to change it
    var myplace = myverse.get([0,0,0]);
    myplace.name = "clearing";
    myplace.description = "This is a clearing.";
    // let's update the universe with this place's changes
    myverse.update(myplace);
    // we can, of course, also destroy a place
    myverse.nuke([0,0,0]);
    // and if we want to update the universe properties themselves:
    myverse.geometry="plane";
    myverse.default=[0,0,0];
    // finally, it might be useful to be able to see a visual representation of the universe
    console.log(myverse.asciimap());

### Nodiverse in action

This is planed to be used on:
* TalkerNode - https://github.com/marado/TalkerNode

If you want to add to this list, just submit a change!
