### 1.9.0
- Added `Array.indexOfEx()` and `Array.lastIndexOfEx()`.
- Added `static RegExp.matchRecursive()`, `RegExp.pushIndex()`, `RegExp.popIndex()`, `RegExp.resetIndex()`.
- Removed the use of some "hidden" dynamic properties in favour of private `WeakMap`s, requiring more `ES6`.

### 1.8.0
-  **Breaking:** Removed `Array.map( String )` since ES6 has arrow functions which make this not so necessary.

### 1.7.0
- Added `Array.unique()`.

### 1.6.0
- Added `String.contains()`.
- Added `Array.contains()`.

### 1.5.2
- Fix `Object.newArgs()` with ES6 classes.
- **Breaking:** `Object.newArgs()` will always return an instance of the
  constructor, even if it has return statement inside. This behaviour is
  different from the ES5 compatible implementation.

### 1.5.1
- Fix `Object.mergeDeep()` when the a matching key to be merged is not an Object.

### 1.5.0
-  **Breaking:** Changed the behaviour of `Object.duplicate()`. It will not attempt to
  duplicate arbitrary objects anymore, only strictly `Object`.

### 1.4.0
-  **Breaking:** Require Node.js >= 4.0.0 or compatibles set of ES6 features.
- Rename `Function.defineStatic()` to `Function.static()`.

### 1.3.0
- Added `Object.mergeDeep()`.

### 1.2.0
- Added `String.toFirstUpperCase()`.

### 1.1.3
- Removed `Function.bind()` JS implementation which was causing problems in some cases with node-inspector.

### 1.1.2
- Minor internal fixes.

### 1.1.1
- Added interface support with `Function.implement()` and `Object.instanceof()`.
- Added improved `Array.map()`.
- Started to keep changelog.