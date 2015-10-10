"use strict";

Object.defineProperty( Number, 'isNumber', { 
	value: function ( str ) {
		return typeof str == 'number' || str instanceof Number;
	},
	writable: true
} );

