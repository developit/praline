praline
=======

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
