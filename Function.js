"use strict";

Object.defineProperty( Function.prototype, 'define', { 
	value: function ( prototype ) {
		var proto = this.prototype;
		for ( var i in prototype ) {
			Object.defineProperty( proto, i, { value: prototype[ i ], writable: true } );
		}
		return this;
	},
	writable: true
} );

Object.defineProperty( Function.prototype, 'static', { 
	value: function ( prototype ) {
		for ( var i in prototype ) {
			Object.defineProperty( this, i, { value: prototype[i], writable: true } );
		}
		return this;
	},
	writable: true
} );


Object.defineProperty( Function.prototype, 'extend', { 
	value: function ( parent, prototype ) {
		this.prototype = Object.create( parent.prototype );
		this.define( prototype );
		return this;
	},
	writable: true
} );

function ResolveMixins ( resolve ) {
	if ( !(this instanceof ResolveMixins) ) {
		return new ResolveMixins( resolve );
	}
	this.merge( resolve );
}

(function () {

	var proto__implements = new WeakMap();
	var obj_checkImplementation = function ( proto, clas ) {
		if ( !proto__implements.has( proto ) ) {
			return false;
		}
		
		var __implements = proto__implements.get( proto );
		for ( var i = __implements.length - 1; i >= 0; --i ) {
			if ( clas === __implements[ i ] ) {
				return true;
			}
		}
		return false;
	};

	Object.defineProperty( Object.prototype, 'instanceof', {
		value: function ( clas ) {
			// this crashes if not used with functions, can be fixed but not worth the performance cost
			if ( this instanceof clas ) {
				return true;
			}

			var proto = Object.getPrototypeOf( this );
			
			do {
				if ( obj_checkImplementation( proto, clas ) ) {
					return true;
				}
				proto = Object.getPrototypeOf( proto );
			} while ( proto );

			return false;
		},
		writable: true
	} );
	
	var func_checkImplementation = function ( clas, iface ) {
		var names = Object.getOwnPropertyNames( iface );
		for ( var j = 0, jend = names.length; j < jend; ++j ) {
			var name = names[ j ];
			if ( iface[ name ] instanceof Function &&
			    !(clas[ name ] instanceof Function) ) {

				throw new Error( 'Method "' + name + '" is not implemented' );
			}
		}
	};

	var _markImplemented = function ( obj, proto ) {
		if ( !proto__implements.has( obj.prototype ) ) {
			proto__implements.set( obj.prototype, [] );
		}
		
		var __implements = proto__implements.get( obj.prototype );
		do {
			__implements.push( proto );
			if ( proto.prototype === undefined ) {
				break;
			}
			proto = Object.getPrototypeOf( proto.prototype );
			if ( proto ) {
				proto = proto.constructor;
			}
		} while ( proto );
	};

	Object.defineProperty( Function.prototype, 'implement', {
		value: function () {
			for ( var i = 0, iend = arguments.length; i < iend; ++i ) {
				var proto = arguments[ i ];
				
				_markImplemented( this, proto );

				do {
					func_checkImplementation( this.prototype, proto.prototype || proto );
					// skip built ins
					if ( proto.prototype === undefined ) {
						break;
					}
					proto = Object.getPrototypeOf( proto.prototype );
				} while ( proto );
			}
		},
		writable: true
	} );

	Object.defineProperty( Function.prototype, 'mixin', { 
		value: function () {
			var arglen = arguments.length - 1;
			var resolve;
			if ( arglen > 0 && arguments[ arglen ] instanceof ResolveMixins ) {
				resolve = arguments[ arglen ];
			}
			else {
				++arglen;
			}
			for ( var i = 0; i < arglen; ++i ) {
				var mixin = arguments[ i ];

				_markImplemented( this, mixin );

				var prototype = mixin.prototype || mixin;
				var isProto = ( prototype !== mixin );
				var keys = Object.getOwnPropertyNames( prototype );
				// for ( var key in prototype ) {
				for ( var j = keys.length - 1; j >= 0; --j ) {
					var key = keys[ j ];
					if ( isProto && key === 'constructor' ) {
						continue;
					}
					var value = undefined;
					if ( this.prototype[key] !== undefined ) {
						if ( resolve && resolve[key] !== undefined ) {
							var preffered = resolve[key];
							value = preffered.prototype ? preffered.prototype[ key ] : preffered[ key ];
						}
						if ( !value ) {
							throw new Error( 'Unable to mixin property "' + key + '", it is already defined' );
						}
					}
					else {
						value = prototype[ key ];
					}
					Object.defineProperty( this.prototype, key, { value: value, writable: true } );
				}
			}
			return this;
		},
		writable: true
	} );
})();


(function () {
	var slice = Array.prototype.slice;
	var concat = Array.prototype.concat;
	
	Object.defineProperty( Function.prototype, 'bindArgsAfter', { 
		value: function () {
			var func = this;
			var args = slice.call( arguments );
			return function ( ) {
				return func.apply( this, arguments.length ? concat.call( slice.call( arguments, 0 ), args ) : args );
			};
		},
		writable: true
	} );

	Object.defineProperty( Function.prototype, 'bindArgsBefore', { 
		value: function () {
			var func = this;
			var args = slice.call( arguments );
			return function ( ) {
				return func.apply( this, arguments.length ? concat.call( args, slice.call( arguments, 0 ) ) : args );
			};
		},
		writable: true
	} );

})();


if ( typeof global !== 'undefined' ) {
	global.ResolveMixins = ResolveMixins;
}
else if ( typeof window !== 'undefined' ) {
	window.ResolveMixins = ResolveMixins;
}