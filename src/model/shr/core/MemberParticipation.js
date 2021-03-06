// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

/**
 * Generated class for shr.core.MemberParticipation.
 */
class MemberParticipation {

  /**
   * Get the Member.
   * @returns {Member} The shr.core.Member
   */
  get member() {
    return this._member;
  }

  /**
   * Set the Member.
   * This field/value is required.
   * @param {Member} member - The shr.core.Member
   */
  set member(member) {
    this._member = member;
  }

  /**
   * Set the Member and return 'this' for chaining.
   * This field/value is required.
   * @param {Member} member - The shr.core.Member
   * @returns {MemberParticipation} this.
   */
  withMember(member) {
    this.member = member; return this;
  }

  /**
   * Get the ParticipationPeriod.
   * @returns {ParticipationPeriod} The shr.core.ParticipationPeriod
   */
  get participationPeriod() {
    return this._participationPeriod;
  }

  /**
   * Set the ParticipationPeriod.
   * @param {ParticipationPeriod} participationPeriod - The shr.core.ParticipationPeriod
   */
  set participationPeriod(participationPeriod) {
    this._participationPeriod = participationPeriod;
  }

  /**
   * Set the ParticipationPeriod and return 'this' for chaining.
   * @param {ParticipationPeriod} participationPeriod - The shr.core.ParticipationPeriod
   * @returns {MemberParticipation} this.
   */
  withParticipationPeriod(participationPeriod) {
    this.participationPeriod = participationPeriod; return this;
  }

  /**
   * Get the InactiveFlag.
   * @returns {InactiveFlag} The shr.core.InactiveFlag
   */
  get inactiveFlag() {
    return this._inactiveFlag;
  }

  /**
   * Set the InactiveFlag.
   * This field/value is required.
   * @param {InactiveFlag} inactiveFlag - The shr.core.InactiveFlag
   */
  set inactiveFlag(inactiveFlag) {
    this._inactiveFlag = inactiveFlag;
  }

  /**
   * Set the InactiveFlag and return 'this' for chaining.
   * This field/value is required.
   * @param {InactiveFlag} inactiveFlag - The shr.core.InactiveFlag
   * @returns {MemberParticipation} this.
   */
  withInactiveFlag(inactiveFlag) {
    this.inactiveFlag = inactiveFlag; return this;
  }

  /**
   * Deserializes JSON data to an instance of the MemberParticipation class.
   * The JSON must be valid against the MemberParticipation JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {MemberParticipation} An instance of MemberParticipation populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.core', 'MemberParticipation');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the MemberParticipation class to a JSON object.
   * The JSON is expected to be valid against the MemberParticipation JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/core/MemberParticipation' } };
    if (this.member != null) {
      inst['Member'] = typeof this.member.toJSON === 'function' ? this.member.toJSON() : this.member;
    }
    if (this.participationPeriod != null) {
      inst['ParticipationPeriod'] = typeof this.participationPeriod.toJSON === 'function' ? this.participationPeriod.toJSON() : this.participationPeriod;
    }
    if (this.inactiveFlag != null) {
      inst['InactiveFlag'] = typeof this.inactiveFlag.toJSON === 'function' ? this.inactiveFlag.toJSON() : this.inactiveFlag;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the MemberParticipation class.
   * The FHIR must be valid against the MemberParticipation FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {MemberParticipation} An instance of MemberParticipation populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.core', 'MemberParticipation');
    const inst = new klass();
    return inst;
  }

}
export default MemberParticipation;
