var stringify = require('json-stable-stringify')
  , crypto = require('crypto')

module.exports = function (obj, encoding) {
  return crypto.createHash('sha1').update(stringify(obj)).digest(encoding || 'hex');
};
