sig
===

generate a signature for an object

[![build status](https://secure.travis-ci.org/carlos8f/sig.png)](http://travis-ci.org/carlos8f/sig)

[![NPM](https://nodei.co/npm/sig.png?downloads=true)](https://nodei.co/npm/sig/)

## Usage

`require('sig')` returns a function which takes any type of object, and returns
a signature string, generated from the sha1 of the
[stable JSON representation.](https://github.com/substack/json-stable-stringify)
Optionally you can pass an encoding as the second parameter, which can be `hex`
(default), `binary`, `base64`, or `buffer`.

```js
var sig = require('sig');

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
```

## Upgrading from 0.x

The old version (0.x) of `sig` used a CRC32 implementation which was a
[bad idea](https://github.com/carlos8f/sig/issues/1) and was also about 5x
slower than the newer, crypto-based solution. If you upgrade, be aware that
the 1.x signatures are longer, hex-based (although other encodings can be generated)
and not backwards-compatible with 0.x signatures.

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2013 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2013 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

