// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid, FHIRHelper } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

/**
 * Generated class for shr.core.Range.
 */
class Range {

  /**
   * Get the LowerBound.
   * @returns {LowerBound} The shr.core.LowerBound
   */
  get lowerBound() {
    return this._lowerBound;
  }

  /**
   * Set the LowerBound.
   * @param {LowerBound} lowerBound - The shr.core.LowerBound
   */
  set lowerBound(lowerBound) {
    this._lowerBound = lowerBound;
  }

  /**
   * Set the LowerBound and return 'this' for chaining.
   * @param {LowerBound} lowerBound - The shr.core.LowerBound
   * @returns {Range} this.
   */
  withLowerBound(lowerBound) {
    this.lowerBound = lowerBound; return this;
  }

  /**
   * Get the UpperBound.
   * @returns {UpperBound} The shr.core.UpperBound
   */
  get upperBound() {
    return this._upperBound;
  }

  /**
   * Set the UpperBound.
   * @param {UpperBound} upperBound - The shr.core.UpperBound
   */
  set upperBound(upperBound) {
    this._upperBound = upperBound;
  }

  /**
   * Set the UpperBound and return 'this' for chaining.
   * @param {UpperBound} upperBound - The shr.core.UpperBound
   * @returns {Range} this.
   */
  withUpperBound(upperBound) {
    this.upperBound = upperBound; return this;
  }

  /**
   * Deserializes JSON data to an instance of the Range class.
   * The JSON must be valid against the Range JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {Range} An instance of Range populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.core', 'Range');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the Range class to a JSON object.
   * The JSON is expected to be valid against the Range JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/core/Range' } };
    if (this.lowerBound != null) {
      inst['LowerBound'] = typeof this.lowerBound.toJSON === 'function' ? this.lowerBound.toJSON() : this.lowerBound;
    }
    if (this.upperBound != null) {
      inst['UpperBound'] = typeof this.upperBound.toJSON === 'function' ? this.upperBound.toJSON() : this.upperBound;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the Range class.
   * The FHIR must be valid against the Range FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {Range} An instance of Range populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.core', 'Range');
    const inst = new klass();
    if (fhir['low'] != null) {
      inst.lowerBound = FHIRHelper.createInstanceFromFHIR('shr.core.LowerBound', fhir['low'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['high'] != null) {
      inst.upperBound = FHIRHelper.createInstanceFromFHIR('shr.core.UpperBound', fhir['high'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (asExtension) {
      inst.value = fhir['valueRange'];
    }
    return inst;
  }

}
export default Range;
