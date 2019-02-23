import Shortcut from './Shortcut';
import ValueSetManager from '../lib/ValueSetManager';
import moment from 'moment';
import Lang from 'lodash';

export default class CreatorChildService extends Shortcut {
    constructor(onUpdate, metadata) {
        super();
        this.metadata = metadata;
    }

    getPrefixCharacter() {
        return "$";
    }

    initialize(contextManager, trigger, updatePatient = true) {
        super.initialize(contextManager, trigger, updatePatient);

        super.determineParentContext(contextManager, this.metadata["knownParentContexts"], this.metadata["parentAttribute"]);

        if (!Lang.isUndefined(this.parentContext)) {
            this.parentContext.addChild(this);
        }
        this.setText(trigger, updatePatient);
        this.clearValueSelectionOptions();
    }

    onBeforeDeleted() {
        let result = super.onBeforeDeleted();
        if (result && !Lang.isUndefined(this.parentContext)) {
            if (this.metadata["subtype"] && this.metadata["subtype"] === "list") {
                //console.log("onBeforeDeleted of a list item");
                const parentAttributeName = this.metadata.parentAttribute;
                let currentList = this.parentContext.getAttributeValue(parentAttributeName);
                let oneToDelete = this.text;
                let newList = currentList.filter((item) => {
                    return item !== oneToDelete
                });
                this.parentContext.setAttributeValue(parentAttributeName, newList, false);
            } else {
                this.parentContext.setAttributeValue(this.metadata.parentAttribute, null, false);
            }
            this.parentContext.removeChild(this);
        }
        return result;
    }

    setText(text, updatePatient = true) {
        const prefix = this.getPrefixCharacter();
        if (text.startsWith(prefix)) {
            text = text.substring(prefix.length);
        }
        this.text = text;
        if (!Lang.isUndefined(this.parentContext)) {
            this.parentContext.setAttributeValue(this.metadata.parentAttribute, text, false, updatePatient);
        }
    }

    setValue(value, updatePatient = true) {
        if (!Lang.isUndefined(this.parentContext)) {
            this.parentContext.setAttributeValue(this.metadata.parentAttribute, value, false, updatePatient);
        }
    }

    getText() {
        return this.text;
    }

    getResultText() {
        return `${this.getPrefixCharacter()}${this.getText()}`;
    }


    getShortcutType() {
        return this.metadata["id"];
    }

    validateInCurrentContext(contextManager) {
        let errors = [];
        return errors;
    }

    static getStringTriggers() {
        throw new Error("getStringTriggers on CreatorChild called.");
    }

    static getTriggerRegExp() {
        return new RegExp(this.metadata.regexpTrigger);
    }

    static getDescription() {
        return this.metadata.description;
    }

    getId() {
        return this.metadata["id"];
    }
}