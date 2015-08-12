import assert from 'assert';
import { parallel, sequence } from '../praline.es';

function taskOne(callback) {
	setTimeout( λ => {
		callback(null, 'task one data');
	}, 100);
}

function taskTwo(userid, callback) {
	setTimeout( λ => {
		callback(null, `task two (${userid}) data`);
	}, 500);
}


function test(callback) {
	parallel([
		taskOne,
		[taskTwo, 'some-user']
	], callback);
}


test( (...args) => {
	console.log(args);
	assert.equal(
		args+'',
		[null,"task one data","task two (some-user) data"]+''
	);

	console.log('Tests passed.');
	process.exit(0);
});
