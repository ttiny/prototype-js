"use strict";

Unitest( 'RegExp.matchRecursive()', function ( test ) {

	test.eq( {match: {match: '<code>asd <code>asd</code> qwe</code>'}}, RegExp.matchRecursive( '<code>asd <code>asd</code> qwe</code>', '<code[^>]*>', '</code>' ), CMP_EXTENDS );
	test.eq( {match: {match: '<code>asd qwe</code>'}}, RegExp.matchRecursive( '<code>asd <code>asd qwe</code>', '<code[^>]*>', '</code>' ), CMP_EXTENDS );
	test.eq( null, RegExp.matchRecursive( '<code>asd <code>asd qwe', '<code[^>]*>', '</code>' ) );

} );

Unitest( 'RegExp.pushIndex/popIndex()', function ( test ) {
	var re = /a/g;
	re.exec( '1a1a' );
	test.eq( re.lastIndex, 2 );
	re.pushIndex()
	re.exec( '1a1a' );
	test.eq( re.lastIndex, 4 );
	re.popIndex()
	test.eq( re.lastIndex, 2 );
	re.popIndex()
	test.eq( re.lastIndex, 0 );
} );

Unitest( 'RegExp.resetIndex', function ( test ) {
	var re = /a/g;
	re.exec( '1a1a' );
	test.eq( re.lastIndex, 2 );
	re.resetIndex()
	re.exec( '1a1a' );
	test.eq( re.lastIndex, 2 );
} );