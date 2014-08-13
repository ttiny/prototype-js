"use strict";



/**
 * Copies references of properties from another object to this one.
 * @def function Object.merge ( object )
 * @param object
 * @return this
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Object.prototype, 'merge', {
	value: function ( object ) {
		var keys = Object.getOwnPropertyNames( object );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			var key = keys[ i ];
			this[ key ] = object[ key ];
		}
		return this;
	},
	writable: true
} );



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
		var keys = Object.getOwnPropertyNames( this );
		for ( var i = 0, iend = keys.length; i < iend; ++i ) {
			var key = keys[ i ];
			var item = this[ key ];
			if ( item instanceof Object && item.duplicate instanceof Function ) {
				ret[ key ] = item.duplicate();
			}
			else {
				ret[ key ] = item;
			}
		}
		return ret;
	},
	writable: true
} );





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



/**
 * Applies arguments to a constructor.
 * Credits http://stackoverflow.com/a/16527324/325443.
 * @def static mixed function Object.newArgs ( obj:Object, args:array )
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( Object, 'newArgs', { 
	value: function ( ctor, args ) {
		var new_obj = Object.create( ctor.prototype );
		var ctor_ret = ctor.apply( new_obj, args );

		// Some constructors return a value; make sure to use it!
		return ctor_ret !== undefined ? ctor_ret: new_obj;
	},
	writable: true
} );



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

