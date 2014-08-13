"use strict";

Unitest( 'Array.duplicate()', function ( test ) {

	var a = [ {}, 1, "", [ 2 ] ];
	test( a.duplicate() !== a );
	test( a.duplicate()[0] !== a[0] );
	test( a.duplicate()[1] == a[1] );
	test( a.duplicate()[2] == a[2] );
	test( a.duplicate()[3] !== a[3] );
	test( a.duplicate()[3][0] == a[3][0] );

} );


Unitest( 'Array.last()', function ( test ) {

	var a = [ 1, 2 ];
	test( a.last === 2 );
	a.last = 3;
	test( a.last === 3 && a[1] === 3 && a.length == 2 );

	a = [];
	test( a.last === undefined );
	a.last = 2;
	test( a.last === 2 && a.length == 1 )
	

} );