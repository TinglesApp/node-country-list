const fs = require('fs');
const path = require('path');

// cache all available translations at startup
const availableTranslations = fs
  .readdirSync(path.resolve(__dirname, 'countries/'))
  .map((file) => path.basename(file, '.json'));
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
   * test if str is language that is available for translation
   * @param {string} str
   * @return {boolean}
   */
  static _isLangTranslated(str) {
    return availableTranslations.indexOf(str) !== -1;
  }
  /**
   * validate lang code
   * @param {string} str
   * @return {string}
   */
  static _toValidLang(str) {
    const result = (str || '').toLowerCase();
    if (!this._isLangTranslated(result)) {
      return undefined;
    }
    return result;
  }
  /**
   * construct path to language file
   * @param {string} lang starting with Alpha-2 language with optional script like zh-hans
   * @return {string}
   */
  static _pathToLanguageFile(lang) {
    return path.resolve(__dirname, `countries/${lang}.json`);
  }
  /**
   * read translation file for language
   * @param {string} lang starting with Alpha-2 language with optional script like zh-hans
   * @return {object}
   */
  static _readFile(lang) {
    if (!this._isLangTranslated(lang)) {
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
   * @param {string} lang starting with Alpha-2 language with optional script like zh-hans
   * @return {string|undefined}
   */
  static get(code, lang) {
    const countryCode = this._toValidAlphaCode(code);
    const langCode = this._toValidLang(lang);
    if (!countryCode || !langCode) {
      return undefined;
    }
    let translation = countries[`${langCode}`];
    if (translation === null) {
      return undefined;
    }
    if (translation === undefined) {
      translation = this._readFile(langCode);
      countries[`${langCode}`] = translation || null;
      if (translation === undefined) {
        return undefined;
      }
    }
    return translation[`${countryCode}`];
  }
}

module.exports = Countries;
