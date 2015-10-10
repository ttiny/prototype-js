"use strict";

(function () {
	// based on the work by Steven Levithan which is no longer available on
	// http://stevenlevithan.com/assets/misc/recursion/matchRecursiveRegExp.js
	var _matchRecursive_cache = {};
	Object.defineProperty( RegExp, 'matchRecursive', {
		value: function ( str, left, right, flags ) {
			var flags = flags || '';
			var global = flags.indexOf( 'g' ) > -1;
			var retext =  '(' + left + ')|' + right;
			if ( _matchRecursive_cache[ retext ] === undefined ) {
				_matchRecursive_cache[ retext ] = {};
			}
			var re = _matchRecursive_cache[ retext ][ flags ];
			var cached = false;
			if ( re ) {
				re.pushIndex();
				re.resetIndex();
				cached = true;
			}
			else {
				re = new RegExp( retext, 'g' + flags );
				_matchRecursive_cache[ retext ][ flags ] = re;
			}
			var ret = [];
			var t, start, m;
			var startm;

			ret:do {
				t = 0;
				while ( m = re.exec( str ) ) {
					if ( m[ 1 ] ) {
						if ( t++ == 0 ) {
							start = re.lastIndex;
							startm = m;
						}
					}
					else if ( t ) {
						if ( --t == 0 ) {
							var match = {
								match: str.slice( startm.index, re.lastIndex ),
								start: startm.index,
								end: re.lastIndex,
							};
							var left = {
								match: startm[ 1 ],
								start: startm.index,
								end: startm.index + startm[ 1 ].length
							};
							var right = {
								match: m[ 2 ],
								start: m.index,
								end: re.lastIndex
							};
							var inner = {
								match: str.slice( left.end, right.start ),
								start: left.end,
								end: right.start
							};
							ret.push( {
								match: match,
								inner: inner,
								left: left,
								right: right
							} );
							if ( global === false ) {
								break ret;
							}
						}
					}
				}
			} while ( t && ( re.lastIndex = start ) );

			if ( cached ) {
				re.popIndex();
			}
			return ret.length > 0 ? ( global ? ret : ret[0] ) : null;
		},
		writable: true
	} );
})();

Object.defineProperty( RegExp.prototype, 'resetIndex', {
	value: function () {
		this.lastIndex = 0;
		return this;
	},
	writable: true
} );

(function () {

	var _indexStack = new WeakMap();
	Object.defineProperty( RegExp.prototype, 'pushIndex', {
		value: function () {
			var stack;
			if ( !_indexStack.has( this ) ) {
				stack = [];
				_indexStack.set( this, stack );
			}
			else {
				 stack = _indexStack.get( this );
			}
			stack.push( this.lastIndex );
			return this;
		},
		writable: true
	} );

	Object.defineProperty( RegExp.prototype, 'popIndex', {
		value: function () {
			this.lastIndex = _indexStack.get( this ).pop() || 0;
			return this;
		},
		writable: true
	} );

})();
