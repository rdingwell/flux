// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid, FHIRHelper } from '../../json-helper';

/**
 * Generated class for shr.base.FindingResult.
 */
class FindingResult {

  /**
   * Get the choice value; one of: shr.core.CodeableConcept, shr.core.Quantity, string, shr.core.Range, shr.core.Ratio, time, dateTime, shr.core.TimePeriod.
   * @returns {(CodeableConcept|Quantity|string|Range|Ratio|time|dateTime|TimePeriod)} The choice value; one of: shr.core.CodeableConcept, shr.core.Quantity, string, shr.core.Range, shr.core.Ratio, time, dateTime, shr.core.TimePeriod
   */
  get value() {
    return this._value;
  }

  /**
   * Set the choice value; one of: shr.core.CodeableConcept, shr.core.Quantity, string, shr.core.Range, shr.core.Ratio, time, dateTime, shr.core.TimePeriod.
   * This field/value is required.
   * @param {(CodeableConcept|Quantity|string|Range|Ratio|time|dateTime|TimePeriod)} value - The choice value; one of: shr.core.CodeableConcept, shr.core.Quantity, string, shr.core.Range, shr.core.Ratio, time, dateTime, shr.core.TimePeriod
   */
  set value(value) {
    this._value = value;
  }

  /**
   * Set the choice value; one of: shr.core.CodeableConcept, shr.core.Quantity, string, shr.core.Range, shr.core.Ratio, time, dateTime, shr.core.TimePeriod and return 'this' for chaining.
   * This field/value is required.
   * @param {(CodeableConcept|Quantity|string|Range|Ratio|time|dateTime|TimePeriod)} value - The choice value; one of: shr.core.CodeableConcept, shr.core.Quantity, string, shr.core.Range, shr.core.Ratio, time, dateTime, shr.core.TimePeriod
   * @returns {FindingResult} this.
   */
  withValue(value) {
    this.value = value; return this;
  }

  /**
   * Deserializes JSON data to an instance of the FindingResult class.
   * The JSON must be valid against the FindingResult JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {FindingResult} An instance of FindingResult populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new FindingResult();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the FindingResult class to a JSON object.
   * The JSON is expected to be valid against the FindingResult JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/base/FindingResult' } };
    if (this.value != null) {
      inst['Value'] = typeof this.value.toJSON === 'function' ? this.value.toJSON() : this.value;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the FindingResult class.
   * The FHIR must be valid against the FindingResult FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {FindingResult} An instance of FindingResult populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const inst = new FindingResult();
    if (asExtension) {
    }
    if (!asExtension && fhir != null) {
      inst.value = FHIRHelper.createInstanceFromFHIR(null, fhir, fhirType, shrId, allEntries, mappedResources, referencesOut);
    }
    return inst;
  }

}
export default FindingResult;
