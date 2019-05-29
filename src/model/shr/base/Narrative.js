// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid, FHIRHelper } from '../../json-helper';

/**
 * Generated class for shr.base.Narrative.
 */
class Narrative {

  /**
   * Get the NarrativeText.
   * @returns {NarrativeText} The shr.base.NarrativeText
   */
  get narrativeText() {
    return this._narrativeText;
  }

  /**
   * Set the NarrativeText.
   * This field/value is required.
   * @param {NarrativeText} narrativeText - The shr.base.NarrativeText
   */
  set narrativeText(narrativeText) {
    this._narrativeText = narrativeText;
  }

  /**
   * Set the NarrativeText and return 'this' for chaining.
   * This field/value is required.
   * @param {NarrativeText} narrativeText - The shr.base.NarrativeText
   * @returns {Narrative} this.
   */
  withNarrativeText(narrativeText) {
    this.narrativeText = narrativeText; return this;
  }

  /**
   * Get the NarrativeQualifier.
   * @returns {NarrativeQualifier} The shr.base.NarrativeQualifier
   */
  get narrativeQualifier() {
    return this._narrativeQualifier;
  }

  /**
   * Set the NarrativeQualifier.
   * This field/value is required.
   * @param {NarrativeQualifier} narrativeQualifier - The shr.base.NarrativeQualifier
   */
  set narrativeQualifier(narrativeQualifier) {
    this._narrativeQualifier = narrativeQualifier;
  }

  /**
   * Set the NarrativeQualifier and return 'this' for chaining.
   * This field/value is required.
   * @param {NarrativeQualifier} narrativeQualifier - The shr.base.NarrativeQualifier
   * @returns {Narrative} this.
   */
  withNarrativeQualifier(narrativeQualifier) {
    this.narrativeQualifier = narrativeQualifier; return this;
  }

  /**
   * Deserializes JSON data to an instance of the Narrative class.
   * The JSON must be valid against the Narrative JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {Narrative} An instance of Narrative populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new Narrative();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the Narrative class to a JSON object.
   * The JSON is expected to be valid against the Narrative JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/base/Narrative' } };
    if (this.narrativeText != null) {
      inst['NarrativeText'] = typeof this.narrativeText.toJSON === 'function' ? this.narrativeText.toJSON() : this.narrativeText;
    }
    if (this.narrativeQualifier != null) {
      inst['NarrativeQualifier'] = typeof this.narrativeQualifier.toJSON === 'function' ? this.narrativeQualifier.toJSON() : this.narrativeQualifier;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the Narrative class.
   * The FHIR must be valid against the Narrative FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {Narrative} An instance of Narrative populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const inst = new Narrative();
    if (fhir['status'] != null) {
      inst.narrativeQualifier = FHIRHelper.createInstanceFromFHIR('shr.base.NarrativeQualifier', fhir['status'], 'code', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['div'] != null) {
      inst.narrativeText = FHIRHelper.createInstanceFromFHIR('shr.base.NarrativeText', fhir['div'], 'xhtml', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (asExtension) {
      const match_3 = fhir['extension'].find(e => e.url == 'http://example.com/fhir/StructureDefinition/shr-base-NarrativeText-extension');
      if (match_3 != null) {
        inst.narrativeText = FHIRHelper.createInstanceFromFHIR('shr.base.NarrativeText', match_3, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
      }
      const match_4 = fhir['extension'].find(e => e.url == 'http://example.com/fhir/StructureDefinition/shr-base-NarrativeQualifier-extension');
      if (match_4 != null) {
        inst.narrativeQualifier = FHIRHelper.createInstanceFromFHIR('shr.base.NarrativeQualifier', match_4, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
      }
    }
    return inst;
  }

}
export default Narrative;
