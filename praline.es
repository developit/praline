
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
export function parallel(funcs, callback) {
	let c = funcs.length;
	if (!c) return callback(null);
	let results = [];
	let done = (...args) => {
		if (callback) callback(...args);
		callback = null;
	};
	funcs.forEach( (func, i) => {
		let args = [];
		if (Array.isArray(func)) {
			args = func.slice();
			func = args.shift();
		}
		args.push( (err, data) => {
			if (err) return done(err);
			results[i] = data;
			if (!--c) done(null, ...results);
		});
		func(...args);
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
export function sequence(funcs, callback) {
	let i = 0;
	let c = funcs.length;
	if (!c) return callback(null);
	let results = [];
	let next = () => {
		let func = funcs[i++];
		let args = [];
		if (Array.isArray(func)) {
			args = func.slice();
			func = args.shift();
		}
		args.push( (err, data) => {
			if (err) return callback(err);
			results[i-1] = data;
			if (i<c) next();
			else callback(null, ...results);
		});
		func(...args);
	};
	next();
}


/** Choose your own adventure.
 *	Parallel: `(tasks, callback)`
 *	Sequence: `(true, tasks, callback)`
 */
export default (...args) => {
	if (args.length===2) return parallel(...args);
	sequence(...args.slice(1));
};
