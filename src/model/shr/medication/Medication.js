import Brand from './Brand';
import DoseForm from './DoseForm';
import Ingredient from './Ingredient';
import OverTheCounter from './OverTheCounter';
import SpecificType from '../core/SpecificType';


/** Generated from SHR definition for shr.medication.Medication */
class Medication {
    constructor(json) {
        this._specificType = new SpecificType(json.value);
        if (json.specificType) this.specificType = this._specificType;
        if (json.doseForm) this._doseForm = new DoseForm(json.doseForm);
        if (json.ingredient) this._ingredient = json.ingredient.map((i) => new Ingredient(i));
        if (json.brand) this._brand = new Brand(json.brand);
        if (json.overTheCounter) this._overTheCounter = new OverTheCounter(json.overTheCounter);
    }

  /**
   * Convenience getter for value (accesses this.specificType)
   */
  get value() {
    return this.specificType;
  }

  /**
   * Convenience setter for value (sets this.specificType)
   */
  set value(val) {
    this.specificType = val;
  }

  /**
   * Getter for shr.core.SpecificType
   */
  get specificType() {
    return this._specificType;
  }

  /**
   * Setter for shr.core.SpecificType
   */
  set specificType(specificTypeVal) {
    this._specificType = specificTypeVal;
  }

  /**
   * Getter for shr.medication.DoseForm
   */
  get doseForm() {
    return this._doseForm;
  }

  /**
   * Setter for shr.medication.DoseForm
   */
  set doseForm(doseFormVal) {
    this._doseForm = doseFormVal;
  }

  /**
   * Getter for shr.medication.Ingredient[]
   */
  get ingredient() {
    return this._ingredient;
  }

  /**
   * Setter for shr.medication.Ingredient[]
   */
  set ingredient(ingredientVal) {
    this._ingredient = ingredientVal;
  }

  /**
   * Getter for shr.medication.Brand
   */
  get brand() {
    return this._brand;
  }

  /**
   * Setter for shr.medication.Brand
   */
  set brand(brandVal) {
    this._brand = brandVal;
  }

  /**
   * Getter for shr.medication.OverTheCounter
   */
  get overTheCounter() {
    return this._overTheCounter;
  }

  /**
   * Setter for shr.medication.OverTheCounter
   */
  set overTheCounter(overTheCounterVal) {
    this._overTheCounter = overTheCounterVal;
  }

}

export default Medication;