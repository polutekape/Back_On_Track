var sig = require('./');

console.log(sig({
  id: 'oi3nfpXp02',
  num: 2,
  sub: {
    obj: true,
    lol: false
  },
  arr: [23, 0]
}));
// 2491cd3eb77052427bfa91dfd6fb2824c5022eca

console.log(sig('carlos'));
// 07043187e80e6cf42d238b0f40fef9b68bb08242

console.log(sig('carlos', 'base64'));
// BwQxh+gObPQtI4sPQP75touwgkI=

console.log(sig('carlos', 'buffer'));
// <SlowBuffer 07 04 31 87 e8 0e 6c f4 2d 23 8b 0f 40 fe f9 b6 8b b0 82 42>
