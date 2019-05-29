// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid, FHIRHelper } from '../json-helper';

import CodedNonIndependentFinding from '../shr/base/CodedNonIndependentFinding';

/**
 * Generated class for brca.MitoticCountScore.
 * @extends CodedNonIndependentFinding
 */
class MitoticCountScore extends CodedNonIndependentFinding {

  /**
   * Get the FindingResult.
   * @returns {FindingResult} The shr.base.FindingResult
   */
  get findingResult() {
    return this._findingResult;
  }

  /**
   * Set the FindingResult.
   * @param {FindingResult} findingResult - The shr.base.FindingResult
   */
  set findingResult(findingResult) {
    this._findingResult = findingResult;
  }

  /**
   * Set the FindingResult and return 'this' for chaining.
   * @param {FindingResult} findingResult - The shr.base.FindingResult
   * @returns {MitoticCountScore} this.
   */
  withFindingResult(findingResult) {
    this.findingResult = findingResult; return this;
  }

  /**
   * Get the ExceptionValue.
   * @returns {ExceptionValue} The shr.base.ExceptionValue
   */
  get exceptionValue() {
    return this._exceptionValue;
  }

  /**
   * Set the ExceptionValue.
   * @param {ExceptionValue} exceptionValue - The shr.base.ExceptionValue
   */
  set exceptionValue(exceptionValue) {
    this._exceptionValue = exceptionValue;
  }

  /**
   * Set the ExceptionValue and return 'this' for chaining.
   * @param {ExceptionValue} exceptionValue - The shr.base.ExceptionValue
   * @returns {MitoticCountScore} this.
   */
  withExceptionValue(exceptionValue) {
    this.exceptionValue = exceptionValue; return this;
  }

  /**
   * Deserializes JSON data to an instance of the MitoticCountScore class.
   * The JSON must be valid against the MitoticCountScore JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {MitoticCountScore} An instance of MitoticCountScore populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new MitoticCountScore();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the MitoticCountScore class to a JSON object.
   * The JSON is expected to be valid against the MitoticCountScore JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/brca/MitoticCountScore' } };
    if (this.narrative != null) {
      inst['Narrative'] = typeof this.narrative.toJSON === 'function' ? this.narrative.toJSON() : this.narrative;
    }
    if (this.language != null) {
      inst['Language'] = typeof this.language.toJSON === 'function' ? this.language.toJSON() : this.language;
    }
    if (this.metadata != null) {
      inst['Metadata'] = typeof this.metadata.toJSON === 'function' ? this.metadata.toJSON() : this.metadata;
    }
    if (this.findingResult != null) {
      inst['FindingResult'] = typeof this.findingResult.toJSON === 'function' ? this.findingResult.toJSON() : this.findingResult;
    }
    if (this.findingTopicCode != null) {
      inst['FindingTopicCode'] = typeof this.findingTopicCode.toJSON === 'function' ? this.findingTopicCode.toJSON() : this.findingTopicCode;
    }
    if (this.exceptionValue != null) {
      inst['ExceptionValue'] = typeof this.exceptionValue.toJSON === 'function' ? this.exceptionValue.toJSON() : this.exceptionValue;
    }
    if (this.referenceRange != null) {
      inst['ReferenceRange'] = typeof this.referenceRange.toJSON === 'function' ? this.referenceRange.toJSON() : this.referenceRange;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the MitoticCountScore class.
   * The FHIR must be valid against the MitoticCountScore FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {MitoticCountScore} An instance of MitoticCountScore populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const inst = new MitoticCountScore();
    if (fhir['meta'] != null) {
      if (fhir['meta']['versionId'] != null) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.base.Metadata', {}, null, shrId);
        inst.metadata.versionId = FHIRHelper.createInstanceFromFHIR('shr.core.VersionId', fhir['meta']['versionId'], 'id', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir['meta']['lastUpdated'] != null) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.base.Metadata', {}, null, shrId);
        inst.metadata.lastUpdated = FHIRHelper.createInstanceFromFHIR('shr.base.LastUpdated', fhir['meta']['lastUpdated'], 'instant', shrId, allEntries, mappedResources, referencesOut, false);
      }
      for (const fhir_meta_security of fhir['meta']['security'] || []) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.base.Metadata', {}, null, shrId);
        inst.metadata.securityLabel = inst.metadata.securityLabel || [];
        const inst_metadata_securityLabel = FHIRHelper.createInstanceFromFHIR('shr.base.SecurityLabel', fhir_meta_security, 'Coding', shrId, allEntries, mappedResources, referencesOut, false);
        inst.metadata.securityLabel.push(inst_metadata_securityLabel);
      }
      for (const fhir_meta_tag of fhir['meta']['tag'] || []) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.base.Metadata', {}, null, shrId);
        inst.metadata.tag = inst.metadata.tag || [];
        const inst_metadata_tag = FHIRHelper.createInstanceFromFHIR('shr.base.Tag', fhir_meta_tag, 'Coding', shrId, allEntries, mappedResources, referencesOut, false);
        inst.metadata.tag.push(inst_metadata_tag);
      }
    }
    if (fhir['language'] != null) {
      inst.language = FHIRHelper.createInstanceFromFHIR('shr.core.Language', fhir['language'], 'code', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['text'] != null) {
      inst.narrative = FHIRHelper.createInstanceFromFHIR('shr.base.Narrative', fhir['text'], 'Narrative', shrId, allEntries, mappedResources, referencesOut, false);
    }
    for (const fhir_extension of fhir['extension'] || []) {
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-base-FindingResult-extension' && fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-base-FindingResult-extension') {
        inst.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
        if (fhir_extension['valueCodeableConcept'] != null) {
          inst.findingResult.value = FHIRHelper.createInstanceFromFHIR('shr.core.CodeableConcept', fhir_extension['valueCodeableConcept'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
        }
      }
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-base-FindingTopicCode-extension') {
        inst.findingTopicCode = FHIRHelper.createInstanceFromFHIR('shr.base.FindingTopicCode', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
      }
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-base-ExceptionValue-extension' && fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-base-ExceptionValue-extension') {
        inst.exceptionValue = FHIRHelper.createInstanceFromFHIR('shr.base.ExceptionValue', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
        if (fhir_extension['valueCodeableConcept'] != null) {
          inst.exceptionValue.value = FHIRHelper.createInstanceFromFHIR('shr.core.CodeableConcept', fhir_extension['valueCodeableConcept'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
        }
      }
    }
    return inst;
  }

}
export default MitoticCountScore;
