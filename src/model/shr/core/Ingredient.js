// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

/**
 * Generated class for shr.core.Ingredient.
 */
class Ingredient {

  /**
   * Get the SubstanceOrCode.
   * @returns {SubstanceOrCode} The shr.core.SubstanceOrCode
   */
  get substanceOrCode() {
    return this._substanceOrCode;
  }

  /**
   * Set the SubstanceOrCode.
   * This field/value is required.
   * @param {SubstanceOrCode} substanceOrCode - The shr.core.SubstanceOrCode
   */
  set substanceOrCode(substanceOrCode) {
    this._substanceOrCode = substanceOrCode;
  }

  /**
   * Set the SubstanceOrCode and return 'this' for chaining.
   * This field/value is required.
   * @param {SubstanceOrCode} substanceOrCode - The shr.core.SubstanceOrCode
   * @returns {Ingredient} this.
   */
  withSubstanceOrCode(substanceOrCode) {
    this.substanceOrCode = substanceOrCode; return this;
  }

  /**
   * Get the IngredientAmount.
   * @returns {IngredientAmount} The shr.core.IngredientAmount
   */
  get ingredientAmount() {
    return this._ingredientAmount;
  }

  /**
   * Set the IngredientAmount.
   * This field/value is required.
   * @param {IngredientAmount} ingredientAmount - The shr.core.IngredientAmount
   */
  set ingredientAmount(ingredientAmount) {
    this._ingredientAmount = ingredientAmount;
  }

  /**
   * Set the IngredientAmount and return 'this' for chaining.
   * This field/value is required.
   * @param {IngredientAmount} ingredientAmount - The shr.core.IngredientAmount
   * @returns {Ingredient} this.
   */
  withIngredientAmount(ingredientAmount) {
    this.ingredientAmount = ingredientAmount; return this;
  }

  /**
   * Get the IsActiveIngredient.
   * @returns {IsActiveIngredient} The shr.core.IsActiveIngredient
   */
  get isActiveIngredient() {
    return this._isActiveIngredient;
  }

  /**
   * Set the IsActiveIngredient.
   * @param {IsActiveIngredient} isActiveIngredient - The shr.core.IsActiveIngredient
   */
  set isActiveIngredient(isActiveIngredient) {
    this._isActiveIngredient = isActiveIngredient;
  }

  /**
   * Set the IsActiveIngredient and return 'this' for chaining.
   * @param {IsActiveIngredient} isActiveIngredient - The shr.core.IsActiveIngredient
   * @returns {Ingredient} this.
   */
  withIsActiveIngredient(isActiveIngredient) {
    this.isActiveIngredient = isActiveIngredient; return this;
  }

  /**
   * Deserializes JSON data to an instance of the Ingredient class.
   * The JSON must be valid against the Ingredient JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {Ingredient} An instance of Ingredient populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.core', 'Ingredient');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the Ingredient class to a JSON object.
   * The JSON is expected to be valid against the Ingredient JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/core/Ingredient' } };
    if (this.substanceOrCode != null) {
      inst['SubstanceOrCode'] = typeof this.substanceOrCode.toJSON === 'function' ? this.substanceOrCode.toJSON() : this.substanceOrCode;
    }
    if (this.ingredientAmount != null) {
      inst['IngredientAmount'] = typeof this.ingredientAmount.toJSON === 'function' ? this.ingredientAmount.toJSON() : this.ingredientAmount;
    }
    if (this.isActiveIngredient != null) {
      inst['IsActiveIngredient'] = typeof this.isActiveIngredient.toJSON === 'function' ? this.isActiveIngredient.toJSON() : this.isActiveIngredient;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the Ingredient class.
   * The FHIR must be valid against the Ingredient FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {Ingredient} An instance of Ingredient populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.core', 'Ingredient');
    const inst = new klass();
    return inst;
  }

}
export default Ingredient;
