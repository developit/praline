

function taskOne(callback) {
  setTimeout( λ => {
    callback(null, 'task one data');
    //callback('Some error');
  }, 100);
}

function taskTwo(userid, callback) {
  setTimeout( λ => {
    //callback('some error 2');
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
    args,
    [null,"task one data","task two (some-user) data"]
  );
});
