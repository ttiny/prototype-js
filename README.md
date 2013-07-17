Prototype
=========
Extensions to the JavaScript standard library for Node.js and browser.

```
npm install https://github.com/Perennials/prototype-js/tarball/master
```

TODO
----

* `Array.indexOf/lastIndexOf(item[,offset][,compare_callback])`
* `Object.mergeDeep()`, `Array.mergeDeep()`
* `RegExp.matchRecursive()`
* `RegExp.pushIndex/popIndex()` - sometimes RegExp is buggy and won't reset lastIndex for even new strings.
This will save the lastIndex and reset it so the regexp can be reused safely without losing current position.
* `RegExp.resetIndex()`
