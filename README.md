Prototype
=========
Extensions to the JavaScript standard library for Node.js and browser.

Most notably this module provides better OOP support with classes,
inheritance, mixins and interfaces with no runtime overhead, staying
as close as possible to the native JS syntax.

The module is documented, unfortunately with docs comments in [jsdocgen](https://github.com/Perennials/jsdocgen)
format, and the JS support there is somehow WIP ...but rather planned.

But there are plenty of examples for the brave. The module is used in production
in several projects.

```
npm install https://github.com/Perennials/prototype-js/tarball/master
```

### Quick OOP example

```js
// this modifies the global built in objects, it does not export anything
// only needs to be included once
require( 'Prototype' );

// classes
function Earthling () {
	this._init = 1;
}

Earthling.define( {

	getType: function () {
		return 'Earthling';
	}

} );

var earthling = new Earthling();

// inheritance
function Animal () {
	// call the base constructor
	Earthling.call( this );

	// call the constructor of the mixin
	TLeggedEarthling.call( this, 5 );
}

Animal.extend( Earthling, {

	getType: function () {
		return 'Animal';
		// || we could call the parent method Earthling.prototype.getType.call( this );
	}

} );

// intefaces (experimental)

function ILeggedEarthling () {
}

ILeggedEarthling.define( {
	getLegs: function() {}
} );

try {
	Animal.implement( ILeggedEarthling );
}
catch ( e ) {
	// getLegs is not implemented
	console.log( e.toString() );
}

// mixins

function TLeggedEarthling ( nlegs ) {
	this._nLegs = nlegs;
}

TLeggedEarthling.define( {
	getLegs: function() {
		return this._nLegs;
	}
} );

Animal.mixin( TLeggedEarthling ).implement( ILeggedEarthling );

// we can mixin multiple mixins
// and we can resolve overlapping functions in mixins.
// this will copy the contants of Templ1 and Templ2
// in the prototype of Animal choosing Templ1.func1 over Templ2.func2
// and choosing Templ2.func2 over Templ1.func2,
// assuming that we had Templ1 and Templ2 with func1 and func2
//
// Animal.mixin( Templ1, Templ2, ResolveMixins( {
// 	func1: Templ1,
// 	func2: Templ2,
// } ) );

var animal = new Animal();

// this will pass
if ( animal instanceof Earthling ) {
	console.log( animal.getType(), 'has', animal.getLegs(), 'legs' );
}

// this will not pass
if ( animal instanceof TLeggedEarthling ) {
	console.error( 'should not happen' );
}

// this will not pass
if ( animal instanceof ILeggedEarthling ) {
	console.error( 'should not happen' );
}

// to check instanceof iterfaces and traits we need to use a hack
// this has runtime performance cost, but should be insignificant
if ( animal.instanceof( ILeggedEarthling ) ) {
	console.log( animal.getType(), 'is legged earthling' );
}

// this also works
if ( animal.instanceof( Earthling ) ) {
	console.log( animal.getType(), 'is', Earthling.prototype.getType.call( animal ) );
}
```

Changelog
---------

### 1.1.1
- Added interface support with `Function.implement()` and `Object.instanceof()`.
- Added improved `Array.map()`.
- Started to keep changelog.

TODO
----

* `String.toCamelCase()` - to make the first letter upper case.
* `Array.indexOf/lastIndexOf(item[,offset][,compare_callback])`
* `Object.mergeDeep()`, `Array.mergeDeep()`
* `Object.cmp()`, `Array.cmp()` (copy from unitest-js)
* `Array.diff()`
* `RegExp.matchRecursive()`
* `RegExp.pushIndex/popIndex()` - sometimes RegExp is buggy and won't reset
  lastIndex for even new strings. This will save the lastIndex and reset it so
  the regexp can be reused safely without losing current position.
* `RegExp.resetIndex()`

