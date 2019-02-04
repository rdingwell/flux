import EntryShortcut from './EntryShortcut';

export default class NLPHashtag extends EntryShortcut {
    constructor(onUpdate, metadata, patient, shortcutData) {
        super(metadata);
        this.nlpTemplate = this.metadata["nlpTemplate"];
        this.constructValueObject(patient, shortcutData);
        this.buildValueObjectAttributes(onUpdate);
    }
}