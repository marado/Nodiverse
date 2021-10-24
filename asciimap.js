/* asciimap.js -- drawing 3D maps in ASCII! */

/* Let's learn how to draw!
 * 
 * We're going to deal with ascii maps that have three particularities:
 * a) places are refered to by their name
 * b) possible passages between places are not only straight but also diagonal
 * c) we're dealing with 3D
 * 
 * That being the case, this seems the easiest representation of a map:
 * 
 * a - b
 * 
 * In the previous case, we have two places, where b is east from a. If we have
 * places in other directions, including diagonal, we can have, for instance:
 *
 * c - d
 * | / 
 * a - b
 *
 * But what if there are passages outside the viewable map? We better have this:
 *
 *    X   X   X
 *     \  |  /
 *      \ | /
 *    X - X - X
 *      / | \
 *     /  |  \
 *    X   X   X
 *
 * ...but this doesn't deal with the 'z' dimension... and in a place you can't
 * just go up or down, you can actually go "up northwest"... So, let's extend
 * the notation:
 *
 * ^  ^  ^     .  .  .
 *    a           b
 * ^  ^  ^ --- .  #  .
 * 
 * ^     ^     .  .  .
 * 
 * In this map, we have a and b, b being east of a. From a you can go up on all
 * directions (the ^ sign) but "US" (up-south). From b you can go down (the .
 * sign) in all directions. From b, not only you can go down but also up (the #
 * sign).
 * 
 * What does this mean, in terms of code? Well, each place occupies 7x5
 * characters:
 * 
 * 1  2  3     1 - NW; 2 - N; 3 - NE; 4 - E; 5 - here (can be used by U or D)
 * abcdefg     6 - E; 7 - SW; 8 - D; 9 - SE
 * 4  5  6     abcdefghijklmn - the first letters on the place name
 * hijklmn     On any place from 1 to 9 you can either have nothing, or one of 
 * 7  8  9     three symbols: ^ - U; . - D; # - U and D
 * 
 * Each row have the places separated by a 5x5 slot, each column has the places
 * separated by 7x3 slots.
 * 
 * Here's a final, more complex, example of a map in this notation:
 * 
 * house       street
 *    #    ---        
 * 
 *        
 * 
 *    |
 * 
 * 
 * garden
 * 
 * 
 * 
 * Ugly and not intuitive, right? So, maybe we should add boundaries to places: 
 * 
 *  -------            
 * |1  2  3|    
 * |abcdefg|    
 * |4  5  6|    
 * |hijklmn|    
 * |7  8  9|    
 *  -------
 *
 * Prettier? Let's see:
 *
 *
 *  -------       -------            
 * |1  2  3|     |1  2  3|
 * |abcdefg|     |abcdefg|
 * |4  5  6| --- |4  5  6|
 * |hijklmn|     |hijklmn|
 * |7  8  9|     |7  8  9|
 *  -------       ------- 
 *          \
 *     |      \
 *              \
 *  -------       -------            
 * |1  2  3|     |1  2  3|
 * |abcdefg|     |abcdefg|
 * |4  5  6| --- |4  5  6|
 * |hijklmn|     |hijklmn|
 * |7  8  9|     |7  8  9|
 *  -------       ------- 
 *
 * Well, we can see how this could work, but... if we have boundaries, isn't
 * this just a waste of precious space? Can't we just do this?
 * 
 *  ^\^|/^ .\.|/.
 *  ^-a^-^ .-b#-.
 *  ^/^|\^ ./.|\.
 *
 * Let's see how intuitive it gets with "non-crowded" maps:
 * 
 *    h#-   -s
 *      |
 *
 *      |
 *    g
 *
 * It still feels weird, and a waste of space. the "2D" connections (n, s, e,
 * w, nw, ...) end up being duplicated (we connect to north, our
 * neighbor connects to south, why show both?). Let's try something simpler
 * still...
 *
 * \  |  /\     /
 *  ^ ^ ^  . . .
 * -^ a^^--. b#.-
 *  ^ ^ ^  . . .
 * /  |  \/  |  \
 *
 * Oh, well, this actually occupues more space... how does it work with the
 * non-crowded eg.?
 *
 *
 *    h# --  s
 *
 *    |
 *    |
 *
 *    g
 *
 * Well, it's easier to read... ugly as hell, tho. I guess that, for now, it
 * will have to do.
 *
 *
 * SUMMARY:
 * 
 * Eg of a 2D map:
 *    X   X   X
 *     \  |  /
 *      \ | /
 *    X - X - X
 *      / | \
 *     /  |  \
 *    X   X   X
 *
 * Eg of a 3D map:
 *
 *
 *    h# --  s
 *
 *    |
 *    |
 *
 *    g
 *
 *
 * Now, let's actually create some code, to create either 2D or 3D maps!
 *
 */

