jest.mock('fs');
const fs = require('fs');
fs.readFileSync = jest.fn();

const Country = require('./../index');

test('do not try to read definitions for invalid language code', () => {
  expect(Country._readFile('zzz')).toBeUndefined();
  expect(fs.readFileSync).toHaveBeenCalledTimes(0);
});

test('cache unknown language codes', () => {
  expect(Country.get('aa', 'aa')).toBeUndefined();
  expect(Country.get('aa', 'aa')).toBeUndefined();
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
});
