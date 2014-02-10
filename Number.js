"use strict";

/**
 * Checks if argument is a number.
 * This function checks for both typeof and instanceof
 * to make sure the argument is a number.
 * @def static function Number.isNumber ( number )
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Number, 'isNumber', { 
	value: function ( str ) {
		return typeof str == 'number' || str instanceof Number;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'Number.isNumber()', function ( test ) {


	test( !(5 instanceof Number) && Number.isNumber( 5 ) );
	test( typeof new Number( 5 ) == 'object' && Number.isNumber( new Number( 5 ) ) );
	test( !(5.5 instanceof Number) && Number.isNumber( 5.5 ) );
	test( typeof new Number( 5.5 ) == 'object' && Number.isNumber( new Number( 5.5 ) ) );

} );
/*UNITESTS@*/