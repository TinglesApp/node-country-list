const fs = require('fs');
const path = require('path');

const countries = {};

/**
 * get country name in given language
 */
class Countries {
  /**
   * validate alpha-2 code
   * @param {string} str
   * @return {string}
   */
  static _toValidAlphaCode(str) {
    const result = (str || '').toUpperCase();
    if (!/^[A-Z]{2}$/.test(result)) {
      return undefined;
    }
    return result;
  }
  /**
   * validate lang code
   * @param {string} str
   * @return {string}
   */
  static _toValidLang(str) {
    const result = (str || '').toLowerCase();
    if (!/^[a-z]{2}$/.test(result)) {
      return undefined;
    }
    return result;
  }
  /**
   * construct path to language file
   * @param {string} lang Alpha-2 language
   * @return {string}
   */
  static _pathToLanguageFile(lang) {
    return path.resolve(__dirname, `countries/${lang}.json`);
  }
  /**
   * read translation file for langauge
   * @param {string} lang Alpha-2 language
   * @return {object}
   */
  static _readFile(lang) {
    if (!/^[a-z]{2}$/.test(lang)) {
      return undefined;
    }
    try {
      const rawData = fs.readFileSync(this._pathToLanguageFile(lang)).toString();
      return JSON.parse(rawData);
    } catch (e) {
      return undefined;
    }
  }
  /**
   * get country code in given language
   * @param {string} code Alpha-2 country code
   * @param {string} lang Alpha-2 language
   * @return {string|undefined}
   */
  static get(code, lang) {
    const countryCode = this._toValidAlphaCode(code);
    const langCode = this._toValidLang(lang);
    if (!countryCode || !langCode) {
      return undefined;
    }
    let translation = countries[langCode];
    if (translation === null) {
      return undefined;
    }
    if (translation === undefined) {
      translation = this._readFile(langCode);
      countries[langCode] = translation || null;
      if (translation === undefined) {
        return undefined;
      }
    }
    return translation[countryCode];
  }
}

module.exports = Countries;
