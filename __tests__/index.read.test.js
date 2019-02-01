const fs = require('fs');
let readFileSync;

const Country = require('./../index');

/**
 * spy on readFileSync
 */
beforeEach(() => {
  readFileSync = jest.spyOn(fs, 'readFileSync');
});

/**
 * restore readFileSync
 */
afterEach(() => {
  readFileSync.mockRestore();
});

test('do not try to read definitions for invalid language code', () => {
  expect(Country._readFile('zzz')).toBeUndefined();
  expect(readFileSync).toHaveBeenCalledTimes(0);
});

test('cache unknown language codes', () => {
  expect(Country.get('aa', 'aa')).toBeUndefined();
  expect(readFileSync).toHaveBeenCalledTimes(0);
});

test('invalid translation file format', () => {
  readFileSync.mockImplementation(() => 'not valid json');
  expect(Country.get('es', 'en')).toBeUndefined();
  expect(Country.get('es', 'en')).toBeUndefined();
  expect(readFileSync).toHaveBeenCalledTimes(1);
});
