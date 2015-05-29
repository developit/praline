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
		var c = funcs.length;
		var results = [];
		var done = function done() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			if (callback) callback.apply(undefined, args);
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
				results[i] = data;
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
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		if (args.length === 2) return parallel.apply(undefined, args);
		sequence.apply(undefined, args.slice(1));
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByYWxpbmUuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQmdCLFFBQVEsR0FBUixRQUFRO1NBcUNSLFFBQVEsR0FBUixRQUFROztBQXJDakIsVUFBUyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUN6QyxNQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ3JCLE1BQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixNQUFJLElBQUksR0FBRyxTQUFQLElBQUksR0FBZ0I7cUNBQVQsSUFBSTtBQUFKLFFBQUk7OztBQUNqQixPQUFJLFFBQVEsRUFBRSxRQUFRLGtCQUFJLElBQUksQ0FBQyxDQUFDO0FBQ2hDLFdBQVEsR0FBRyxJQUFJLENBQUM7R0FDakIsQ0FBQztBQUNGLE9BQUssQ0FBQyxPQUFPLENBQUUsVUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFLO0FBQzNCLE9BQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNkLE9BQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN4QixRQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3BCLFFBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEI7QUFDRCxPQUFJLENBQUMsSUFBSSxDQUFFLFVBQUMsR0FBRyxFQUFFLElBQUksRUFBSztBQUN6QixRQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixXQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFFBQUksRUFBQyxFQUFFLENBQUMsRUFBRSxJQUFJLG1CQUFDLElBQUksU0FBSyxPQUFPLEVBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFJLGtCQUFJLElBQUksQ0FBQyxDQUFDO0dBQ2QsQ0FBQyxDQUFDO0VBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJNLFVBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDekMsTUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsTUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNyQixNQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBSSxJQUFJLEdBQUcsU0FBUCxJQUFJLEdBQVM7QUFDaEIsT0FBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEIsT0FBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsT0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3hCLFFBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDcEIsUUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQjtBQUNELE9BQUksQ0FBQyxJQUFJLENBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFLO0FBQ3pCLFFBQUksR0FBRyxFQUFFLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLFdBQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbEIsUUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEtBQ1gsUUFBUSxtQkFBQyxJQUFJLFNBQUssT0FBTyxFQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0FBQ0gsT0FBSSxrQkFBSSxJQUFJLENBQUMsQ0FBQztHQUNkLENBQUM7QUFDRixNQUFJLEVBQUUsQ0FBQztFQUNQOzs7Ozs7O3NCQU9jLFlBQWE7cUNBQVQsSUFBSTtBQUFKLE9BQUk7OztBQUN0QixNQUFJLElBQUksQ0FBQyxNQUFNLEtBQUcsQ0FBQyxFQUFFLE9BQU8sUUFBUSxrQkFBSSxJQUFJLENBQUMsQ0FBQztBQUM5QyxVQUFRLGtCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQiIsImZpbGUiOiJwcmFsaW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcdEV4ZWN1dGUgYW4gQXJyYXkgb2YgdGFza3MgaW4gcGFyYWxsZWwuXG4gKlx0VGFza3MgYXJlIGZ1bmN0aW9ucywgb3IgYXJyYXlzIHdoZXJlIHRoZSBmaXJzdCBpdGVtIGlzIGEgZnVuY3Rpb24gYW5kIHRoZSByZW1haW5kZXIgYXJlIGFyZ3VtZW50cyB0byBwYXNzIGl0LlxuICpcdEFsbCB0YXNrcyBtdXN0IGhhdmUgTm9kZS1zdHlsZSBjYWxsYmFja3MgbGlrZSBgKGVyciwgcmVzdWx0KWAuXG4gKlx0QHBhcmFtIHthcnJheX0gdGFza3NcdFx0VGFza3MgdG8gcnVuIGluIHBhcmFsbGVsXG4gKlx0QHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcdEdldHMgcGFzc2VkIGAoZXJyLCAuLi5yZXN1bHRzKWBcbiAqXG4gKlx0QGV4YW1wbGVcbiAqXHRcdHBhcmFsbGVsKFtcbiAqXHRcdFx0dGFza09uZSxcbiAqXHRcdFx0W3Rhc2tUd28sICdhcmcxJywgJ2FyZzInXSxcbiAqXHRcdFx0Y2IgPT4gY2IobnVsbCwgJ2RhdGEzJylcbiAqXHRcdF0sIChlcnIsIHQxUmVzdWx0LCB0MlJlc3VsdCwgZGF0YTMpID0+IHtcbiAqXHRcdFx0Y2FsbGJhY2soZXJyLCB7IHQxUmVzdWx0LCB0MlJlc3VsdCwgZGF0YTMgfSk7XG4gKlx0XHR9KTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmFsbGVsKGZ1bmNzLCBjYWxsYmFjaykge1xuXHRsZXQgYyA9IGZ1bmNzLmxlbmd0aDtcblx0bGV0IHJlc3VsdHMgPSBbXTtcblx0bGV0IGRvbmUgPSAoLi4uYXJncykgPT4ge1xuXHQgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soLi4uYXJncyk7XG5cdCAgY2FsbGJhY2sgPSBudWxsO1xuXHR9O1xuXHRmdW5jcy5mb3JFYWNoKCAoZnVuYywgaSkgPT4ge1xuXHRcdGxldCBhcmdzID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoZnVuYykpIHtcblx0XHRcdGFyZ3MgPSBmdW5jLnNsaWNlKCk7XG5cdFx0XHRmdW5jID0gYXJncy5zaGlmdCgpO1xuXHRcdH1cblx0XHRhcmdzLnB1c2goIChlcnIsIGRhdGEpID0+IHtcblx0XHRcdGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG5cdFx0XHRyZXN1bHRzW2ldID0gZGF0YTtcblx0XHRcdGlmICghLS1jKSBkb25lKG51bGwsIC4uLnJlc3VsdHMpO1xuXHRcdH0pO1xuXHRcdGZ1bmMoLi4uYXJncyk7XG5cdH0pO1xufVxuXG5cbi8qKlx0RXhlY3V0ZSBhbiBBcnJheSBvZiB0YXNrcyBpbiBvcmRlci5cbiAqXHRUYXNrcyBhcmUgZnVuY3Rpb25zLCBvciBhcnJheXMgd2hlcmUgdGhlIGZpcnN0IGl0ZW0gaXMgYSBmdW5jdGlvbiBhbmQgdGhlIHJlbWFpbmRlciBhcmUgYXJndW1lbnRzIHRvIHBhc3MgaXQuXG4gKlx0QWxsIHRhc2tzIG11c3QgaGF2ZSBOb2RlLXN0eWxlIGNhbGxiYWNrcyBsaWtlIGAoZXJyLCByZXN1bHQpYC5cbiAqXHRAcGFyYW0ge2FycmF5fSB0YXNrc1x0XHRUYXNrcyB0byBydW4gaW4gc2VxdWVuY2VcbiAqXHRAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1x0R2V0cyBwYXNzZWQgYChlcnIsIC4uLnJlc3VsdHMpYFxuICpcbiAqXHRAZXhhbXBsZVxuICpcdFx0c2VxdWVuY2UoW1xuICpcdFx0XHR0YXNrT25lLFxuICpcdFx0XHRbdGFza1R3bywgJ2FyZzEnLCAnYXJnMiddXG4gKlx0XHRdLCAoZXJyLCB0MSwgdDIpID0+IHtcbiAqXHRcdFx0Y2FsbGJhY2soZXJyLCB7IHQxLCB0MiB9KTtcbiAqXHRcdH0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVuY2UoZnVuY3MsIGNhbGxiYWNrKSB7XG5cdGxldCBpID0gMDtcblx0bGV0IGMgPSBmdW5jcy5sZW5ndGg7XG5cdGxldCByZXN1bHRzID0gW107XG5cdGxldCBuZXh0ID0gKCkgPT4ge1xuXHRcdGxldCBmdW5jID0gZnVuY3NbaSsrXTtcblx0XHRsZXQgYXJncyA9IFtdO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGZ1bmMpKSB7XG5cdFx0XHRhcmdzID0gZnVuYy5zbGljZSgpO1xuXHRcdFx0ZnVuYyA9IGFyZ3Muc2hpZnQoKTtcblx0XHR9XG5cdFx0YXJncy5wdXNoKCAoZXJyLCBkYXRhKSA9PiB7XG5cdFx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcblx0XHRcdHJlc3VsdHNbaV0gPSBkYXRhO1xuXHRcdFx0aWYgKGk8YykgbmV4dCgpO1xuXHRcdFx0ZWxzZSBjYWxsYmFjayhudWxsLCAuLi5yZXN1bHRzKTtcblx0XHR9KTtcblx0XHRmdW5jKC4uLmFyZ3MpO1xuXHR9O1xuXHRuZXh0KCk7XG59XG5cblxuLyoqIENob29zZSB5b3VyIG93biBhZHZlbnR1cmUuXG4gKlx0UGFyYWxsZWw6IGAodGFza3MsIGNhbGxiYWNrKWBcbiAqXHRTZXF1ZW5jZTogYCh0cnVlLCB0YXNrcywgY2FsbGJhY2spYFxuICovXG5leHBvcnQgZGVmYXVsdCAoLi4uYXJncykgPT4ge1xuXHRpZiAoYXJncy5sZW5ndGg9PT0yKSByZXR1cm4gcGFyYWxsZWwoLi4uYXJncyk7XG5cdHNlcXVlbmNlKC4uLmFyZ3Muc2xpY2UoMSkpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==