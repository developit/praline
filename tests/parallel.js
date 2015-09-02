

import { parallel, sequence } from '..';
import { expect } from 'chai';

describe('parallel()', function() {
	it('should call an array of async functions in parallel', done => {
		let calls = [],
			delayedCallback,
			delayedFunction = cb => { calls.push('CALL:A'); delayedCallback = cb; },
			triggerCallback = () => { calls.push('BACK:A'); delayedCallback(null); };

		parallel([
			delayedFunction,
			next => { calls.push('CALL:B'); triggerCallback(); next(null); }
		], err => {
			expect(err).to.not.exist;
			expect(calls)
				.to.be.an('array')
				.and.deep.equal(['CALL:A', 'CALL:B', 'BACK:A']);

			done();
		});
	});

	it('should accept function as [function, ...arguments]', done => {
		let calls = [];
		function asyncFunc(...args) {
			let callback = args.pop();
			calls.push(['func', ...args]);
			callback(null);
		}

		parallel([
			[asyncFunc, 'foo', 'bar'],
			[asyncFunc, 'baz']
		], err => {
			expect(err).to.not.exist;
			expect(calls).to.be.an('array').and.have.length(2);
			expect(calls[0]).to.deep.equal(['func', 'foo', 'bar']);
			expect(calls[1]).to.deep.equal(['func', 'baz']);
			done();
		});
	});

	it('should add each callback argument to the final callback', done => {
		parallel([
			next => next(null, ['foo', 'bar']),
			next => next(null, 'baz')
		], (err, ...results) => {
			expect(err).to.not.exist;
			expect(results).to.be.an('array').and.have.length(2);
			expect(results[0]).to.deep.equal(['foo', 'bar']);
			expect(results[1]).to.deep.equal('baz');
			done();
		});
	});

	it('should report an error for any failed async function', done => {
		parallel([
			next => next(null, 'foo'),
			next => next(null, 'bar'),
			next => next('FAIL')
		], (err, results) => {
			expect(err).to.exist.and.equal('FAIL');
			expect(results).to.not.exist;
			done();
		});
	});
});
