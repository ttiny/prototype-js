"use strict";

Object.defineProperty( Object.prototype, 'merge', {
	value: function ( object ) {
		var keys = Object.getOwnPropertyNames( object );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			var key = keys[ i ];
			this[ key ] = object[ key ];
		}
		return this;
	},
	writable: true
} );


Object.defineProperty( Object.prototype, 'mergeDeep', {
	value: function ( object ) {
		var keys = Object.getOwnPropertyNames( object );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			var key = keys[ i ];
			var existing = this[ key ];
			var value = object[ key ];
			if ( Object.isObject( existing ) && Object.isObject( value ) ) {
				existing.mergeDeep( value );
			}
			else {
				this[ key ] = value;
			}
		}
		return this;
	},
	writable: true
} );


Object.defineProperty( Object.prototype, 'duplicate', {
	value: function () {
		if ( !Object.isObject( this ) ) {
			return this;
		}
		var ret = {};
		var keys = Object.getOwnPropertyNames( this );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			var key = keys[ i ];
			var item = this[ key ];
			if ( item instanceof Object && item.duplicate instanceof Function ) {
				ret[ key ] = item.duplicate();
			}
			else {
				ret[ key ] = item;
			}
		}
		return ret;
	},
	writable: true
} );


Object.defineProperty( Object, 'isObject', { 
	value: function ( obj ) {
		return obj instanceof Object && Object.getPrototypeOf( obj ) === Object.prototype;
	},
	writable: true
} );


Object.defineProperty( Object, 'newArgs', { 
	value: function ( ctor, args ) {
		return new ( Function.prototype.bind.apply( ctor, [ null ].concat( args ) ) );
	},
	writable: true
} );


Object.defineProperty( Object, 'values', { 
	value: function ( obj ) {
		var keys = Object.keys( obj );
		var values = new Array( keys.length );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			values[ i ] = obj[ keys[ i ] ];
		}
		return values;
	},
	writable: true
} );


Object.defineProperty( Object.prototype, 'filter', { 
	value: function ( callback, thisArg ) {
		var keys = Object.keys( this );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			var key = keys[i];
			if ( callback.call( thisArg, this[ key ], key, this ) !== true ) {
				delete this[ key ];
			}
		}
		return this;
	},
	writable: true
} );

