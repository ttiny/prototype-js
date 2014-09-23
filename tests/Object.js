"use strict";

Unitest( 'Object.merge()', function ( test ) {

	var a = { a: 2, b: 3 }.merge( { a: 3, c: 4 } );
	test( a.a === 3 );
	test( a.b === 3 );
	test( a.c === 4 );

} );

Unitest( 'Object.duplicate()', function ( test ) {

	var a = { a: {}, b: 3 };
	test( a.duplicate() !== a );
	test( a.duplicate().a !== a.a );
	test( a.duplicate().b == a.b );

} );

Unitest( 'Object.isObject()', function ( test ) {

	test( !Object.isObject( new String ) );
	test( Object.isObject( {} ) );
	test( !Object.isObject( 1 ) );
	test( !Object.isObject( 'asd' ) );

} );

Unitest( 'Object.newArgs()', function ( test ) {

	var A = function () {
	};

	var B = function () {
		return arguments[1];
	};

	test( Object.newArgs( A, [ 1, 2 ] ) instanceof A );
	test( Object.newArgs( B, [ 1, 2 ] ) === 2 );

} );

Unitest( 'Object.values()', function ( test ) {

	test.eq( Object.values( { a: 1, b: 2 } ), [ 1, 2 ] );

} );

Unitest( 'Object.filter()', function ( test ) {

	test.eq( { a: 1, b: 2, c: 3 }.filter( function ( val, key ) { return key != 'b' } ) , { a: 1, c: 3 } );
} );