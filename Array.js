"use strict";



/**
 * Creates array with duplicates of the items of this array.
 * This function works recursively and will call .duplicate() for the
 * items that implement this function.
 * @def function Array.duplicate ()
 * @return Array
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Array.prototype, 'duplicate', {
	value: function () {
		var ret = [].concat( this );
		for ( var i = ret.length - 1; i >= 0; --i ) {
			var r = ret[i];
			if ( r instanceof Object && r.duplicate instanceof Function ) {
				ret[i] = r.duplicate();
			}
		}
		return ret;
	},
	writable: true
} );



/**
Alias for {@see Array.concat()}, just for consistency.
@def function Array.merge ( ... )
*/
Object.defineProperty( Array.prototype, 'merge', {
	value: Array.prototype.concat,
	writable: true
} );

/**
 * Retrieves or sets the last element of the array.
 * @def var Array.last
 * @var any|undefined Returns undefined if attempting to get the last element of zero-length array.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Array.prototype, 'last', {
	get: function () {
		var i = this.length - 1;
		return i >= 0 ? this[i] : undefined;
	},
	set: function ( v ) {
		var i = this.length - 1;
		return i >= 0 ? this[i] = v : this[0] = v;
	}
} );

