Prototype
=========
Extensions to the JavaScript standard library for Node.js and browser (the
browser support is in untested state since the library transition to ES6, but
probably still works).

Most notably this module provides better OOP support with classes,
inheritance, mixins and interfaces with no runtime overhead, staying
as close as possible to the native JS syntax.

```
npm install https://github.com/Perennials/prototype-js/tarball/master
```

<!-- MarkdownTOC -->

- [Object](#object)
	- [.merge()](#merge)
	- [.mergeDeep()](#mergedeep)
	- [.duplicate()](#duplicate)
	- [.filter()](#filter)
	- [.instanceof()](#instanceof)
	- [Object.isObject()](#objectisobject)
	- [Object.newArgs()](#objectnewargs)
	- [Object.values()](#objectvalues)
- [Array](#array)
	- [get/set .last](#getset-last)
	- [.duplicate()](#duplicate-1)
	- [.merge()](#merge-1)
	- [.unique()](#unique)
	- [.contains()](#contains)
	- [.containsEx()](#containsex)
	- [.indexOfEx()](#indexofex)
	- [.indexOfEx()](#indexofex-1)
- [Function](#function)
	- [.define()](#define)
	- [.extend()](#extend)
	- [.static()](#static)
	- [.implement()](#implement)
	- [.mixin()](#mixin)
	- [ResolveMixins()](#resolvemixins)
	- [.bindArgsAfter()](#bindargsafter)
	- [.bindArgsBefore()](#bindargsbefore)
- [String](#string)
	- [.indexOfEx()](#indexofex-2)
	- [.lastIndexOfEx()](#lastindexofex)
	- [.splitFirst()](#splitfirst)
	- [.splitLast()](#splitlast)
	- [.startsWith()](#startswith)
	- [.endsWith()](#endswith)
	- [.count()](#count)
	- [.contains()](#contains-1)
	- [.toFirstUpperCase()](#tofirstuppercase)
	- [String.isString()](#stringisstring)
- [Number](#number)
	- [Number.isNumber()](#numberisnumber)
- [Boolean](#boolean)
	- [Boolean.isBoolean()](#booleanisboolean)
- [RegExp](#regexp)
	- [.resetIndex()](#resetindex)
	- [.pushIndex()](#pushindex)
	- [.popIndex()](#popindex)
- [Quick OOP example](#quick-oop-example)
- [TODO](#todo)
- [Authors](#authors)

<!-- /MarkdownTOC -->

Object
------

### .merge()
Copies references of properties from another object to this one.

```js
.merge(
	obj:Object
) : this;
```

### .mergeDeep()
Copies references of properties from another object to this one recusively.
If a property of this object that is not an `Object` is found in the object
to be merged with, the property will be replaced.

```js
.mergeDeep(
	obj:Object
) : this;
```

### .duplicate()
Creates object with duplicates of the properties of this object. This function
works recursively and will call `.duplicate()` for the properties that implement
this function. Objects of custom classes will not be duplicated but passed as
reference.

```js
.duplicate() : Object;
```

### .filter()
Filters out all properties for which the callback is not true. This function
will modify the object in place. While this behaviour is inconsistent, it is
necassary for the function to be able to work on any object without knowledge
how to construct a new instance of the object's class and copy its properties.

```js
.filter(
	callback:function( value:any, key:String, object:Object ),
	thisArg:mixed|undefined
) : this;
```

### .instanceof()
**Experimental.** Checks if the object is instanceof certain class. This
function first tries to use the `instanceof` operator, and if it fails, it
checks the list of implemented interfaces. Therefore this function has
performnace overhead over the `instanceof` operator. See
[.implement()](#implement), [.mixin()](#mixin) and [Quick OOP example](#quick-oop-example).

```js
.instanceof(
	proto:Function
) : Boolean;
```

### Object.isObject()
Checks if the argument is strictly an `Object` and not a subclass of `Object`.

```js
Object.isObject(
	obj:any
) : Boolean;
```

### Object.newArgs()
Creates a new object passing a list of arguments to the constructor.
Credits <http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible>.

This is equivalent to `Function.apply()` but for `new`. So one can invoke `new` on some class with
array list of arguments, e.g.:

```js
// this
Object.newArgs( Array, [ 1, 2 ] );
// is equivalent to this
new Array( 1, 2 );
```

```js
Object.newArgs(
	ctor:Function,
	args:Array
) : Object;
```

### Object.values()
Retrieves the values of all own properties of an object.

```js
Object.values(
	obj:Object
) : String[];
```


Array
-----

### get/set .last
Retrieves or sets the last element of the array.
Returns `undefined` if attempting to get the last element of zero-length array.

Example:

```js
var arr = [ 1, 2 ];
if ( arr.last === 2 ) {
	arr.last = 3;
	// now the array is [ 1, 3 ]
}
```

### .duplicate()
Creates array with duplicates of the items of this array. This function works
recursively and will call `.duplicate()` for the items that implement this
function.

```js
.duplicate() : Array;
```


### .merge()
This is alias for `.concat()`.


### .unique()
Returns a new array containing a uniqie set of the elements of the array.
Meaning if some element appears twice it will be present only once in the
resulting array. Items are compared with `===`.

```js
.unique(
	value:any
) : Boolean;
```


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


Function
--------

### .define()
Defines properties in the prototype of the function. Each property will be
added using `Object.defineProperty()`. The defined properties will be writable
and non-enumerable.

This function was meant for ES5 OOP syntax candy. It should not be used with ES6
since ES6 has native class syntax.

```js
.define(
	properties:Object
) : this;
```

Example:

```js
function MyClass () {
	this._something = null;
}

MyClass.define( {
	getSomething: function () {
		return this._something;
	},

	setSomething: function ( value ) {
		return this._something = value;
	}
} );

var my = new MyClass();
my.setSomething( 5 );
if ( my.getSomething() === 5 ) {
	// true
}
```

### .extend()
Will make functions's prototype to inherit from given parent's prototype and
optionaly define some methods.

This function was meant for ES5 OOP syntax candy. It should not be used with ES6
since ES6 has native class syntax.

```js
.extend(
	baseClass:Function
	props:Object|undefined
) : this;
```

Example:

```js
class MyClass3 {
	consturctor () {
		this._something = null;
	}

	setSomethin ( value ) {
		return this._something = value;
	}
}

function MyClass2 () {

}

MyClass2.extend( MyClass3 );

function MyClass () {

}

MyClass.extend( MyClass2, {
	getSomething: function () {
		return this._something;
	}
} );

var my = new MyClass();
my.setSomething( 5 );
if ( my.getSomething() === 5 ) {
	// true
}
```

### .static()
Defines properties in the the function object itself. Each property will be
added using `Object.defineProperty()`. The defined properties will be writable
and non-enumerable.

This function was meant for ES5 OOP syntax candy. ES6 has native syntax for static
methods, but not for static properties.

```js
.static(
	props:Object
) : this;
```

Example:

```js
function MyClass1 () {

}

class MyClass2 {

}

MyClass1.static( {
	Something: 1
} );

MyClass2.static( {
	Something: 2
} );

if ( MyClass1.Something == MyClass2.Something ) {
	// false
}
```

### .implement()
Enforeces that a class implements certain interface(s) and throws an `Error` if
it does not. This function also makes it possible to use
[Object.instanceof()](#instanceof) to check if an object implements an
interfaces. `.implement()` itself doesn't have runtime overhead - the implementation
check is done only once when the class defined, but `Object.instanceof()` could not
possibly outperform the `instanceof` operator.

Interface in this case is a class (or a function prototype in ES5 terms) or just an
object with properties. The properties of the object or the methods in the prototype
will be checked against the methods of the class that is supposed to implement them.

```js
.implement(
	...iface:Object|Function
) : this;
```

Example:

```js
function ILeggedEarthling () {
}

ILeggedEarthling.define( {
	getLegs: function() {}
} );

class Animal {

}

try {
	Animal.implement( ILeggedEarthling );
}
catch ( e ) {
	// getLegs is not implemented
	console.log( e.toString() );
}
```

### .mixin()
Mixes the prototype of another function into the prototype of this function.
It is also possible to just mixin the properties of an object that is not a
function. The function takes variable number of arguments where the last one may be
[ResolveMixins()](#resolvemixins).

**Experimental:** This function was OK with ES5, but it is not fully clear if
this may affect future code when the JavaScript matures more, or if it may
negatively affect compiler optimisations.

```js
.mixin(
	...proto:Object|Function|ResolveMixins
) : this;
```

Example:

```js
function MyTrait1 () {

}

MyTrait1.define( {
	reusablePiece1: function () {

	};
} );

function MyTrait2 () {

}

MyTrait2.define( {
	reusablePiece2: function () {

	};
} );

class MyClass {

}

MyClass.mixin( MyTrait1, MyTrait2 );
```


### ResolveMixins()
Passed as last argument to [Function.mixin()](#mixin) to resolve conflicts
where different mixins define a function with the same name.

The function accepts single argument where they key is the name of the
conflicting function to be resolved and the value is the preferred mixin to
use the function from.

```js
ResolveMixins(
	resolve:Object
);
```

Example:

```js
// if B and C has method overlappingMember(), the one from B will be used.
A.mixin( B, C, ResolveMixins( { 'overlappingMember': B } ) );
```

### .bindArgsAfter()
Creates a wrapper function that always calls another function with the same
arguments. Bound arguments will be appended to any arguments that the function
is called with.

```js
.bindArgsAfter(
	...args:any
) : Function;
```

Example:

```js
var myLog = console.log.bindArgsAfter( 1 );
// this will print 2 1
myLog.call( console, 2 );
```


### .bindArgsBefore()
Creates a wrapper function that always calls another function with the same arguments.
Bound arguments will be prepended to any arguments that the function is called with.

```js
.bindArgsBefore(
	...args:any
) : Function;
```

Example:

```js
var myLog = console.log.bindArgsBefore( 1 );
// this will print 1 2
myLog.call( console, 2 );
```

String
------

### .indexOfEx()
Extends the built-in `String.indexOf()` with support of `RegExp`.

If the last argument is passed its `.length` property will be populated with
the length of the matched regular expression, because unlike searching for
a static string, the length of the match may be variable.

```js
.indexOfEx(
	search:String|RegExp,
	offset:Number|undefined
	ret:Object|undefined
) : Number;
```

### .lastIndexOfEx()
Extends the built-in `String.lastIndexOf()` with support of `RegExp`.

If the last argument is passed its `.length` property will be populated with
the length of the matched regular expression, because unlike searching for
a static string, the length of the match may be variable.

**Warning:** This function may have significant performance impact. JavaScript
does not support searching matching regular expressions from the end of the
string, so matching will be performed repeatedly on the whole string to find
the last matching position. Therefore use with care, the function is provided
mostly for consistency.

```js
.lastIndexOfEx(
	search:String|RegExp,
	offset:Number|undefined
	ret:Object|undefined
) : Number;
```

### .splitFirst()
Splits a string on the first occurrence of substring.

```js
.splitFirst(
	search:String|RegExp,
	offset:Number|undefined
) : Object;
```

The returned object will look like this, where length can be used
to determine the length of the matched regular expression, if one
is using `RegExp` to search for.

```js
{
	left: String,
	right: String|undefined,
	length: Number
}
```

### .splitLast()
Splits a string on the last occurrence of substring.

```js
.splitLast(
	search:String|RegExp,
	offset:Number|undefined
) : Object;
```

The returned object will look like this, where length can be used
to determine the length of the matched regular expression, if one
is using `RegExp` to search for.

```js
{
	left: String,
	right: String|undefined,
	length: Number
}
```

### .startsWith()
Just a polyfill for `String.startsWith()`, if it is missing.

### .endsWith()
Just a polyfill for `String.endsWith()`, if it is missing.

### .count()
Counts the occurrences of substring in a string.

```js
.count(
	search:String
) : Number;
```

### .contains()
Checks if a substring is contained within the string.

```js
.contains(
	search:String
) : Boolean;
```

### .toFirstUpperCase()
Converts the first letter of the string to upper case and returns the new string.

```js
.toFirstUpperCase() : String;
```

### String.isString()
Checks if argument is a String object or string primitive. This function
checks for both typeof and instanceof. For explanation why this is needed
check [Proper type determination in JavaScript](https://github.com/Perennials/articles/blob/master/Proper-type-determination-in-JavaScript.md)

```js
String.isString(
	obj:any
) : Boolean;
```

Number
------

### Number.isNumber()
Checks if argument is a Number object or number primitive. This function
checks for both typeof and instanceof. For explanation why this is needed
check [Proper type determination in JavaScript](https://github.com/Perennials/articles/blob/master/Proper-type-determination-in-JavaScript.md)

```js
Number.isNumber(
	obj:any
) : Boolean;
```


Boolean
-------

### Boolean.isBoolean()
Checks if argument is a Boolean object or boolean primitive. This function
checks for both typeof and instanceof. For explanation why this is needed
check [Proper type determination in JavaScript](https://github.com/Perennials/articles/blob/master/Proper-type-determination-in-JavaScript.md)

```js
Boolean.isBoolean(
	obj:any
) : Boolean;
```

RegExp
------

### .resetIndex()
Resets the `.lastIndex` property to zero.

```js
.resetIndex() : this;
```

### .pushIndex()
Saves the `.lastIndex` property to an internal stack. Useful for reusing
RegExp object in recursive searches.

```js
.pushIndex() : this;
```

### .popIndex()
Restores the `.lastIndex` property from an internal stack. Useful for reusing
RegExp object in recursive searches.

```js
.popIndex() : this;
```


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

// we use the function (ES5) syntax here to be able to reuse it later,
// because ES6 forbids calling the constructor of a class without new
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