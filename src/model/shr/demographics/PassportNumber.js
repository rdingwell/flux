/** Generated from SHR definition for shr.demographics.PassportNumber */
class PassportNumber {

  /**
   * Convenience getter for value (accesses this.string)
   */
  get value() {
    return this.string;
  }

  /**
   * Convenience setter for value (sets this.string)
   */
  set value(val) {
    this.string = val;
  }

  /**
   * Getter for string
   */
  get string() {
    return this._string;
  }

  /**
   * Setter for string
   */
  set string(stringVal) {
    this._string = stringVal;
  }

  /**
   * Getter for shr.demographics.CountryOfIssue
   */
  get countryOfIssue() {
    return this._countryOfIssue;
  }

  /**
   * Setter for shr.demographics.CountryOfIssue
   */
  set countryOfIssue(countryOfIssueVal) {
    this._countryOfIssue = countryOfIssueVal;
  }

  /**
   * Getter for shr.core.EffectiveTimePeriod
   */
  get effectiveTimePeriod() {
    return this._effectiveTimePeriod;
  }

  /**
   * Setter for shr.core.EffectiveTimePeriod
   */
  set effectiveTimePeriod(effectiveTimePeriodVal) {
    this._effectiveTimePeriod = effectiveTimePeriodVal;
  }

}

export default PassportNumber;
