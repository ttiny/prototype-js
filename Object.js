"use strict";

/*@UNITESTS*//*@*/require( 'Unitest' );/*UNITESTS@*/

/**
 * Copies references of properties from another object to this one.
 * @def function Object.merge ( object )
 * @param object
 * @return this
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Object.prototype, 'merge', {
	value: function ( object ) {
		for ( var i in object ) {
			this[i] = object[i];
		}
		return this;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'Object.merge()', function ( test ) {

	var a = { a: 2, b: 3 }.merge( { a: 3, c: 4 } );
	test( a.a === 3 );
	test( a.b === 3 );
	test( a.c === 4 );

} );
/*UNITESTS@*/

/**
 * Creates object with duplicates of the properties of this object.
 * This function works recursively and will call .duplicate() for the
 * properties that implement this function.
 * @def function Object.duplicate ()
 * @return Object
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Object.prototype, 'duplicate', {
	value: function () {
		var ret = Object.create( Object.getPrototypeOf( this ) );
		for ( var i in this ) {
			var item = this[i];
			if ( item instanceof Object && item.duplicate instanceof Function ) {
				ret[i] = item.duplicate();
			}
			else {
				ret[i] = item;
			}
		}
		return ret;
	},
	writable: true
} );


/*@UNITESTS*/
Unitest( 'Object.duplicate()', function ( test ) {

	var a = { a: {}, b: 3 };
	test( a.duplicate() !== a );
	test( a.duplicate().a !== a.a );
	test( a.duplicate().b == a.b );

} );
/*UNITESTS@*/


/**
 * Checks if argument is an Object and not a subclass of Object.
 * @def static bool function Object.isObject ( obj:mixed )
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Object, 'isObject', { 
	value: function ( obj ) {
		return obj instanceof Object && Object.getPrototypeOf( obj ) === Object.prototype;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'Object.isObject()', function ( test ) {

	test( !Object.isObject( new String ) );
	test( Object.isObject( {} ) );
	test( !Object.isObject( 1 ) );
	test( !Object.isObject( 'asd' ) );

} );
/*UNITESTS@*/


/**
 * Retrieves the values of all own properties.
 * @def static bool function Object.values ( obj:mixed )
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Object, 'values', { 
	value: function ( obj ) {
		var keys = Object.keys( obj );
		var values = new Array( keys.length );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			values[i] = obj[ keys[i] ];
		}
		return values;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'Object.values()', function ( test ) {

	test.eq( Object.values( { a: 1, b: 2 } ), [ 1, 2 ] );

} );
/*UNITESTS@*/



/**
 * Filters out all properties for which the callback is not true.
 * @def static bool function Object.filter ( callback:Object.FilterCallback, thisArg:mixed|undefined )
 * @return this
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */

/**
@def callback Object.FilterCallback ( value, key, object )
*/
Object.defineProperty( Object.prototype, 'filter', { 
	value: function ( callback, thisArg ) {
		var keys = Object.keys( this );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			var key = keys[i];
			if ( callback.call( thisArg, this[key], key, this ) !== true ) {
				delete this[key];
			}
		}
		return this;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'Object.filter()', function ( test ) {

	test.eq( { a: 1, b: 2, c: 3 }.filter( function ( val, key ) { return key != 'b' } ) , { a: 1, c: 3 } );
} );
/*UNITESTS@*/