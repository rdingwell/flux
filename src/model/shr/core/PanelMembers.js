// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

/**
 * Generated class for shr.core.PanelMembers.
 */
class PanelMembers {

  /**
   * Get the shr.core.Observation reference array.
   * @returns {Array<Reference>} The shr.core.Observation reference array
   */
  get observation() {
    return this._observation;
  }

  /**
   * Set the shr.core.Observation reference array.
   * @param {Array<Reference>} observation - The shr.core.Observation reference array
   */
  set observation(observation) {
    this._observation = observation;
  }

  /**
   * Set the shr.core.Observation reference array and return 'this' for chaining.
   * @param {Array<Reference>} observation - The shr.core.Observation reference array
   * @returns {PanelMembers} this.
   */
  withObservation(observation) {
    this.observation = observation; return this;
  }

  /**
   * Deserializes JSON data to an instance of the PanelMembers class.
   * The JSON must be valid against the PanelMembers JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {PanelMembers} An instance of PanelMembers populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.core', 'PanelMembers');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the PanelMembers class to a JSON object.
   * The JSON is expected to be valid against the PanelMembers JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/core/PanelMembers' } };
    if (this.observation != null) {
      inst['Observation'] = this.observation.map(f => f.toJSON());
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the PanelMembers class.
   * The FHIR must be valid against the PanelMembers FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {PanelMembers} An instance of PanelMembers populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.core', 'PanelMembers');
    const inst = new klass();
    return inst;
  }

}
export default PanelMembers;
