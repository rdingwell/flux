// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

/**
 * Generated class for shr.core.GroupCharacteristic.
 */
class GroupCharacteristic {

  /**
   * Get the Code.
   * @returns {Code} The shr.core.Code
   */
  get code() {
    return this._code;
  }

  /**
   * Set the Code.
   * This field/value is required.
   * @param {Code} code - The shr.core.Code
   */
  set code(code) {
    this._code = code;
  }

  /**
   * Set the Code and return 'this' for chaining.
   * This field/value is required.
   * @param {Code} code - The shr.core.Code
   * @returns {GroupCharacteristic} this.
   */
  withCode(code) {
    this.code = code; return this;
  }

  /**
   * Get the GroupCharacteristicValue.
   * @returns {GroupCharacteristicValue} The shr.core.GroupCharacteristicValue
   */
  get groupCharacteristicValue() {
    return this._groupCharacteristicValue;
  }

  /**
   * Set the GroupCharacteristicValue.
   * @param {GroupCharacteristicValue} groupCharacteristicValue - The shr.core.GroupCharacteristicValue
   */
  set groupCharacteristicValue(groupCharacteristicValue) {
    this._groupCharacteristicValue = groupCharacteristicValue;
  }

  /**
   * Set the GroupCharacteristicValue and return 'this' for chaining.
   * @param {GroupCharacteristicValue} groupCharacteristicValue - The shr.core.GroupCharacteristicValue
   * @returns {GroupCharacteristic} this.
   */
  withGroupCharacteristicValue(groupCharacteristicValue) {
    this.groupCharacteristicValue = groupCharacteristicValue; return this;
  }

  /**
   * Get the ExcludeFlag.
   * @returns {ExcludeFlag} The shr.core.ExcludeFlag
   */
  get excludeFlag() {
    return this._excludeFlag;
  }

  /**
   * Set the ExcludeFlag.
   * This field/value is required.
   * @param {ExcludeFlag} excludeFlag - The shr.core.ExcludeFlag
   */
  set excludeFlag(excludeFlag) {
    this._excludeFlag = excludeFlag;
  }

  /**
   * Set the ExcludeFlag and return 'this' for chaining.
   * This field/value is required.
   * @param {ExcludeFlag} excludeFlag - The shr.core.ExcludeFlag
   * @returns {GroupCharacteristic} this.
   */
  withExcludeFlag(excludeFlag) {
    this.excludeFlag = excludeFlag; return this;
  }

  /**
   * Get the TimePeriod.
   * @returns {TimePeriod} The shr.core.TimePeriod
   */
  get timePeriod() {
    return this._timePeriod;
  }

  /**
   * Set the TimePeriod.
   * @param {TimePeriod} timePeriod - The shr.core.TimePeriod
   */
  set timePeriod(timePeriod) {
    this._timePeriod = timePeriod;
  }

  /**
   * Set the TimePeriod and return 'this' for chaining.
   * @param {TimePeriod} timePeriod - The shr.core.TimePeriod
   * @returns {GroupCharacteristic} this.
   */
  withTimePeriod(timePeriod) {
    this.timePeriod = timePeriod; return this;
  }

  /**
   * Deserializes JSON data to an instance of the GroupCharacteristic class.
   * The JSON must be valid against the GroupCharacteristic JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {GroupCharacteristic} An instance of GroupCharacteristic populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.core', 'GroupCharacteristic');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the GroupCharacteristic class to a JSON object.
   * The JSON is expected to be valid against the GroupCharacteristic JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/core/GroupCharacteristic' } };
    if (this.code != null) {
      inst['Code'] = typeof this.code.toJSON === 'function' ? this.code.toJSON() : this.code;
    }
    if (this.groupCharacteristicValue != null) {
      inst['GroupCharacteristicValue'] = typeof this.groupCharacteristicValue.toJSON === 'function' ? this.groupCharacteristicValue.toJSON() : this.groupCharacteristicValue;
    }
    if (this.excludeFlag != null) {
      inst['ExcludeFlag'] = typeof this.excludeFlag.toJSON === 'function' ? this.excludeFlag.toJSON() : this.excludeFlag;
    }
    if (this.timePeriod != null) {
      inst['TimePeriod'] = typeof this.timePeriod.toJSON === 'function' ? this.timePeriod.toJSON() : this.timePeriod;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the GroupCharacteristic class.
   * The FHIR must be valid against the GroupCharacteristic FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {GroupCharacteristic} An instance of GroupCharacteristic populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.core', 'GroupCharacteristic');
    const inst = new klass();
    return inst;
  }

}
export default GroupCharacteristic;
