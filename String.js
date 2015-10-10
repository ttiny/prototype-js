"use strict";

Object.defineProperty( String, 'isString', { 
	value: function ( str ) {
		return typeof str == 'string' || str instanceof String;
	},
	writable: true
} );


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


Object.defineProperty( String.prototype, 'splitFirst', { 
	value: function ( search, offset ) {
		var ret = { left: this, right: undefined, length: 0 };
		var i = this.indexOfEx( search, offset, ret );
		if ( i >= 0 ) {
			ret.left = this.substr( 0, i );
			ret.right = this.substr( i + ret.length );
		}
		return ret;
	},
	writable: true
} );


Object.defineProperty( String.prototype, 'splitLast', { 
	value: function ( search, offset ) {

		var ret = { left: this, right: undefined, length: 0 };
		var i = this.lastIndexOfEx( search, offset, ret );
		if ( i >= 0 ) {
			ret.left = this.substr( 0, i );
			ret.right = this.substr( i + ret.length );
		}
		return ret;

	},
	writable: true
} );



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

}


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
}

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


Object.defineProperty( String.prototype, 'toFirstUpperCase', { 
	value: function ( search ) {
		return this[ 0 ].toUpperCase() + this.slice( 1 );
	},
	writable: true
} );


Object.defineProperty( String.prototype, 'contains', {
	value: String.prototype.includes,
	writable: true
} );

