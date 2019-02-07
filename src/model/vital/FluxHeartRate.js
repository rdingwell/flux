import FluxObservation from '../base/FluxObservation';

class FluxHeartRate extends FluxObservation {
    constructor(json) {
        super(json);
    }

    get value() {
        return this.quantity.number;
    }

    get units() {
        return this.quantity.unit;
    }

    toJSON() {
        const inst = super.toJSON();
        inst['EntryType'] = { 'Value' : 'http://standardhealthrecord.org/spec/shr/vital/HeartRate' };
        return inst;
    }
}

export default FluxHeartRate;