const stripAnsi = require('strip-ansi');

module.exports = function() {
    this.drawmap = function(nodiverse, dimensions, size, center) {
	// to be retrocompatible, if no color argument is provided, then
	// consider we want an ASCII, not ANSI, map
	return drawmap(nodiverse, dimensions, size, center, false);
    }

    this.drawmap = function(nodiverse, dimensions, size, center, color) {
        if (dimensions == 2) return draw2Dmap(nodiverse, size, center, color);
        if (dimensions == 3) return draw3Dmap(nodiverse, size, center, color);
        return "Can't draw a map with that number of dimensions...";
    }

    this.draw2Dmap = function(nodiverse,size,center) {
	// to be retrocompatible, if no color argument is provided, then
	// consider we want an ASCII, not ANSI, map
	return draw2Dmap(nodiverse,size,center,false);
    }

    // returns false if can't draw, an ascii drawing otherwise
    this.draw2Dmap = function(nodiverse,size,center,color) {
	if (!(typeof size === 'object' && size instanceof Array && size.length === 2)) return false;
	if (!(size[0] === parseInt(size[0]) && size[1] === parseInt(size[1]) &&
		(size[0] % 2 !== 0) && (size[1] % 2 !== 0)))
		    return false;
	if (!nodiverse.validate_coords(center)) return false;

	var maparray = [];
	for (var y=center[1]+(Math.floor(size[1]/2));y>=center[1]-(Math.floor(size[1]/2));y--) {
		var line = [];
		for (var x=center[0]-(Math.floor(size[0]/2));x<=center[0]+(Math.floor(size[0]/2));x++) {
			line.push(draw2Dtile(nodiverse,[x,y,center[2]],color));
		}
		maparray.push(line);
	}

	var mapstring = "";
	for (var i = 0; i < maparray.length; i++) {
		var line = ["","","",""];
		for (var j=0; j < maparray[i].length; j++) {
			line[0] += maparray[i][j][0];
			line[1] += maparray[i][j][1];
			line[2] += maparray[i][j][2];
		}
		mapstring += line[0]+"\n";
		mapstring += line[1]+"\n";
		mapstring += line[2]+"\n";
	}
	return mapstring;
    }
    
    // returns an array with each of the three relevant lines (north, center, south)
    // doesn't show what's east of the point (including passages), to ease glueing
    this.draw2Dtile = function(nodiverse,coords,color) {
	if (!nodiverse.validate_coords(coords)) return false;
	var tile = nodiverse.get(coords); 
	// don't assume there's an actual place at these coordinates
        if (typeof tile === 'undefined' || tile === null) return ["    ","    ","    "];
	const chalk = require('chalk');
	var asciitile = [];
	if (typeof tile.name !== 'string') tile.name = "X";
	if ((tile.passages & nodiverse.NW) === nodiverse.NW) {
		asciitile[0] = "\\ ";
	} else {
		asciitile[0] = "  ";
	}
	if ((tile.passages & nodiverse.N) === nodiverse.N) {
		asciitile[0] += "| ";
	} else {
		asciitile[0] += " ";
	}
	if ((tile.passages & nodiverse.NE) === nodiverse.NE) {
	    asciitile[0] += "/";
	} else {
	    asciitile[0] += " ";
	}
	var name = stripAnsi(tile.name).substring(0,1);
	if (color) name = chalk.bold(name);
	if ((tile.passages & nodiverse.W) === nodiverse.W) {
		asciitile[1] = "- "+ name + " ";
	} else {
		asciitile[1] = "  "+ name + " ";
	}
	if ((tile.passages & nodiverse.SW) === nodiverse.SW) {
		asciitile[2] = "/ ";
	} else {
		asciitile[2] = "  ";
	}
	if ((tile.passages & nodiverse.S) === nodiverse.S) {
		asciitile[2] += "| ";
	} else {
		asciitile[2] += " ";
	}
	if ((tile.passages & nodiverse.SE) === nodiverse.SE) {
		asciitile[2] += "\\";
	} else {
		asciitile[2] += " ";
	}
	if (color) asciitile.forEach(function(v,k){asciitile[k]=chalk.yellow(v);});
	return asciitile;
    }

    this.draw3Dmap = function(nodiverse,size,center) {
	// to be retrocompatible, if no color argument is provided, then
	// consider we want an ASCII, not ANSI, map
	return draw3Dmap(nodiverse,size,center,false);
    }
    this.draw3Dmap = function(nodiverse,size,center,color) {
        // TODO: implement 3D map. 
        // Until then, draw a 2D map instead
        return draw2Dmap(nodiverse,size,center,color);
    }
}
