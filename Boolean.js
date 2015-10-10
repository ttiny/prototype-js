"use strict";

Object.defineProperty( Boolean, 'isBoolean', { 
	value: function ( str ) {
		return typeof str == 'boolean' || str instanceof Boolean;
	},
	writable: true
} );

