// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid, FHIRHelper } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

import UnprescribedExposure from './UnprescribedExposure';

/**
 * Generated class for shr.sdoh.AnimalExposure.
 * @extends UnprescribedExposure
 */
class AnimalExposure extends UnprescribedExposure {

  /**
   * Get the entry information.
   * @returns {Entry} The shr.base.Entry
   */
  get entryInfo() {
    return this._entryInfo;
  }

  /**
   * Set the entry information.
   * @param {Entry} entryInfo - The shr.base.Entry
   */
  set entryInfo(entryInfo) {
    this._entryInfo = entryInfo;
  }

  /**
   * Set the entry information and return 'this' for chaining.
   * @param {Entry} entryInfo - The shr.base.Entry
   * @returns {AnimalExposure} this.
   */
  withEntryInfo(entryInfo) {
    this.entryInfo = entryInfo; return this;
  }

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
   * @returns {AnimalExposure} this.
   */
  withCode(code) {
    this.code = code; return this;
  }

  /**
   * Get the SubstanceOrAgent.
   * @returns {SubstanceOrAgent} The shr.sdoh.SubstanceOrAgent
   */
  get substanceOrAgent() {
    return this._substanceOrAgent;
  }

  /**
   * Set the SubstanceOrAgent.
   * @param {SubstanceOrAgent} substanceOrAgent - The shr.sdoh.SubstanceOrAgent
   */
  set substanceOrAgent(substanceOrAgent) {
    this._substanceOrAgent = substanceOrAgent;
  }

  /**
   * Set the SubstanceOrAgent and return 'this' for chaining.
   * @param {SubstanceOrAgent} substanceOrAgent - The shr.sdoh.SubstanceOrAgent
   * @returns {AnimalExposure} this.
   */
  withSubstanceOrAgent(substanceOrAgent) {
    this.substanceOrAgent = substanceOrAgent; return this;
  }

