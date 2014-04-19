"use strict";

/*@UNITESTS*//*@*/require( 'Unitest' );/*UNITESTS@*/



/**
 * Checks if argument is a string.
 * This function checks for both typeof and instanceof
 * to make sure the argument is a string.
 * @def static function String.isString ( string )
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( String, 'isString', { 
	value: function ( str ) {
		return typeof str == 'string' || str instanceof String;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'String.isString()', function ( test ) {


	test( !('asd' instanceof String) && String.isString( 'sad' ) );
	test( typeof new String() == 'object' && String.isString( new String ) );

} );
/*UNITESTS@*/


/**
 * Extends the built-in {String.indexOfEx} with support of {RegExp}.
 *
 * @def function String.indexOfEx ( search:string|RegExp, offset:int = 0, out:Object = undefined )
 *
 * @param string|RegExp Subject to search for.
 * @param int Offset to start the search at.
 * @param Object Optional object to receive the matched subject's length in its `length` property.
 * @return int -1 if the search value is not found.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */

Object.defineProperty( String.prototype, 'indexOfEx', { 
	value: function ( search, offset, out ) {
		if ( search instanceof RegExp ) {

			if ( offset > 0 ) {
				var tLastIndex = search.lastIndex;
				var ret = search.exec( this.substr( offset ) );
				search.lastIndex = tLastIndex;
				
				if ( ret !== null ) {
					if ( out ) {
						out.length = ret[0].length;
					}
					return ret.index + offset;
				}
				return -1;
			}
			else {
				var tLastIndex = search.lastIndex;
				search.lastIndex = 0;
				var ret = search.exec( this );
				search.lastIndex = tLastIndex;

				if ( ret !== null ) {
					if ( out ) {
						out.length = ret[0].length;
					}
					return ret.index;
				}
				return -1;
			}
		}
		else {
			var ret = this.indexOf( search, offset );
			if ( out && ret >= 0 ) {
				out.length = search.length;
			}
			return ret;
		}
	},
	writable: true
} );


/*@UNITESTS*/
Unitest( 'String.indexOfEx()', function ( test ) {

	var r = 'left center right';
	var out = {};
	
	test( r.indexOfEx( 'center' ) == 5 );
	test( r.indexOfEx( 'center', undefined, out ) == 5 && out.length == 6 );
	test( r.indexOfEx( 'center', 6 ) == -1 );

	test( r.indexOfEx( /c[a-z]+r/ ) == 5 );
	test( r.indexOfEx( /c[a-z]+r/, undefined, out ) == 5 && out.length == 6 );
	test( r.indexOfEx( /c[a-z]+r/, 6 ) == -1 );
	

} );
/*UNITESTS@*/

/**
 * Extends the built-in {String.lastIndexOfEx} with support of {RegExp}.
 *
 * @def function String.lastIndexOfEx ( search:string|RegExp, offset:int = this.length, out:Object = undefined )
 *
 * @param string|RegExp Subject to search for.
 * @param int Offset to start the search at.
 * @param Object Optional object to receive the matched subject's length in its `length` property.
 * @return int -1 if the search value is not found.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */

Object.defineProperty( String.prototype, 'lastIndexOfEx', { 
	value: function ( search, offset, out ) {
		if ( search instanceof RegExp ) {
			offset = offset || this.length;
			var last, m;
			if ( !search.global ) {
				if ( search._lastIndexOf ) {
					search = search._lastIndexOf;
				}
				else {
					//if no global flag we will end in infinite loop
					var flags = (search.ignoreCase ? 'i' : '') +
					            (search.multiline ? 'm' : '') +
					            'g';
					
					// cache our regexp
					search = ( search._lastIndexOf = new RegExp( search.source, flags ) );
				}
				//throw new Error( 'String.lastIndexOf for RegExp without g flag will loop forever.' );
			}
			
			// js lastIndex is shit
			var tLastIndex = search.lastIndex;
			search.lastIndex = 0;
			while ( (m = search.exec( this )) && m.index <= offset ) {
				last = m;
			}
			search.lastIndex = tLastIndex;

			if ( last ) {
				if ( out ) {
					out.length = last[0].length;
				}
				return last.index;
			}
			return -1;
		}
		else {
			var ret = this.lastIndexOf( search, offset );
			if ( out && ret >= 0 ) {
				out.length = search.length;
			}
			return ret;
		}
	},
	writable: true
} );


/*@UNITESTS*/
Unitest( 'String.lastIndexOfEx()', function ( test ) {

	var r = 'left center right';
	var out = {};
	
	test( r.lastIndexOfEx( 'center' ) == 5 );
	test( r.lastIndexOfEx( 'center', undefined, out ) == 5 && out.length == 6 );
	test( r.lastIndexOfEx( 'center', 5 ) == 5 );
	test( r.lastIndexOfEx( 'center', 4 ) == -1 );

	test( r.lastIndexOfEx( /c[a-z]+r/ ) == 5 );
	test( r.lastIndexOfEx( /c[a-z]+r/, undefined, out ) == 5 && out.length == 6 );
	test( r.lastIndexOfEx( /c[a-z]+r/, 5 ) == 5 );
	test( r.lastIndexOfEx( /c[a-z]+r/, 4 ) == -1 );
	

} );
/*UNITESTS@*/

