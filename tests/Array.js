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


Unitest( 'Array.map()', function ( test ) {

	var b = [ 1, 2 ];
	var a = b.map( function ( i ) { return i; } );
	test( a !== b );
	test( b[ 0 ] === a[ 0 ] )
	test( b[ 1 ] === a[ 1 ] )
	test( b.length === a.length );

	var A = function ( i ) { this.i = i; }
	A.prototype.test = function ( a, b, c ) { return a.i * 2 };

	var b = [ new A( 1 ), new A( 2 ) ];
	var a = b.map( it => it.test( it ) );
	test( a !== b );
	test( a[ 0 ] === b[ 0 ].i * 2 )
	test( a[ 1 ] === b[ 1 ].i * 2 )
	test( b.length === a.length );
	

} );


Unitest( 'Array.contains()', function ( test ) {

	var c = {};
	var b = [ 1, "asd", {}, c ];
	test( b.contains( c ) );
	test( b.contains( "asd" ) );
	test( b.contains( 1 ) );
	test( !b.contains( {} ) );
	

} );


Unitest( 'Array.unique()', function ( test ) {

	var c = {};
	var d = {};
	test.eq( [ 1, 2, 3, 1, 4 ].unique(), [ 1, 2, 3, 4 ] );
	test.eq( [ 1, "asd", d, c, c ].unique(), [ 1, "asd", d, c ] );

} );


Unitest( 'Array.indexOf()', function ( test ) {

	test.eq( [ 1, 2, 3, 3, 2, 1 ].indexOfEx( 3 ), 2 );
	test.eq( [ 1, 2, 3, 3, 2, 1 ].indexOfEx( it => it / 3 == 1 ), 2 );

} );


Unitest( 'Array.lastIndexOf()', function ( test ) {

	test.eq( [ 1, 2, 3, 3, 2, 1 ].lastIndexOfEx( 3 ), 3 );
	test.eq( [ 1, 2, 3, 3, 2, 1 ].lastIndexOfEx( it => it / 3 == 1 ), 3 );

} );

Unitest( 'Array.containsEx()', function ( test ) {

	test.eq( [ 1, 2, 3, 3, 2, 1 ].containsEx( 3 ), true );
	test.eq( [ 1, 2, 3, 3, 2, 1 ].containsEx( it => it / 3 == 1 ), true );

} );