  /**
   * Deserializes JSON data to an instance of the AnimalExposure class.
   * The JSON must be valid against the AnimalExposure JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {AnimalExposure} An instance of AnimalExposure populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.sdoh', 'AnimalExposure');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the AnimalExposure class to a JSON object.
   * The JSON is expected to be valid against the AnimalExposure JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = this._entryInfo.toJSON();
    inst['EntryType'] = { 'Value' : 'http://standardhealthrecord.org/spec/shr/sdoh/AnimalExposure' };
    if (this.metadata != null) {
      inst['Metadata'] = typeof this.metadata.toJSON === 'function' ? this.metadata.toJSON() : this.metadata;
    }
    if (this.language != null) {
      inst['Language'] = typeof this.language.toJSON === 'function' ? this.language.toJSON() : this.language;
    }
    if (this.implicitRules != null) {
      inst['ImplicitRules'] = typeof this.implicitRules.toJSON === 'function' ? this.implicitRules.toJSON() : this.implicitRules;
    }
    if (this.narrative != null) {
      inst['Narrative'] = typeof this.narrative.toJSON === 'function' ? this.narrative.toJSON() : this.narrative;
    }
    if (this.status != null) {
      inst['Status'] = typeof this.status.toJSON === 'function' ? this.status.toJSON() : this.status;
    }
    if (this.identifier != null) {
      inst['Identifier'] = this.identifier.map(f => f.toJSON());
    }
    if (this.subjectOfRecord != null) {
      inst['SubjectOfRecord'] = typeof this.subjectOfRecord.toJSON === 'function' ? this.subjectOfRecord.toJSON() : this.subjectOfRecord;
    }
    if (this.careContext != null) {
      inst['CareContext'] = typeof this.careContext.toJSON === 'function' ? this.careContext.toJSON() : this.careContext;
    }
    if (this.statementDateTime != null) {
      inst['StatementDateTime'] = typeof this.statementDateTime.toJSON === 'function' ? this.statementDateTime.toJSON() : this.statementDateTime;
    }
    if (this.code != null) {
      inst['Code'] = typeof this.code.toJSON === 'function' ? this.code.toJSON() : this.code;
    }
    if (this.dataValue != null) {
      inst['DataValue'] = typeof this.dataValue.toJSON === 'function' ? this.dataValue.toJSON() : this.dataValue;
    }
    if (this.dataAbsentReason != null) {
      inst['DataAbsentReason'] = typeof this.dataAbsentReason.toJSON === 'function' ? this.dataAbsentReason.toJSON() : this.dataAbsentReason;
    }
    if (this.method != null) {
      inst['Method'] = typeof this.method.toJSON === 'function' ? this.method.toJSON() : this.method;
    }
    if (this.relevantTime != null) {
      inst['RelevantTime'] = typeof this.relevantTime.toJSON === 'function' ? this.relevantTime.toJSON() : this.relevantTime;
    }
    if (this.category != null) {
      inst['Category'] = typeof this.category.toJSON === 'function' ? this.category.toJSON() : this.category;
    }
    if (this.performer != null) {
      inst['Performer'] = this.performer.map(f => f.toJSON());
    }
    if (this.bodyLocation != null) {
      inst['BodyLocation'] = typeof this.bodyLocation.toJSON === 'function' ? this.bodyLocation.toJSON() : this.bodyLocation;
    }
    if (this.commentOrDescription != null) {
      inst['CommentOrDescription'] = typeof this.commentOrDescription.toJSON === 'function' ? this.commentOrDescription.toJSON() : this.commentOrDescription;
    }
    if (this.interpretation != null) {
      inst['Interpretation'] = typeof this.interpretation.toJSON === 'function' ? this.interpretation.toJSON() : this.interpretation;
    }
    if (this.device != null) {
      inst['Device'] = typeof this.device.toJSON === 'function' ? this.device.toJSON() : this.device;
    }
    if (this.referenceRange != null) {
      inst['ReferenceRange'] = typeof this.referenceRange.toJSON === 'function' ? this.referenceRange.toJSON() : this.referenceRange;
    }
    if (this.components != null) {
      inst['Components'] = typeof this.components.toJSON === 'function' ? this.components.toJSON() : this.components;
    }
    if (this.panelMembers != null) {
      inst['PanelMembers'] = typeof this.panelMembers.toJSON === 'function' ? this.panelMembers.toJSON() : this.panelMembers;
    }
    if (this.substanceOrAgent != null) {
      inst['SubstanceOrAgent'] = typeof this.substanceOrAgent.toJSON === 'function' ? this.substanceOrAgent.toJSON() : this.substanceOrAgent;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the AnimalExposure class.
   * The FHIR must be valid against the AnimalExposure FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {AnimalExposure} An instance of AnimalExposure populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.sdoh', 'AnimalExposure');
    const inst = new klass();
    inst.entryInfo = FHIRHelper.createInstanceFromFHIR('shr.base.Entry', {}, null);
    inst.entryInfo.shrId = FHIRHelper.createInstanceFromFHIR('shr.base.ShrId', shrId, 'string');
    inst.entryInfo.entryId = FHIRHelper.createInstanceFromFHIR('shr.base.EntryId', fhir['id'] || uuid(), 'string');
    inst.entryInfo.entryType = FHIRHelper.createInstanceFromFHIR('shr.base.EntryType', 'http://standardhealthrecord.org/spec/shr/sdoh/AnimalExposure', 'uri');
    if (fhir['meta'] != null) {
      if (fhir['meta']['versionId'] != null) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.core.Metadata', {}, null, shrId);
        inst.metadata.versionId = FHIRHelper.createInstanceFromFHIR('shr.core.VersionId', fhir['meta']['versionId'], 'id', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir['meta']['lastUpdated'] != null) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.core.Metadata', {}, null, shrId);
        inst.metadata.lastUpdated = FHIRHelper.createInstanceFromFHIR('shr.core.LastUpdated', fhir['meta']['lastUpdated'], 'instant', shrId, allEntries, mappedResources, referencesOut, false);
      }
      for (const fhir_meta_profile of fhir['meta']['profile'] || []) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.core.Metadata', {}, null, shrId);
        inst.metadata.profile = inst.metadata.profile || [];
        const inst_metadata_profile = FHIRHelper.createInstanceFromFHIR('shr.core.Profile', fhir_meta_profile, 'uri', shrId, allEntries, mappedResources, referencesOut, false);
        inst.metadata.profile.push(inst_metadata_profile);
      }
      for (const fhir_meta_security of fhir['meta']['security'] || []) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.core.Metadata', {}, null, shrId);
        inst.metadata.securityLabel = inst.metadata.securityLabel || [];
        const inst_metadata_securityLabel = FHIRHelper.createInstanceFromFHIR('shr.core.SecurityLabel', fhir_meta_security, 'Coding', shrId, allEntries, mappedResources, referencesOut, false);
        inst.metadata.securityLabel.push(inst_metadata_securityLabel);
      }
      for (const fhir_meta_tag of fhir['meta']['tag'] || []) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.core.Metadata', {}, null, shrId);
        inst.metadata.tag = inst.metadata.tag || [];
        const inst_metadata_tag = FHIRHelper.createInstanceFromFHIR('shr.core.Tag', fhir_meta_tag, 'Coding', shrId, allEntries, mappedResources, referencesOut, false);
        inst.metadata.tag.push(inst_metadata_tag);
      }
    }
    if (fhir['implicitRules'] != null) {
      inst.implicitRules = FHIRHelper.createInstanceFromFHIR('shr.core.ImplicitRules', fhir['implicitRules'], 'uri', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['language'] != null) {
      inst.language = FHIRHelper.createInstanceFromFHIR('shr.core.Language', fhir['language'], 'code', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['text'] != null) {
      inst.narrative = FHIRHelper.createInstanceFromFHIR('shr.core.Narrative', fhir['text'], 'Narrative', shrId, allEntries, mappedResources, referencesOut, false);
    }
    for (const fhir_extension of fhir['extension'] || []) {
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://hl7.org/fhir/us/shr/DSTU2/StructureDefinition/shr-sdoh-SubstanceOrAgent-extension' && fhir_extension['url'] != null && fhir_extension['url'] === 'http://hl7.org/fhir/us/shr/DSTU2/StructureDefinition/shr-sdoh-SubstanceOrAgent-extension') {
        inst.substanceOrAgent = FHIRHelper.createInstanceFromFHIR('shr.sdoh.SubstanceOrAgent', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
        if (fhir_extension['valueCodeableConcept'] != null) {
          inst.substanceOrAgent.value = FHIRHelper.createInstanceFromFHIR('shr.core.CodeableConcept', fhir_extension['valueCodeableConcept'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
        }
      }
    }
    for (const fhir_identifier of fhir['identifier'] || []) {
      inst.identifier = inst.identifier || [];
      const inst_identifier = FHIRHelper.createInstanceFromFHIR('shr.core.Identifier', fhir_identifier, 'Identifier', shrId, allEntries, mappedResources, referencesOut, false);
      inst.identifier.push(inst_identifier);
    }
    if (fhir['status'] != null) {
      inst.status = FHIRHelper.createInstanceFromFHIR('shr.core.Status', fhir['status'], 'code', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['category'] != null) {
      inst.category = FHIRHelper.createInstanceFromFHIR('shr.core.Category', fhir['category'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['code'] != null) {
      inst.code = FHIRHelper.createInstanceFromFHIR('shr.core.Code', fhir['code'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['subject'] != null) {
      const entryId = fhir['subject']['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.core.Patient', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      inst.subjectOfRecord = mappedResources[entryId];
    }
    if (fhir['encounter'] != null) {
      const entryId = fhir['encounter']['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.core.Encounter', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      inst.careContext = mappedResources[entryId];
    }
    if (fhir['effectiveDateTime'] != null) {
      inst.relevantTime = FHIRHelper.createInstanceFromFHIR('shr.core.RelevantTime', fhir['effectiveDateTime'], 'dateTime', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['issued'] != null) {
      inst.statementDateTime = FHIRHelper.createInstanceFromFHIR('shr.core.StatementDateTime', fhir['issued'], 'instant', shrId, allEntries, mappedResources, referencesOut, false);
    }
    for (const fhir_performer of fhir['performer'] || []) {
      inst.performer = inst.performer || [];
      const entryId = fhir_performer['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.core.Practitioner', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      const inst_performer = mappedResources[entryId];
      inst.performer.push(inst_performer);
    }
    if (fhir['valueCodeableConcept'] != null) {
      inst.dataValue = FHIRHelper.createInstanceFromFHIR('shr.core.DataValue', fhir['valueCodeableConcept'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueQuantity'] != null) {
      inst.dataValue = FHIRHelper.createInstanceFromFHIR('shr.core.DataValue', fhir['valueQuantity'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueString'] != null) {
      inst.dataValue = FHIRHelper.createInstanceFromFHIR('shr.core.DataValue', fhir['valueString'], 'string', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueRange'] != null) {
      inst.dataValue = FHIRHelper.createInstanceFromFHIR('shr.core.DataValue', fhir['valueRange'], 'Range', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueRatio'] != null) {
      inst.dataValue = FHIRHelper.createInstanceFromFHIR('shr.core.DataValue', fhir['valueRatio'], 'Ratio', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueTime'] != null) {
      inst.dataValue = FHIRHelper.createInstanceFromFHIR('shr.core.DataValue', fhir['valueTime'], 'time', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueDateTime'] != null) {
      inst.dataValue = FHIRHelper.createInstanceFromFHIR('shr.core.DataValue', fhir['valueDateTime'], 'dateTime', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueCodeableConcept'] != null) {
      inst.dataValue = FHIRHelper.createInstanceFromFHIR('shr.core.DataValue', fhir['valueCodeableConcept'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['dataAbsentReason'] != null) {
      inst.dataAbsentReason = FHIRHelper.createInstanceFromFHIR('shr.core.DataAbsentReason', fhir['dataAbsentReason'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['interpretation'] != null) {
      inst.interpretation = FHIRHelper.createInstanceFromFHIR('shr.core.Interpretation', fhir['interpretation'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['comments'] != null) {
      inst.commentOrDescription = FHIRHelper.createInstanceFromFHIR('shr.core.CommentOrDescription', fhir['comments'], 'string', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['bodySite'] != null) {
      inst.bodyLocation = inst.bodyLocation || FHIRHelper.createInstanceFromFHIR('shr.core.BodyLocation', {}, null, shrId);
      inst.bodyLocation.locationCode = FHIRHelper.createInstanceFromFHIR('shr.core.LocationCode', fhir['bodySite'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
      for (const fhir_bodySite_extension of fhir['bodySite']['extension'] || []) {
        if (fhir_bodySite_extension['url'] != null && fhir_bodySite_extension['url'] === 'http://hl7.org/fhir/us/shr/DSTU2/StructureDefinition/shr-core-Laterality-extension') {
          inst.bodyLocation.laterality = FHIRHelper.createInstanceFromFHIR('shr.core.Laterality', fhir_bodySite_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
        }
        if (fhir_bodySite_extension['url'] != null && fhir_bodySite_extension['url'] === 'http://hl7.org/fhir/us/shr/DSTU2/StructureDefinition/shr-core-Orientation-extension') {
          inst.bodyLocation.orientation = FHIRHelper.createInstanceFromFHIR('shr.core.Orientation', fhir_bodySite_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
        }
        if (fhir_bodySite_extension['url'] != null && fhir_bodySite_extension['url'] === 'http://hl7.org/fhir/us/shr/DSTU2/StructureDefinition/shr-core-RelationToLandmark-extension') {
          inst.bodyLocation.relationToLandmark = inst.bodyLocation.relationToLandmark || [];
          const inst_bodyLocation_relationToLandmark = FHIRHelper.createInstanceFromFHIR('shr.core.RelationToLandmark', fhir_bodySite_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
          inst.bodyLocation.relationToLandmark.push(inst_bodyLocation_relationToLandmark);
        }
      }
    }
    if (fhir['method'] != null) {
      inst.method = FHIRHelper.createInstanceFromFHIR('shr.core.Method', fhir['method'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['device'] != null) {
      const entryId = fhir['device']['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.core.Device', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      inst.device = mappedResources[entryId];
    }
    if (fhir['referenceRange'] != null && fhir['referenceRange'][0] != null) {
      inst.referenceRange = FHIRHelper.createInstanceFromFHIR('shr.core.ReferenceRange', fhir['referenceRange'][0], 'BackboneElement', shrId, allEntries, mappedResources, referencesOut, false);
      if (fhir['referenceRange'][0]['low'] != null) {
        inst.referenceRange.range = inst.referenceRange.range || FHIRHelper.createInstanceFromFHIR('shr.core.Range', {}, null, shrId);
        inst.referenceRange.range.lowerBound = FHIRHelper.createInstanceFromFHIR('shr.core.LowerBound', fhir['referenceRange'][0]['low'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir['referenceRange'][0]['high'] != null) {
        inst.referenceRange.range = inst.referenceRange.range || FHIRHelper.createInstanceFromFHIR('shr.core.Range', {}, null, shrId);
        inst.referenceRange.range.upperBound = FHIRHelper.createInstanceFromFHIR('shr.core.UpperBound', fhir['referenceRange'][0]['high'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir['referenceRange'][0]['meaning'] != null) {
        inst.referenceRange.type = FHIRHelper.createInstanceFromFHIR('shr.core.Type', fhir['referenceRange'][0]['meaning'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
      }
    }
    if (fhir['related'] != null && fhir['related'][0] != null) {
      inst.panelMembers = FHIRHelper.createInstanceFromFHIR('shr.core.PanelMembers', fhir['related'][0], 'BackboneElement', shrId, allEntries, mappedResources, referencesOut, false);
      if (fhir['related'][0]['target'] != null) {
        inst.panelMembers.observation = inst.panelMembers.observation || [];
        const entryId = fhir['related'][0]['target']['reference'];
        if (!mappedResources[entryId]) {
          const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
          if (referencedEntry) {
            mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.core.Observation', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
          }
        }
        let inst_panelMembers_observation;
        if (mappedResources[entryId]) {
          inst_panelMembers_observation = FHIRHelper.createReference(mappedResources[entryId], referencesOut);
        }
        else {
          const entryType = 'http://standardhealthrecord.org/spec/shr/core/Observation';
          inst_panelMembers_observation = FHIRHelper.createReferenceWithoutObject(shrId, entryId, entryType);
        }
        inst.panelMembers.observation.push(inst_panelMembers_observation);
      }
    }
    for (const fhir_component of fhir['component'] || []) {
      inst.components = inst.components || FHIRHelper.createInstanceFromFHIR('shr.core.Components', {}, null, shrId);
      inst.components.observationComponent = inst.components.observationComponent || [];
      const inst_components_observationComponent = FHIRHelper.createReference( FHIRHelper.createInstanceFromFHIR('shr.core.ObservationComponent', fhir_component, 'BackboneElement', shrId, allEntries, mappedResources, referencesOut, false), referencesOut);
      inst.components.observationComponent.push(inst_components_observationComponent);
      if (fhir_component['code'] != null && fhir_component['code']['coding'] != null && fhir_component['code']['coding'].some(g => g['code'] != null && g['code'] === '409496000')) {
      }
      if (fhir_component['code'] != null && fhir_component['code']['coding'] != null && fhir_component['code']['coding'].some(g => g['code'] != null && g['code'] === '118555000')) {
      }
      if (false) {
      }
      if (fhir_component['code'] != null && fhir_component['code']['coding'] != null && fhir_component['code']['coding'].some(g => g['code'] != null && g['code'] === 'C0013153')) {
      }
    }
    return inst;
  }

}
export default AnimalExposure;
