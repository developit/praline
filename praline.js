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
 */"use strict";exports.__esModule = true;exports.parallel = parallel;exports.sequence = sequence;function parallel(funcs,callback){var c=funcs.length;if(!c)return callback(null);var results=[];var done=function done(){if(callback)callback.apply(undefined,arguments);callback = null;};funcs.forEach(function(func,i){var args=[];if(Array.isArray(func)){args = func.slice();func = args.shift();}args.push(function(err,data){if(err)return done(err);results[i] = data;if(! --c)done.apply(undefined,[null].concat(results));});func.apply(undefined,args);});} /**	Execute an Array of tasks in order.
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
 */function sequence(funcs,callback){var i=0;var c=funcs.length;if(!c)return callback(null);var results=[];var next=function next(){var func=funcs[i++];var args=[];if(Array.isArray(func)){args = func.slice();func = args.shift();}args.push(function(err,data){if(err)return callback(err);results[i - 1] = data;if(i < c)next();else callback.apply(undefined,[null].concat(results));});func.apply(undefined,args);};next();} /** Choose your own adventure.
 *	Parallel: `(tasks, callback)`
 *	Sequence: `(true, tasks, callback)`
 */exports["default"] = function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}if(args.length === 2)return parallel.apply(undefined,args);sequence.apply(undefined,args.slice(1));};
//# sourceMappingURL=praline.js.map