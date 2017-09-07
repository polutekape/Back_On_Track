var sig = require('./')
  , started = new Date()
  , iterations = process.argv[2] || 100000

for (var i = 0; i < iterations; i++) {
  sig({here: {we: {go: ['with', 'the', 'benchmark']}}, testing: [1, 2, 3, 4]});
}

console.log('completed', iterations, 'iterations in', new Date().getTime() - started.getTime(), 'ms');
