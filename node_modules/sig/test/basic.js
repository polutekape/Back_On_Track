describe('basic test', function () {
  it('generates sig', function () {
    var obj = {
      id: 'oi3nfpXp02',
      num: 2,
      sub: {
        obj: true,
        lol: false
      },
      arr: [23, 0]
    };
    assert.equal(sig(obj), '2491cd3eb77052427bfa91dfd6fb2824c5022eca');
  });
  it('generates same sig', function () {
    var obj = {
      num: 2,
      sub: {
        lol: false,
        obj: true
      },
      id: 'oi3nfpXp02',
      arr: [23, 0]
    };
    assert.equal(sig(obj), '2491cd3eb77052427bfa91dfd6fb2824c5022eca');
  });
  it('generates for string', function () {
    assert.equal(sig('0293029u3029302983502983502305820v0809z09g802930283jj;ka;dkfjalkejfoaef092305982035023'), 'e3e32ddc88b8cc748c6b5d9155d0fe6d13bb6514');
  });
  it('generates for null', function () {
    assert.equal(sig({z: null}), '05f65640aa6a730185706d2f661b015084e858e2');
  });
});
