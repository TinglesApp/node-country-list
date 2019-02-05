const Country = require('./../index');

[
  {
    country: 'US',
    language: 'en',
    expected: 'United States',
  },
  {
    country: 'DE',
    language: 'en',
    expected: 'Germany',
  },
  {
    country: 'FR',
    language: 'pl',
    expected: 'Francja',
  },
  {
    country: 'FR',
    language: 'non existing',
    expected: undefined,
  },
  {
    country: 'US',
    language: 'zh-hans',
    expected: '美国',
  },
  {
    country: 'US',
    language: 'zh-hant',
    expected: '美國',
  },
  {
    country: 'non existing',
    language: 'en',
    expected: undefined,
  },
  {
    country: 'non existing',
    language: 'non existing',
    expected: undefined,
  },
  {
    country: undefined,
    language: undefined,
    expected: undefined,
  },
].forEach((testCase) => test(`get ${testCase.country} in ${testCase.language}`, () => {
  expect(Country.get(testCase.country, testCase.language)).toEqual(testCase.expected);
}));

test('get non existing country in non existing language', () => {
  expect(Country.get('aa', 'aa')).toBeUndefined();
});
