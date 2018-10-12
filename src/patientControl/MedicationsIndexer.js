import BaseIndexer from './BaseIndexer';

class MedicationsIndexer extends BaseIndexer {
    indexData(section, subsection, data, searchIndex, onHighlight) {
        super.indexData(section, subsection, data, searchIndex, onHighlight);
        const sectionId = super.getStringForId(section);
        data.forEach(item => {
            const medicationId = super.getStringForId(item.medication.medication);
            searchIndex.addSearchableData({
                id: `${sectionId}_${medicationId}_dosage`,
                section,
                subsection: "",
                valueTitle: `${item.medication.medication} Dosage`,
                value: `${item.medication.amountPerDose.value} ${item.medication.amountPerDose.units}`,
                onHighlight
            });

            searchIndex.addSearchableData({
                id: `${sectionId}_${medicationId}_medication`,
                section,
                subsection: "",
                valueTitle: "Medication",
                value: item.medication.medication,
                onHighlight
            });

            searchIndex.addSearchableData({
                id: `${sectionId}_${medicationId}_timing`,
                section,
                subsection: "",
                valueTitle: `${item.medication.medication} Timing`,
                value: item.medication.timingOfDoses.value,
                onHighlight
            });

            searchIndex.addSearchableData({
                id: `${sectionId}_${medicationId}_perscribed`,
                section,
                subsection: "",
                valueTitle: `${item.medication.medication} Prescribed`,
                value: item.medication.whenPrescribed,
                onHighlight
            });

            searchIndex.addSearchableData({
                id: `${sectionId}_${medicationId}_route`,
                section,
                subsection: "",
                valueTitle: `${item.medication.medication} Route`,
                value: item.medication.routeIntoBody,
                onHighlight
            });

            searchIndex.addSearchableData({
                id: `${sectionId}_${medicationId}_perscribed_by`,
                section,
                subsection: "",
                valueTitle: `${item.medication.medication} Prescribed By`,
                value: item.medication.prescribedBy,
                onHighlight
            });
        });
    }
}

export default MedicationsIndexer;