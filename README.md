praline [![NPM][npm-version-image]][npm-url] [![Bower][bower-image]][bower-url] [![Downloads][npm-downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]
=======

[![Greenkeeper badge](https://badges.greenkeeper.io/developit/praline.svg)](https://greenkeeper.io/)

> Parallel task wrapper for Node-style callbacks

Tasks are functions, or arrays where the first item is a function and the remainder are arguments to pass it.
All tasks must have Node-style callbacks like `(err, result)`.


---

# `parallel()`
Execute an Array of tasks in parallel.

> `tasks` - Array of tasks to run in parallel
>
> `callback` - Gets called on completion `(err, ...results)`

```js
parallel([
	taskOne,
	[taskTwo, 'arg1', 'arg2'],
	cb => cb(null, 'data3')
], (err, t1Result, t2Result, data3) => {
	callback(err, { t1Result, t2Result, data3 });
});
```

# `sequence()`
Execute an Array of tasks in order.

> `tasks` - Array of tasks to run in order
>
> `callback` - Gets called on completion `(err, ...results)`

```js
sequence([
	taskOne,
	[taskTwo, 'arg1', 'arg2']
], (err, t1, t2) => {
	callback(err, { t1, t2 });
});
```

---

License
-------

MIT


[npm-url]: https://npmjs.org/package/praline
[bower-url]: http://bower.io/search/?q=praline
[travis-url]: http://travis-ci.org/developit/praline
[npm-version-image]: http://img.shields.io/npm/v/praline.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/praline.svg?style=flat-square
[bower-image]: https://img.shields.io/bower/v/praline.svg?style=flat-square
[travis-image]: http://img.shields.io/travis/developit/praline.svg?style=flat-square
