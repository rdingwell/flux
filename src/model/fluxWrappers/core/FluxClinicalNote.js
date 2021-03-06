import Reference from '../../Reference';
import Metadata from '../../shr/core/Metadata';
import Lang from 'lodash';
import FluxEntry from '../base/FluxEntry';
import EntryId from '../../shr/base/EntryId';

class FluxClinicalNote extends FluxEntry {
    constructor(json) {
        super(json);
        if (json) {
            this._entryInfo = this._constructEntry('http://standardhealthrecord.org/spec/shr/core/ClinicalNote');
            // Since we don't use ClinicalNote.fromJSON in order to construct this instance of FluxCN, we need to use the EntryId classes defined in shr/base
            // This ensures that the schema and shape of our EntryId values align with the standard representation of EntryId
            // Question: Should this use the classRegistry? Unclear
            this._entryInfo.entryId = EntryId.fromJSON(json.EntryId);
            // Question: Should this too use ShrID.fromJSON? Unclear
            this._entryInfo.shrId = json.ShrId;
            if (json.signedOn) this._signedOn = json.signedOn;
            if (json.subject) this._subject = json.subject;
            if (json.hospital) this._hospital = json.hospital;
            if (json.createdBy) this._createdBy = json.createdBy;
            if (json.signedBy) this._signedBy = json.signedBy;
            if (json.Metadata) this._metadata = Metadata.fromJSON(json.Metadata);
            // Ensures even empty strings result in content definition
            if (json.content || json.content === "") this._content = json.content;
            if (!Lang.isUndefined(json.signed)) this._signed = json.signed;
            if (json.DocumentedEncounter) {
                const { _ShrId, _EntryId, _EntryType } = json.DocumentedEncounter;
                this._documentedEncounter = new Reference(_ShrId, _EntryId, _EntryType);
            }
        }
    }

    /**
     * Getter for entry information (shr.base.Entry)
     */
    get entryInfo() {
        return this._entryInfo;
    }

    /**
     * Setter for entry information (shr.base.Entry)
     */
    set entryInfo(entryVal) {
        this._entryInfo = entryVal;
    }

    get metadata() {
        return this._metadata;
    }

    set metadata(metadata) {
        this._metadata = metadata;
    }

    get signedOn() {
        return this._signedOn;
    }

    set signedOn(val) {
        this._signedOn = val;
    }

    get createdOn() {
        return this.metadata.lastUpdated.value;
    }

    get signedBy() {
        return this._signedBy;
    }

    set signedBy(val) {
        this._signedBy = val;
    }

    get subject() {
        return this._subject;
    }

    set subject(val) {
        this._subject = val;
    }

    get hospital() {
        return this._hospital;
    }

    set hospital(val) {
        this._hospital = val;
    }

    get createdBy() {
        return this._createdBy;
    }

    set createdBy(val) {
        this._createdBy = val;
    }

    get content() {
        return this._content;
    }

    set content(val) {
        this._content = val;
    }

    get signed() {
        return this._signed;
    }

    set signed(val) {
        this._signed = val;
    }

    // returns documented encounter reference
    get documentedEncounter() {
        return this._documentedEncounter;
    }

    // sets documented encounter reference
    set documentedEncounter(encounter) {
        this._documentedEncounter = encounter;
    }

    toJSON() {
        let clinicalNoteJSON = this.entryInfo.toJSON();

        clinicalNoteJSON = {
            ...clinicalNoteJSON,
            signedOn: this.signedOn,
            signedBy: this.signedBy,
            subject: this.subject,
            hospital: this.hospital,
            createdBy: this.createdBy,
            content: this.content,
            signed: this.signed,
        };

        if (this._metadata) clinicalNoteJSON.Metadata = this._metadata.toJSON();
        if (this._documentedEncounter) clinicalNoteJSON.DocumentedEncounter = this._documentedEncounter.toJSON();

        return clinicalNoteJSON;
    }
}

export default FluxClinicalNote;
