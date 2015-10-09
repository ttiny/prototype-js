Prototype
=========
Extensions to the JavaScript standard library for Node.js and browser.

Most notably this module provides better OOP support with classes,
inheritance, mixins and interfaces with no runtime overhead, staying
as close as possible to the native JS syntax.

```
npm install https://github.com/Perennials/prototype-js/tarball/master
```

<!-- MarkdownTOC -->

- [Array](#array)
	- [.duplicate()](#duplicate)
	- [.merge()](#merge)
	- [get/set .last](#getset-last)
	- [.contains()](#contains)
	- [.containsEx()](#containsex)
	- [.unique()](#unique)
	- [.indexOfEx()](#indexofex)
	- [.indexOfEx()](#indexofex-1)
- [Object](#object)
- [Function](#function)
- [String](#string)
- [Number](#number)
- [Boolean](#boolean)
- [RegExp](#regexp)
- [Quick OOP example](#quick-oop-example)
- [TODO](#todo)
- [Authors](#authors)

<!-- /MarkdownTOC -->


## Array


### .duplicate()
Creates array with duplicates of the items of this array. This function works
recursively and will call `.duplicate()` for the items that implement this
function.

```js
.duplicate() : Array;
```


### .merge()
This is alias for `.concat()`.


### get/set .last
Retrieves or sets the last element of the array.
Returns `undefined` if attempting to get the last element of zero-length array.


### .contains()
Checks if the array contains specific value. Uses `.indexOf()` internally.

```js
.contains(
	value:any
) : Boolean;
```


### .containsEx()
Checks if the array contains specific value, possibly with comparison callback.

```js
.contains(
	value:any|function( item:any, index:Number, array:Array )
) : Boolean;
```

### .unique()
Returns a new array containing a uniqie set of the elements of the array.
Meaning if some element appears twice it will be present only once in the
resulting array. Items are compared with `===`.

```js
.unique(
	value:any
) : Boolean;
```

### .indexOfEx()
Searches the array for an element. This is analogous to `.indexOf()`,
except that if the value to search for is a `Function` it will be used
as comparison callback.

```js
.indexOfEx(
	value:any|function( item:any, index:Number, array:Array ):Boolean
	offset:Number|undefined
) : Boolean;
```

### .indexOfEx()
Searches the array for an element backwards. This is analogous to `.lastIndexOf()`,
except that if the value to search for is a `Function` it will be used
as comparison callback.

```js
.lastIndexOfEx(
	value:any|function( item:any, index:Number, array:Array ):Boolean
	offset:Number|undefined
) : Boolean;
```

## Object
WIP

## Function
WIP

## String
WIP

## Number
WIP

## Boolean
WIP

## RegExp
WIP


## Quick OOP example

```js
"use strict";

// this modifies the global built in objects, it does not export anything
// only needs to be included once
require( 'Prototype' );

// classes

class Earthling {

	constructor () {
		this._init = 1;
	}

	getType () {
		return 'Earthling';
	}

}

var earthling = new Earthling();

// inheritance
class Animal extends Earthling {

	constructor () {
		// call the base constructor
		super();

		// call the constructor of the mixin
		TLeggedEarthling.call( this, 5 );
	}
	
	getType () {
		return 'Animal';
		// || we could call the parent method Earthling.prototype.getType.call( this );
	}
}

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

TODO
----

* `Object.cmp()`, `Array.cmp()` (copy from unitest-js)
* `Array.diff()`

Authors
-------

Borislav Peev (borislav.asdf at gmail dot com)