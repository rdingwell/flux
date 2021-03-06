// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

/**
 * Generated class for shr.core.Communication.
 */
class Communication {

  /**
   * Get the Language.
   * @returns {Language} The shr.core.Language
   */
  get language() {
    return this._language;
  }

  /**
   * Set the Language.
   * This field/value is required.
   * @param {Language} language - The shr.core.Language
   */
  set language(language) {
    this._language = language;
  }

  /**
   * Set the Language and return 'this' for chaining.
   * This field/value is required.
   * @param {Language} language - The shr.core.Language
   * @returns {Communication} this.
   */
  withLanguage(language) {
    this.language = language; return this;
  }

  /**
   * Get the Preferred.
   * @returns {Preferred} The shr.core.Preferred
   */
  get preferred() {
    return this._preferred;
  }

  /**
   * Set the Preferred.
   * @param {Preferred} preferred - The shr.core.Preferred
   */
  set preferred(preferred) {
    this._preferred = preferred;
  }

  /**
   * Set the Preferred and return 'this' for chaining.
   * @param {Preferred} preferred - The shr.core.Preferred
   * @returns {Communication} this.
   */
  withPreferred(preferred) {
    this.preferred = preferred; return this;
  }

  /**
   * Get the SpokenLanguageProficiency.
   * @returns {SpokenLanguageProficiency} The shr.core.SpokenLanguageProficiency
   */
  get spokenLanguageProficiency() {
    return this._spokenLanguageProficiency;
  }

  /**
   * Set the SpokenLanguageProficiency.
   * @param {SpokenLanguageProficiency} spokenLanguageProficiency - The shr.core.SpokenLanguageProficiency
   */
  set spokenLanguageProficiency(spokenLanguageProficiency) {
    this._spokenLanguageProficiency = spokenLanguageProficiency;
  }

  /**
   * Set the SpokenLanguageProficiency and return 'this' for chaining.
   * @param {SpokenLanguageProficiency} spokenLanguageProficiency - The shr.core.SpokenLanguageProficiency
   * @returns {Communication} this.
   */
  withSpokenLanguageProficiency(spokenLanguageProficiency) {
    this.spokenLanguageProficiency = spokenLanguageProficiency; return this;
  }

  /**
   * Get the WrittenLanguageProficiency.
   * @returns {WrittenLanguageProficiency} The shr.core.WrittenLanguageProficiency
   */
  get writtenLanguageProficiency() {
    return this._writtenLanguageProficiency;
  }

  /**
   * Set the WrittenLanguageProficiency.
   * @param {WrittenLanguageProficiency} writtenLanguageProficiency - The shr.core.WrittenLanguageProficiency
   */
  set writtenLanguageProficiency(writtenLanguageProficiency) {
    this._writtenLanguageProficiency = writtenLanguageProficiency;
  }

  /**
   * Set the WrittenLanguageProficiency and return 'this' for chaining.
   * @param {WrittenLanguageProficiency} writtenLanguageProficiency - The shr.core.WrittenLanguageProficiency
   * @returns {Communication} this.
   */
  withWrittenLanguageProficiency(writtenLanguageProficiency) {
    this.writtenLanguageProficiency = writtenLanguageProficiency; return this;
  }

  /**
   * Get the LanguageQualifier array.
   * @returns {Array<LanguageQualifier>} The shr.core.LanguageQualifier array
   */
  get languageQualifier() {
    return this._languageQualifier;
  }

  /**
   * Set the LanguageQualifier array.
   * @param {Array<LanguageQualifier>} languageQualifier - The shr.core.LanguageQualifier array
   */
  set languageQualifier(languageQualifier) {
    this._languageQualifier = languageQualifier;
  }

  /**
   * Set the LanguageQualifier array and return 'this' for chaining.
   * @param {Array<LanguageQualifier>} languageQualifier - The shr.core.LanguageQualifier array
   * @returns {Communication} this.
   */
  withLanguageQualifier(languageQualifier) {
    this.languageQualifier = languageQualifier; return this;
  }

  /**
   * Deserializes JSON data to an instance of the Communication class.
   * The JSON must be valid against the Communication JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {Communication} An instance of Communication populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.core', 'Communication');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the Communication class to a JSON object.
   * The JSON is expected to be valid against the Communication JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/core/Communication' } };
    if (this.language != null) {
      inst['Language'] = typeof this.language.toJSON === 'function' ? this.language.toJSON() : this.language;
    }
    if (this.preferred != null) {
      inst['Preferred'] = typeof this.preferred.toJSON === 'function' ? this.preferred.toJSON() : this.preferred;
    }
    if (this.spokenLanguageProficiency != null) {
      inst['SpokenLanguageProficiency'] = typeof this.spokenLanguageProficiency.toJSON === 'function' ? this.spokenLanguageProficiency.toJSON() : this.spokenLanguageProficiency;
    }
    if (this.writtenLanguageProficiency != null) {
      inst['WrittenLanguageProficiency'] = typeof this.writtenLanguageProficiency.toJSON === 'function' ? this.writtenLanguageProficiency.toJSON() : this.writtenLanguageProficiency;
    }
    if (this.languageQualifier != null) {
      inst['LanguageQualifier'] = this.languageQualifier.map(f => f.toJSON());
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the Communication class.
   * The FHIR must be valid against the Communication FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {Communication} An instance of Communication populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.core', 'Communication');
    const inst = new klass();
    return inst;
  }

}
export default Communication;
