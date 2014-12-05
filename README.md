# Nodiverse

## What is Nodiverse?

Nodiverse is a 3D Universe generator Node.js library.

### Roadmap

* 0.1.0:
 - get a consistent and maleable universe
* 0.2.0:
 - asciimap
* 0.3.0:
 - universe is an octree (see https://www.npmjs.org/package/octree )
* 0.4.0:
 - non-mandatory initial parameters:
  - geometry (plane, sphere, ...)
  - default place
 - deal properly with defined geometry
* 1.0.0:
 - I want to see this module adopted and used in production before I can decide
   about it's stability and feature set. Only then I'll be able to know what
   can be considered a final (1.0.0) version

### Installation

Whenever this is in a state of any kind of usefulness (probably 0.1.0) it will
be added to npm. At that time, you'll be able to:
```
    npm install nodiverse 
```

### Usage

Since nothing of this exists yet, this section is roughly the development plan:
```
    var nodiverse = require('nodiverse'); // library load
    var myverse = nodiverse();            // my universe object creation
    // let's create a place... 
    // let's say, a room in the center of the universe, with a passage towards north and another towards southeast
    myverse.create([0,0,0], myverse.N + myverse.SE);
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
```

#### About the coordinates

 * x-axis (coords[0]) is "East to West"
 * y-axis (coords[1]) is "South to North"
 * z-axis (coords[2]) is "Down to Up"

Eg (2D):
```
    N     [0,1,0]
   W+E    [0,0,0] [1,0,0]
    S
```

#### Universe consistency

When you have a passage opened to some place that doesn't really exist, it
doesn't really matter: you can't go through no matter if the passage exists or
not. But when you have a passage to some place that exists, then that place
also needs a passage to you, in order to maintain universe consistency. In
other words: if you can go north from here, you can go south from there.

At the moment (version 0.0.2) That consistency isn't being garanteed by
Nodiverse. The module is still useable as it is, but that means you *must* make
the Universe consistent on the client's side. I mean, you can still do this:
```
    myverse.create([0,0,0],myverse.N); // place A
    myverse.create([0,1,0],myverse.N); // place B
```
But if you do so, you'll be in an inconsistent state (you can go from A to B,
but not from B to A). Since you're not creating B with a passage to A we'll
assume you don't want that passage, so you should, instead, do this:
```
    myverse.create([0,0,0],myverse.N); // place A
    var a = myverse.get([0,0,0]);
    a.passages -= myverse.N;
    myverse.update(a);
    myverse.create([0,1,0],myverse.N); // place B
```
### Nodiverse in action

This is planed to be used on:
* TalkerNode - https://github.com/marado/TalkerNode

If you want to add to this list, just submit a change!
