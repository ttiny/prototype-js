"use strict";

Object.defineProperty( Array.prototype, 'duplicate', {
	value: function () {
		var ret = [].concat( this );
		for ( var i = ret.length - 1; i >= 0; --i ) {
			var r = ret[ i ];
			if ( r instanceof Object && r.duplicate instanceof Function ) {
				ret[i] = r.duplicate();
			}
		}
		return ret;
	},
	writable: true
} );

Object.defineProperty( Array.prototype, 'merge', {
	value: Array.prototype.concat,
	writable: true
} );

Object.defineProperty( Array.prototype, 'last', {
	get: function () {
		var i = this.length - 1;
		return i >= 0 ? this[ i ] : undefined;
	},
	set: function ( v ) {
		var i = this.length - 1;
		return i >= 0 ? this[ i ] = v : this[ 0 ] = v;
	}
} );


Object.defineProperty( Array.prototype, 'contains', {
	value: function ( value ) {
		return this.indexOf( value ) >= 0;
	},
	writable: true
} );


Object.defineProperty( Array.prototype, 'containsEx', {
	value: function ( value ) {
		return this.indexOfEx( value ) >= 0;
	},
	writable: true
} );


Object.defineProperty( Array.prototype, 'unique', {
	value: function () {
		var unique = [];
		for ( var item of this ) {
			if ( unique.indexOf( item ) < 0 ) {
				unique.push( item );
			}
		}
		return unique;
	},
	writable: true
} );

Object.defineProperty( Array.prototype, 'indexOfEx', {
	value: function ( callback, offset ) {
		if ( !(callback instanceof Function) ) {
			return this.indexOf( callback, offset || 0 );
		}
		for ( var i = offset || 0, iend = this.length; i < iend; ++i ) {
			if ( callback( this[ i ], i, this ) ) {
				return i;
			}
		}
		return -1;
	},
	writable: true
} );

Object.defineProperty( Array.prototype, 'lastIndexOfEx', {
	value: function ( callback, offset ) {
		if ( !(callback instanceof Function) ) {
			return this.lastIndexOf( callback, offset !== undefined ? offset : this.length - 1 );
		}
		for ( var i = offset || this.length - 1; i >= 0; --i ) {
			if ( callback( this[ i ], i, this ) ) {
				return i;
			}
		}
		return -1;
	},
	writable: true
} );