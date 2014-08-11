"use strict";

/*@UNITESTS*//*@*/require( 'Unitest' );/*UNITESTS@*/

/**
 * Defines properties in the prototype of the function.
 * Each property will be added using Object.definePrototype.
 * @def function Function.define ( properties )
 * @param object Collection of properties.
 * @return this
 */
Object.defineProperty( Function.prototype, 'define', { 
	value: function ( prototype ) {
		var proto = this.prototype;
		for ( var i in prototype ) {
			Object.defineProperty( proto, i, { value: prototype[i], writable: true } );
		}
		return this;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'Function.define()', function ( test ) {

	var A = function () {};
	A.define( { test: function () { return this.qwe; }, qwe: 5 } );
	var a = new A();
	test( a.test() === 5 );

} );
/*UNITESTS@*/

/**
 * Defines properties in the the function object itself.
 * Each property will be added using Object.definePrototype.
 * @def function Function.defineStatic ( properties )
 * @param object Collection of properties.
 * @return this
 */
Object.defineProperty( Function.prototype, 'defineStatic', { 
	value: function ( prototype ) {
		for ( var i in prototype ) {
			Object.defineProperty( this, i, { value: prototype[i], writable: true } );
		}
		return this;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'Function.defineStatic()', function ( test ) {

	var A = function () {};
	A.defineStatic( { test: function () { return this.qwe; }, qwe: 5 } );
	var a = new A();
	test( a.test === undefined );
	test( A.test() == 5 );

} );
/*UNITESTS@*/


/**
 * Will make functions's prototype to inherit from given parent's prototype.
 * @def static function Function.extend ( parent, prototype )
 * @param Function
 * @param Object|undefined Prototype for the class itself.
 * @return this
 */
Object.defineProperty( Function.prototype, 'extend', { 
	value: function ( parent, prototype ) {
		this.prototype = Object.create( parent.prototype );
		this.define( prototype );
		return this;
	},
	writable: true
} );


/*@UNITESTS*/
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
/*UNITESTS@*/

/**
Passed as last argument to {@see Function.mixin()} to resolve conflicts.

```javascript
A.mixin( B, C, ResolveMixins( { 'overlappingMember':  B } ) );
```

@def function ResolveMixins ( resolve:Object )
*/
function ResolveMixins ( resolve ) {
	if ( !(this instanceof ResolveMixins) ) {
		return new ResolveMixins( resolve );
	}
	this.merge( resolve );
}

/**
Mixes the prototype of another function into the prototype of this function.

@def static function Function.mixin( mixinPrototype, ... )
@param Object
@return this
*/
Object.defineProperty( Function.prototype, 'mixin', { 
	value: function () {
		var arglen = arguments.length - 1;
		var resolve;
		if ( arglen > 0 && arguments[arglen] instanceof ResolveMixins ) {
			resolve = arguments[arglen];
		}
		else {
			++arglen;
		}
		for ( var i = 0; i < arglen; ++i ) {
			var mixin = arguments[i];
			var prototype = mixin.prototype || mixin;
			var keys = Object.getOwnPropertyNames( prototype );
			// for ( var key in prototype ) {
			for ( var j = keys.length - 1; j >= 0; --j ) {
				var key = keys[ j ];
				var value = undefined;
				if ( this.prototype[key] !== undefined ) {
					if ( resolve && resolve[key] !== undefined ) {
						var preffered = resolve[key];
						value = preffered.prototype ? preffered.prototype[key] : preffered[key];
					}
					if ( !value ) {
						throw new Error( 'Unable to mixin property "'+key+'", it is already defined' );
					}
				}
				else {
					value = prototype[key];
				}
				Object.defineProperty( this.prototype, key, { value: value, writable: true } );
			}
		}
		return this;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'Function.mixin()', function ( test ) {

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

} );
/*UNITESTS@*/

/**
 * Creates a wrapper functon that always calls another function with the same this context.
 * There is native Function.bind() in ES5, but surprisingly it works slower than a JS implementation.
 * @def function Function.bind ( newthis )
 * @param object
 * @return function
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Function.prototype, 'bind', { 
	value: function( that ) {
		var fn = this;
		return function ( ) {
			return fn.apply( that, arguments );
		};
	},
	writable: true
} );

/*@UNITESTS*/
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
/*UNITESTS@*/

/**
 * Creates a wrapper function that always calls another function with the same arguments.
 * Bound arguments will be appended to any arguments that the function is called with.
 * @def function Function.bindArgsAfter ( ... )
 * @vaarg
 * @return function
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Function.prototype, 'bindArgsAfter', { 
	value: function () {
		var func = this;
		var slice = Array.prototype.slice;
		var concat = Array.prototype.concat;
		var args = slice.call( arguments );
		return function ( ) {
			return func.apply( this, arguments.length ? concat.call( slice.call( arguments, 0 ), args ) : args );
		};
	},
	writable: true
} );

/*@UNITESTS*/
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
/*UNITESTS@*/

/**
 * Creates a wrapper function that always calls another function with the same arguments.
 * Bound arguments will be prepended to any arguments that the function is called with.
 * @def function Function.bindArgsBefore ( ... )
 * @vaarg
 * @return function
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Function.prototype, 'bindArgsBefore', { 
	value: function () {
		var func = this;
		var slice = Array.prototype.slice;
		var concat = Array.prototype.concat;
		var args = slice.call( arguments );
		return function ( ) {
			return func.apply( this, arguments.length ? concat.call( args, slice.call( arguments, 0 ) ) : args );
		};
	},
	writable: true
} );

/*@UNITESTS*/
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
/*UNITESTS@*/

if ( typeof global !== 'undefined' ) {
	global.ResolveMixins = ResolveMixins;
}
else if ( typeof window !== 'undefined' ) {
	window.ResolveMixins = ResolveMixins;
}