/**
 * Splits a string on the first occurence of substring.
 * @def function String.splitFirst ( search:string|RegExp )
 * @return object Object will have two properties -
 * 'left', which could be reference to the original string, and 'right' which could be undefined.
 * * Both properties can be empty string.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( String.prototype, 'splitFirst', { 
	value: function ( search ) {
		var ret = { left: this, right: undefined, length: 0 };
		var i = this.indexOfEx( search, undefined, ret );
		if ( i >= 0 ) {
			ret.left = this.substr( 0, i );
			ret.right = this.substr( i + ret.length );
		}
		return ret;
	},
	writable: true
} );


/*@UNITESTS*/
Unitest( 'String.splitFirst()', function ( test ) {

	var r = 'left center right'.splitFirst( ' ' );
	test( r.left == 'left' );
	test( r.right == 'center right' );
	
	var r = ' left center right'.splitFirst( ' ' );
	test( r.left == '' );
	test( r.right == 'left center right' );

	var s = 'leftright';
	var r = s.splitFirst( ' ' );
	test( r.left === s );
	test( s.right === undefined );


	var r = 'left\ncenter right'.splitFirst( /\s/ );
	test( r.left == 'left' );
	test( r.right == 'center right' );


} );
/*UNITESTS@*/

/**
 * Splits a string on the last occurence of substring.
 * @def function String.splitLast ( search:string|RegExp )
 * @return {@see String.splitFirst()}
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( String.prototype, 'splitLast', { 
	value: function ( search ) {

		var ret = { left: this, right: undefined, length: 0 };
		var i = this.lastIndexOfEx( search, undefined, ret );
		if ( i >= 0 ) {
			ret.left = this.substr( 0, i );
			ret.right = this.substr( i + ret.length );
		}
		return ret;

	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'String.splitLast()', function ( test ) {


	var r = 'left center right'.splitLast( ' ' );
	test( r.left == 'left center' );
	test( r.right == 'right' );
	
	var r = 'left center right '.splitLast( ' ' );
	test( r.left == 'left center right' );
	test( r.right == '' );

	var s = 'leftright';
	var r = s.splitLast( ' ' );
	test( r.left === s );
	test( s.right === undefined );



	/*var caught = false;
	try {
		var r = 'left\ncenter right'.splitLast( /\s/ );
	}
	catch ( e ) {
		caught = true;
	}
	test( caught );
	*/
	var r = 'left\ncenter right'.splitLast( /\s/ );
	test( r.left == 'left\ncenter' );
	test( r.right == 'right' );

} );
/*UNITESTS@*/


/**
@def bool function String.startsWith ( searchString:string, position:int = "0" )
@param String to search for.
@param Position in the string where to start the search.
*/
if ( String.prototype.startsWith === undefined ) {
	Object.defineProperty( String.prototype, 'startsWith', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: function ( searchString, position ) {
			position = position || 0;
			if ( this.length < position + searchString.length ) {
				return false;
			}
			return this.indexOf( searchString, position ) === position;
		}
	} );


	/*@UNITESTS*/
	Unitest( 'String.startsWith()', function ( test ) {
		
		test( 'asd_qwe_zxc'.startsWith( 'asd' ) );
		test( !'asd_qwe_zxc'.startsWith( '!asd' ) );
		test( !'asd_qwe_zxc'.startsWith( 'qwe' ) );
		test( 'asd_qwe_zxc'.startsWith( 'qwe', 4 ) );
		test( !'asd_qwe_zxc'.startsWith( 'qwe', 5 ) );
	
	} );
	/*UNITESTS@*/

}


/**
@def bool function String.endsWith ( searchString:string, position:int = "this.length" )
@param String to search for.
@param Treat the string as if it was this long.
*/
if ( String.prototype.endsWith === undefined ) {
	Object.defineProperty( String.prototype, 'endsWith', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: function ( searchString, position ) {
			var len = searchString.length;
			position = position || this.length;
			if ( len > position ) {
				return false;
			}
			return this.slice( position - len, position ) === searchString;
		}
	} );


	/*@UNITESTS*/
	Unitest( 'String.endsWith()', function ( test ) {
		
		test( 'asd_qwe_zxc'.endsWith( 'zxc' ) );
		test( !'asd_qwe_zxc'.endsWith( '!zxc' ) );
		test( !'asd_qwe_zxc'.endsWith( 'qwe' ) );
		test( 'asd_qwe_zxc'.endsWith( 'qwe', 7 ) );
		test( !'asd_qwe_zxc'.endsWith( 'qwe', 6 ) );
	
	} );
	/*UNITESTS@*/

}


/**
 * Counts the occurences of substring in a string.
 * @def function String.count ( search:string )
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
Object.defineProperty( String.prototype, 'count', { 
	value: function ( search ) {
		var ret = 0;
		for ( var i = 0; (i = this.indexOf( search, i )) >= 0; i += search.length ) {
			++ret;
		}
		return ret;
	},
	writable: true
} );

/*@UNITESTS*/
Unitest( 'String.count()', function ( test ) {

	test( 'asd'.count( 'sd' ) == 1 );
	test( 'asd'.count( 's' ) == 1 );
	test( 'asd'.count( 'a' ) == 1 );
	test( 'asaad'.count( 'a' ) == 3 );
	test( 'asaad'.count( 'aa' ) == 1 );
	test( 'aaa'.count( 'a' ) == 3 );
} );
/*UNITESTS@*/
