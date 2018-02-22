import { setPropertiesFromJSON } from '../../json-helper';

import Quantity from './Quantity';

/**
 * Generated class for shr.core.Money.
 * @extends Quantity
 */
class Money extends Quantity {

  /**
   * Get the Units.
   * @returns {Units} The shr.core.Units
   */
  get units() {
    return this._units;
  }

  /**
   * Set the Units.
   * @param {Units} units - The shr.core.Units
   */
  set units(units) {
    this._units = units;
  }

  /**
   * Deserializes JSON data to an instance of the Money class.
   * The JSON must be valid against the Money JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {Money} An instance of Money populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new Money();
    setPropertiesFromJSON(inst, json);
    return inst;
  }
}
export default Money;