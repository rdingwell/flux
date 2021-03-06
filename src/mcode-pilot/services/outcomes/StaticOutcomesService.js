import { filterTreatmentData } from '../../utils/filterTreatmentData';
import IOutcomesService from './IOutcomesService';

export default class StaticOutcomesService extends IOutcomesService {
    constructor(config) {
        super();
        this.timescale = config.timescale;
        this.filters = config.filters;
        this.showSideEffects = config.showSideEffects;
    }

    async processSimilarPatientOutcomes(fOptions) {
        return filterTreatmentData(fOptions, this.timescale);
    }
}
