"use strict";

Unitest( 'Function.define()', function ( test ) {

	var A = function () {};
	A.define( { test: function () { return this.qwe; }, qwe: 5 } );
	var a = new A();
	test( a.test() === 5 );

} );

Unitest( 'Function.defineStatic()', function ( test ) {

	var A = function () {};
	A.defineStatic( { test: function () { return this.qwe; }, qwe: 5 } );
	var a = new A();
	test( a.test === undefined );
	test( A.test() == 5 );

} );

Unitest( 'Function.extend()', function ( test ) {

	// test simple prototype
	function A () {

	}

	A.extend( Array, {
		size: function () {
			return this.length;
		}
	} );

	var a = new A();

	test( a instanceof A );
	test( a instanceof Array );
	test( a.size() === 0 );

	// test inheritance without own functions
	function C () {

	}

	C.extend( Array );
	C.prototype.test = 5;

	var c = new C();
	Array.prototype.test2 = 6;

	test( c instanceof C );
	test( c instanceof Array );
	test( c.test === 5 );
	test( Array.prototype.test === undefined );
	test( [].test === undefined );
	test( c.test2 === 6 );

	delete Array.prototype.test2;


} );

Unitest( 'Function.mixin()/Object.instanceof', function ( test ) {

	function B () {

	}

	B.prototype = {
		asd: 'qwe'
	};

	function A () {

	}

	A.mixin( B );

	var a = new A();

	test( a.asd == 'qwe' );
	test( a instanceof A );

	var c = {
		a: 1
	};

	var d = {
		b: 2
	};

	var e = {
		a: 11
	};

	B.mixin( c, d );

	test( new B().a == 1 );
	test( new B().b == 2 );
	var caught = false;
	try {
		B.mixin( e );
	}
	catch ( e ) {
		caught = true;
	}
	test( caught );

	B.mixin( e, ResolveMixins( {'a': c} ) );
	test( new B().a == 1 );
	
	B.mixin( e, ResolveMixins( {'a': e} ) );
	test( new B().a == 11 );
	
	B.mixin( { a: 12 }, ResolveMixins( {'a': B} ) );
	test( new B().a == 11 );

	var IFace1 = function () {};
	IFace1.define( {
		iface1_decl: function () {},
		iface2_decl: function () {},
	} );
	
	var IFace2 = function () {};
	IFace2.extend( IFace1, {
		iface3_decl: function () {}
	} );

	var TTrait1 = function () {}
	TTrait1.define( {
		iface1_decl: function () {},
		iface2_decl: function () {}
	} );
	var TTrait2 = function () {};
	TTrait2.define( {
		iface3_decl: function () {},
	} );

	var A = function () {};
	A.mixin( TTrait1 );

	var caught = false;
	try { A.implement( TTrait1 ); }
	catch ( e ) { caught = true; }
	test( !caught );

	var caught = false;
	try { A.implement( IFace1 ); }
	catch ( e ) { caught = true; }
	test( !caught );

	test( !( (new A) instanceof IFace1 ) );
	test( (new A).instanceof( TTrait1 ) );
	test( (new A).instanceof( IFace1 ) );

	A.mixin( TTrait2 );

	var caught = false;
	try { A.implement( TTrait2 ); }
	catch ( e ) { caught = true; }
	test( !caught );

	var caught = false;
	try { A.implement( IFace2 ); }
	catch ( e ) { caught = true; }
	test( !caught );

	// var IFace = function () {};
	// IFace.define( { func: function () {} } );
	// var TTrait = function () {};
	// TTrait.define( { func: function () { return 1; } } ).implement( IFace );

	// var A = function () {};
	// A.mixin( TTrait );
	// test( (new A).instanceof( IFace ) );
} );

Unitest( 'Function.implement/Object.instanceof', function ( test ) {

	var IFace1 = function () {'iface1';};
	IFace1.define( {
		iface1_decl: function () {},
		iface2_decl: function () {},
	} );
	
	var IFace2 = function () {'iface2';};
	IFace2.extend( IFace1, {
		iface3_decl: function () {}
	} );

	var A = function () {};
	var caught = false;
	try { A.implement( IFace1 ); }
	catch ( e ) { caught = true; }
	test( caught );

	var A = function () {};
	A.define( {
		iface1_decl: function () {},
		iface2_decl: 'notfn',
	} );

	var caught = false;
	try { A.implement( IFace1 ); }
	catch ( e ) { caught = true; }
	test( caught );

	var A = function () {};
	A.define( {
		iface1_decl: function () {},
		iface2_decl: function () {},
	} );

	var caught = false;
	try { A.implement( IFace1 ); }
	catch ( e ) { caught = true; }
	test( !caught );

	var A = function () {};
	A.define( {
		iface1_decl: function () {},
		iface2_decl: function () {},
	} );

	var caught = false;
	try { A.implement( IFace2 ); }
	catch ( e ) { caught = true; }
	test( caught );

	var A = function () {};
	A.define( {
		iface1_decl: function () {},
		iface3_decl: function () {},
	} );

	var caught = false;
	try { A.implement( IFace2 ); }
	catch ( e ) { caught = true; }
	test( caught );

	var A = function () {};
	A.define( {
		iface1_decl: function () {},
		iface2_decl: function () {},
		iface3_decl: function () {},
	} );

	var caught = false;
	try { A.implement( IFace2 ); }
	catch ( e ) { caught = true; }
	test( !caught );

	test( (new A).instanceof( IFace2 ) );
	test( (new A).instanceof( IFace1 ) );

	var A = function () {};
	A.define( {
		iface1_decl: function () {},
		iface2_decl: function () {},
	} );
	var B = function () {};
	B.extend( A, {
		iface3_decl: function () {},
	} );

	var caught = false;
	try { A.implement( IFace1 ); }
	catch ( e ) { caught = true; }
	test( !caught );

	var caught = false;
	try { B.implement( IFace2 ); }
	catch ( e ) { caught = true; }
	test( !caught );

	test( (new B) instanceof A );
	test( (new B).instanceof( A ) );
	test( (new A).instanceof( IFace1 ) );
	test( !( (new A) instanceof IFace1 ) );
	test( !(new A).instanceof( IFace2 ) );
	test( !( (new A) instanceof IFace2 ) );
	test( (new B).instanceof( IFace1 ) );
	test( (new B).instanceof( IFace2 ) );
	test( !( (new B) instanceof IFace1 ) );
	test( !( (new B) instanceof IFace2 ) );

} );


Unitest( 'Function.bind()', function ( test ) {

	var obj = {}

	var a = function () {
		return this;
	};

	test( a() === this );
	test( a.bind( obj )() === obj );

	var b = function () {
		return arguments;
	};

	var args = b.bind( obj )( 1, 2, 3 );
	test( args[0] == 1 && args[1] == 2 && args[2] == 3 && args.length == 3 );

} );

Unitest( 'Function.bindArgsAfter()', function ( test ) {

	var a = function () {
		return arguments;
	};

	var b = a.bindArgsAfter( 2, 3 );
	test( b()[0] == 2 );
	test( b()[1] == 3 );
	test( b( 1 )[0] == 1 );
	test( b( 1 )[1] == 2 );
	test( b( 1 )[2] == 3 );

} );

Unitest( 'Function.bindArgsBefore()', function ( test ) {

	var a = function () {
		return arguments;
	};

	var b = a.bindArgsBefore( 2, 3 );
	test( b()[0] == 2 );
	test( b()[1] == 3 );
	test( b( 1 )[0] == 2 );
	test( b( 1 )[1] == 3 );
	test( b( 1 )[2] == 1 );

} );
