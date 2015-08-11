(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.praline = mod.exports;
	}
})(this, function (exports) {
	/**	Execute an Array of tasks in parallel.
  *	Tasks are functions, or arrays where the first item is a function and the remainder are arguments to pass it.
  *	All tasks must have Node-style callbacks like `(err, result)`.
  *	@param {array} tasks		Tasks to run in parallel
  *	@param {function} callback	Gets passed `(err, ...results)`
  *
  *	@example
  *		parallel([
  *			taskOne,
  *			[taskTwo, 'arg1', 'arg2'],
  *			cb => cb(null, 'data3')
  *		], (err, t1Result, t2Result, data3) => {
  *			callback(err, { t1Result, t2Result, data3 });
  *		});
  */
	"use strict";

	exports.__esModule = true;
	exports.parallel = parallel;
	exports.sequence = sequence;

	function parallel(funcs, callback) {
		if (funcs.length == 0) return callback(null);
		var c = funcs.length;
		var results = [];
		var done = function done() {
			if (callback) callback.apply(undefined, arguments);
			callback = null;
		};
		funcs.forEach(function (func, i) {
			var args = [];
			if (Array.isArray(func)) {
				args = func.slice();
				func = args.shift();
			}
			args.push(function (err, data) {
				if (err) return done(err);
				results[i] = data;
				if (! --c) done.apply(undefined, [null].concat(results));
			});
			func.apply(undefined, args);
		});
	}

	/**	Execute an Array of tasks in order.
  *	Tasks are functions, or arrays where the first item is a function and the remainder are arguments to pass it.
  *	All tasks must have Node-style callbacks like `(err, result)`.
  *	@param {array} tasks		Tasks to run in sequence
  *	@param {function} callback	Gets passed `(err, ...results)`
  *
  *	@example
  *		sequence([
  *			taskOne,
  *			[taskTwo, 'arg1', 'arg2']
  *		], (err, t1, t2) => {
  *			callback(err, { t1, t2 });
  *		});
  */

	function sequence(funcs, callback) {
		if (funcs.length == 0) return callback(null);
		var i = 0;
		var c = funcs.length;
		var results = [];
		var next = function next() {
			var func = funcs[i++];
			var args = [];
			if (Array.isArray(func)) {
				args = func.slice();
				func = args.shift();
			}
			args.push(function (err, data) {
				if (err) return callback(err);
				results[i - 1] = data;
				if (i < c) next();else callback.apply(undefined, [null].concat(results));
			});
			func.apply(undefined, args);
		};
		next();
	}

	/** Choose your own adventure.
  *	Parallel: `(tasks, callback)`
  *	Sequence: `(true, tasks, callback)`
  */

	exports["default"] = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		if (args.length === 2) return parallel.apply(undefined, args);
		sequence.apply(undefined, args.slice(1));
	};
});
//# sourceMappingURL=data:application/json;base64,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LFVBQVEsa0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNCIiwiZmlsZSI6InByYWxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlx0RXhlY3V0ZSBhbiBBcnJheSBvZiB0YXNrcyBpbiBwYXJhbGxlbC5cbiAqXHRUYXNrcyBhcmUgZnVuY3Rpb25zLCBvciBhcnJheXMgd2hlcmUgdGhlIGZpcnN0IGl0ZW0gaXMgYSBmdW5jdGlvbiBhbmQgdGhlIHJlbWFpbmRlciBhcmUgYXJndW1lbnRzIHRvIHBhc3MgaXQuXG4gKlx0QWxsIHRhc2tzIG11c3QgaGF2ZSBOb2RlLXN0eWxlIGNhbGxiYWNrcyBsaWtlIGAoZXJyLCByZXN1bHQpYC5cbiAqXHRAcGFyYW0ge2FycmF5fSB0YXNrc1x0XHRUYXNrcyB0byBydW4gaW4gcGFyYWxsZWxcbiAqXHRAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1x0R2V0cyBwYXNzZWQgYChlcnIsIC4uLnJlc3VsdHMpYFxuICpcbiAqXHRAZXhhbXBsZVxuICpcdFx0cGFyYWxsZWwoW1xuICpcdFx0XHR0YXNrT25lLFxuICpcdFx0XHRbdGFza1R3bywgJ2FyZzEnLCAnYXJnMiddLFxuICpcdFx0XHRjYiA9PiBjYihudWxsLCAnZGF0YTMnKVxuICpcdFx0XSwgKGVyciwgdDFSZXN1bHQsIHQyUmVzdWx0LCBkYXRhMykgPT4ge1xuICpcdFx0XHRjYWxsYmFjayhlcnIsIHsgdDFSZXN1bHQsIHQyUmVzdWx0LCBkYXRhMyB9KTtcbiAqXHRcdH0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyYWxsZWwoZnVuY3MsIGNhbGxiYWNrKSB7XG5cdGlmIChmdW5jcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuXHRsZXQgYyA9IGZ1bmNzLmxlbmd0aDtcblx0bGV0IHJlc3VsdHMgPSBbXTtcblx0bGV0IGRvbmUgPSAoLi4uYXJncykgPT4ge1xuXHQgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soLi4uYXJncyk7XG5cdCAgY2FsbGJhY2sgPSBudWxsO1xuXHR9O1xuXHRmdW5jcy5mb3JFYWNoKCAoZnVuYywgaSkgPT4ge1xuXHRcdGxldCBhcmdzID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoZnVuYykpIHtcblx0XHRcdGFyZ3MgPSBmdW5jLnNsaWNlKCk7XG5cdFx0XHRmdW5jID0gYXJncy5zaGlmdCgpO1xuXHRcdH1cblx0XHRhcmdzLnB1c2goIChlcnIsIGRhdGEpID0+IHtcblx0XHRcdGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG5cdFx0XHRyZXN1bHRzW2ldID0gZGF0YTtcblx0XHRcdGlmICghLS1jKSBkb25lKG51bGwsIC4uLnJlc3VsdHMpO1xuXHRcdH0pO1xuXHRcdGZ1bmMoLi4uYXJncyk7XG5cdH0pO1xufVxuXG5cbi8qKlx0RXhlY3V0ZSBhbiBBcnJheSBvZiB0YXNrcyBpbiBvcmRlci5cbiAqXHRUYXNrcyBhcmUgZnVuY3Rpb25zLCBvciBhcnJheXMgd2hlcmUgdGhlIGZpcnN0IGl0ZW0gaXMgYSBmdW5jdGlvbiBhbmQgdGhlIHJlbWFpbmRlciBhcmUgYXJndW1lbnRzIHRvIHBhc3MgaXQuXG4gKlx0QWxsIHRhc2tzIG11c3QgaGF2ZSBOb2RlLXN0eWxlIGNhbGxiYWNrcyBsaWtlIGAoZXJyLCByZXN1bHQpYC5cbiAqXHRAcGFyYW0ge2FycmF5fSB0YXNrc1x0XHRUYXNrcyB0byBydW4gaW4gc2VxdWVuY2VcbiAqXHRAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1x0R2V0cyBwYXNzZWQgYChlcnIsIC4uLnJlc3VsdHMpYFxuICpcbiAqXHRAZXhhbXBsZVxuICpcdFx0c2VxdWVuY2UoW1xuICpcdFx0XHR0YXNrT25lLFxuICpcdFx0XHRbdGFza1R3bywgJ2FyZzEnLCAnYXJnMiddXG4gKlx0XHRdLCAoZXJyLCB0MSwgdDIpID0+IHtcbiAqXHRcdFx0Y2FsbGJhY2soZXJyLCB7IHQxLCB0MiB9KTtcbiAqXHRcdH0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVuY2UoZnVuY3MsIGNhbGxiYWNrKSB7XG5cdGlmIChmdW5jcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuXHRsZXQgaSA9IDA7XG5cdGxldCBjID0gZnVuY3MubGVuZ3RoO1xuXHRsZXQgcmVzdWx0cyA9IFtdO1xuXHRsZXQgbmV4dCA9ICgpID0+IHtcblx0XHRsZXQgZnVuYyA9IGZ1bmNzW2krK107XG5cdFx0bGV0IGFyZ3MgPSBbXTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShmdW5jKSkge1xuXHRcdFx0YXJncyA9IGZ1bmMuc2xpY2UoKTtcblx0XHRcdGZ1bmMgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0fVxuXHRcdGFyZ3MucHVzaCggKGVyciwgZGF0YSkgPT4ge1xuXHRcdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cdFx0XHRyZXN1bHRzW2ktMV0gPSBkYXRhO1xuXHRcdFx0aWYgKGk8YykgbmV4dCgpO1xuXHRcdFx0ZWxzZSBjYWxsYmFjayhudWxsLCAuLi5yZXN1bHRzKTtcblx0XHR9KTtcblx0XHRmdW5jKC4uLmFyZ3MpO1xuXHR9O1xuXHRuZXh0KCk7XG59XG5cblxuLyoqIENob29zZSB5b3VyIG93biBhZHZlbnR1cmUuXG4gKlx0UGFyYWxsZWw6IGAodGFza3MsIGNhbGxiYWNrKWBcbiAqXHRTZXF1ZW5jZTogYCh0cnVlLCB0YXNrcywgY2FsbGJhY2spYFxuICovXG5leHBvcnQgZGVmYXVsdCAoLi4uYXJncykgPT4ge1xuXHRpZiAoYXJncy5sZW5ndGg9PT0yKSByZXR1cm4gcGFyYWxsZWwoLi4uYXJncyk7XG5cdHNlcXVlbmNlKC4uLmFyZ3Muc2xpY2UoMSkpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==