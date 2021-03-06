import { getNamespaceAndName } from "../model/json-helper";

const isReference = (obj) => {
    return obj && typeof obj === 'object' && obj._ShrId && obj._EntryId && obj._EntryType;
};

const mapEntryInfo = (resultJson, entryJson) => {
    resultJson.EntryId = {
        EntryType: {
            Value: 'http://standardhealthrecord.org/spec/shr/base/EntryId',
        },
        Value: entryJson.EntryId
    };

    resultJson.ShrId = {
        EntryType: {
            Value: 'http://standardhealthrecord.org/spec/shr/base/ShrId',
        },
        Value: entryJson.ShrId
    };

    resultJson.EntryType = entryJson.EntryType;

    if (entryJson.Metadata) {
        // TODO: What should we map AuthoredDateTime to?
        // TODO: What should we map InformationRecorder to?
        delete entryJson.Metadata.AuthoredDateTime;
        delete entryJson.Metadata.InformationRecorder;
        changeEntryType(entryJson.Metadata, 'http://standardhealthrecord.org/spec/shr/core/Metadata');
        changeEntryType(entryJson.Metadata.LastUpdated, 'http://standardhealthrecord.org/spec/shr/core/LastUpdated');
        resultJson.Metadata = entryJson.Metadata;
    }

    if (entryJson.SourceClinicalNote) resultJson.SourceClinicalNote = { ...entryJson.SourceClinicalNote };
};

// In mCODE v0.5 the Coding array contains Code objects
// In mCODE v0.9 the Coding array contains CodeValue objects
const mapCodingArray = (codingArray) => {
    codingArray.forEach((c) => {
        mapCoding(c);
    });
};

const mapCoding = (c) => {
    if (c.CodeValue && !c.Code) return; // safety check to prevent deleting something in case we double-map
    c.CodeValue = {...c.Code};
    changeEntryType(c.CodeValue, 'http://standardhealthrecord.org/spec/shr/core/CodeValue');
    delete c.Code;
};

// Changes entryType of entry but keeps value the same
// If value is a CodeableConcept, will perform mapping for Code -> CodeValue
const changeEntryType = (entry, newEntryType) => {
    if (entry == null) return;
    entry.EntryType = { Value: newEntryType };

    // If Value is a CodeableConcept, change Code -> CodeValue
    if (entry.Value && entry.Value.EntryType && entry.Value.EntryType.Value === 'http://standardhealthrecord.org/spec/shr/core/CodeableConcept') {
        mapCodingArray(entry.Value.Coding);
    }
};

const mapAnatomicalLocation = (resultJson, anatomicalLocation) => {
    resultJson.BodyLocation = [...anatomicalLocation];

    resultJson.BodyLocation.forEach((b) => {
        changeEntryType(b, 'http://standardhealthrecord.org/spec/shr/core/BodyLocation');

        b.LocationCode = {
            EntryType: {
                Value: 'http://standardhealthrecord.org/spec/shr/core/LocationCode',
            },
            Value: {...b.Value.AnatomicalLocationOrLandmarkCode.Value},
        };
        mapCodingArray(b.LocationCode.Value.Coding);

        if (b.Value.Laterality) {
            b.Laterality = {...b.Value.Laterality};
            mapCodingArray(b.Laterality.Value.Coding);
        }

        delete b.Value;
    });
};

const mapCondition = (resultJson , entryJson) => {
    changeEntryType(entryJson.Onset, 'http://standardhealthrecord.org/spec/shr/core/Onset');
    resultJson.Onset = entryJson.Onset;

    resultJson.Category = entryJson.Category;
    mapCodingArray(resultJson.Category.Value.Coding);

    resultJson.ClinicalStatus = entryJson.ClinicalStatus;
    changeEntryType(resultJson.ClinicalStatus, 'http://standardhealthrecord.org/spec/shr/core/ClinicalStatus');

    resultJson.Code = entryJson.FindingTopicCode;
    changeEntryType(resultJson.Code, 'http://standardhealthrecord.org/spec/shr/core/Code');

    mapAnatomicalLocation(resultJson, entryJson.AnatomicalLocation);
};

const mapMedication = (resultJson, medication, shrId, nextEntryId, v09Json) => {
    const medCode = medication.Type.Value.Coding[0].Code.Value;

    const existingMedEntry = v09Json.find(e => e.EntryType.Value === 'http://standardhealthrecord.org/spec/shr/core/Medication' && e.Type && e.Type.Value && e.Type.Value.Coding && e.Type.Value.Coding[0] && e.Type.Value.Coding[0].CodeValue && e.Type.Value.Coding[0].CodeValue.Value === medCode);

    if (existingMedEntry) {
        nextEntryId = existingMedEntry.EntryId.Value;
    } else {

        const newMedication = {
            ...medication,
            EntryId: {
                EntryType: {
                    Value: 'http://standardhealthrecord.org/spec/shr/base/EntryId',
                },
                Value: nextEntryId
            },

            ShrId: {
                EntryType: {
                    Value: 'http://standardhealthrecord.org/spec/shr/base/ShrId',
                },
                Value: shrId
            }
        };

        changeEntryType(newMedication, 'http://standardhealthrecord.org/spec/shr/core/Medication');
        changeEntryType(newMedication.OverTheCounter, 'http://standardhealthrecord.org/spec/shr/core/OverTheCounter');
        mapCodingArray(newMedication.Type.Value.Coding);

        v09Json.push(newMedication);
    }

    resultJson.MedicationCodeOrReference = {
        Value: {
            _ShrId: shrId,
            _EntryType: 'http://standardhealthrecord.org/spec/shr/core/Medication',
            _EntryId: nextEntryId
        }
    };

    changeEntryType(resultJson.MedicationCodeOrReference, 'http://standardhealthrecord.org/spec/shr/core/MedicationCodeOrReference');
};

const mapDosage = (resultJson, dosage) => {
    // structure is the same but all the profiles changed from shr.medication to shr.core
    resultJson.Dosage = { ...dosage };

    changeEntryType(resultJson.Dosage, 'http://standardhealthrecord.org/spec/shr/core/Dosage');
    changeEntryType(resultJson.Dosage.DoseAmount, 'http://standardhealthrecord.org/spec/shr/core/DoseAmount');
    mapCoding(resultJson.Dosage.DoseAmount.Value.Units.Value);
    changeEntryType(resultJson.Dosage.TimingOfDoses, 'http://standardhealthrecord.org/spec/shr/core/TimingOfDoses');
    if (resultJson.Dosage.TimingOfDoses.Value.RecurrencePattern &&
        resultJson.Dosage.TimingOfDoses.Value.RecurrencePattern.RecurrenceInterval) {
        mapCoding(resultJson.Dosage.TimingOfDoses.Value.RecurrencePattern.RecurrenceInterval.Value.Units.Value);
    }
    if (resultJson.Dosage.TimingOfDoses.Value.TimingCode) {
        mapCodingArray(resultJson.Dosage.TimingOfDoses.Value.TimingCode.Value.Coding);
    }
    changeEntryType(resultJson.Dosage.AsNeededIndicator, 'http://standardhealthrecord.org/spec/shr/core/AsNeededIndicator');
    changeEntryType(resultJson.Dosage.RouteIntoBody, 'http://standardhealthrecord.org/spec/shr/core/RouteIntoBody');
    mapCodingArray(resultJson.Dosage.RouteIntoBody.Value.Coding);
    changeEntryType(resultJson.Dosage.DosageInstructionsText, 'http://standardhealthrecord.org/spec/shr/core/DosageInstructionsText');
    if (resultJson.Dosage.AdditionalDosageInstruction)
        resultJson.Dosage.AdditionalDosageInstruction.forEach(adi => changeEntryType(adi, 'http://standardhealthrecord.org/spec/shr/core/AdditionalDosageInstruction'));
};

const mapReasons = (resultJson, reasons) => {
    if (!reasons) return;

    resultJson.ReasonReference = [];
    // resultJson.ReasonCode = [];
    reasons.forEach((r) => {
        if (isReference(r.Value))  {
            changeEntryType(r, 'http://standardhealthrecord.org/spec/shr/core/ReasonReference');
            r.Value._EntryType = 'http://standardhealthrecord.org/spec/onco/core/CancerCondition';
            resultJson.ReasonReference.push(r);
        } else {
            // TODO: handle ReasonCode?
        }
    });
};

const mapRelevantTime = (resultJson, relevantTime) => {
    resultJson.RelevantTime = { ...relevantTime };
    changeEntryType(resultJson.RelevantTime, 'http://standardhealthrecord.org/spec/shr/core/RelevantTime');
};

const mapFindingStatus = (resultJson, findingStatus) => {
    resultJson.Status = { ...findingStatus };
    changeEntryType(resultJson.Status, 'http://standardhealthrecord.org/spec/shr/core/Status');
};

const mapFindingTopicCode = (resultJson, findingTopicCode) => {
    resultJson.Code = { ...findingTopicCode };
    changeEntryType(resultJson.Code, 'http://standardhealthrecord.org/spec/shr/core/Code');
};

const mapFindingResult = (resultJson, findingResult) => {
    resultJson.DataValue = { ...findingResult };
    changeEntryType(resultJson.DataValue, 'http://standardhealthrecord.org/spec/shr/core/DataValue');
};

// Maps SpecificFocusOfFinding Reference to PrimaryCancerCondition Reference
const mapSffToPcc = (resultJson, sff) => {
    resultJson.PrimaryCancerCondition = { ...sff.Value };
    resultJson.PrimaryCancerCondition._EntryType = 'http://standardhealthrecord.org/spec/onco/core/PrimaryCancerCondition';
};

const mapPanelMembers = (resultJson, panelMembers) => {
    resultJson.PanelMembers = { ...panelMembers };
    changeEntryType(resultJson.PanelMembers, 'http://standardhealthrecord.org/spec/shr/core/PanelMembers');
};

const mapSimpleVital = (resultJson, vitalEntryType, entry) => {
    changeEntryType(resultJson, vitalEntryType);
    mapFindingResult(resultJson, entry.FindingResult);
    mapFindingTopicCode(resultJson, entry.FindingTopicCode);
    mapFindingStatus(resultJson, entry.FindingStatus);
    mapRelevantTime(resultJson, entry.RelevantTime);
    mapCoding(resultJson.DataValue.Value.Units.Value);
};

const getOrCreatePractitionerByName = (v09Json, name, nextEntryId, shrId) => {
    const practitionerEntry = v09Json.find(e => e.Person && e.Person.HumanName[0].NameAsText.Value === name);

    if (practitionerEntry) {
        return practitionerEntry.EntryId.Value;
    } else {
        const practitionerEntryToAdd = {
            ShrId: shrId,
            EntryId: {
                EntryType: {
                    Value: 'http://standardhealthrecord.org/spec/shr/base/EntryId'
                },
                Value: `${nextEntryId}`
            },
            EntryType: {
                Value: 'http://standardhealthrecord.org/spec/shr/core/Practitioner'
            },
            Person: {
                EntryType: {
                    Value: 'http://standardhealthrecord.org/spec/shr/core/Person'
                },
                HumanName: [
                    {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/HumanName'
                        },
                        NameAsText: {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/NameAsText'
                            },
                            Value: name
                        }
                    }
                ]
            }
        };

        v09Json.push(practitionerEntryToAdd);
        return nextEntryId;
    }
};

const getOrCreateOrganizationByName = (v09Json, name, nextEntryId, shrId) => {
    const organizationEntry = v09Json.find(e => e.OrganizationName && e.OrganizationName.Value === name);

    if (organizationEntry) {
        return organizationEntry.EntryId.Value;
    } else {
        const organizationEntryToAdd = {
            ShrId: shrId,
            EntryId: {
                EntryType: {
                    Value: 'http://standardhealthrecord.org/spec/shr/base/EntryId'
                },
                Value: `${nextEntryId}`
            },
            EntryType: {
                Value: 'http://standardhealthrecord.org/spec/shr/core/Organization'
            },
            OrganizationName: {
                EntryType: {
                    Value: 'http://standardhealthrecord.org/spec/shr/core/OrganizationName'
                },
                Value: name
            }
        };

        v09Json.push(organizationEntryToAdd);
        return nextEntryId;
    }
};

export function mapEntries(v05Json) {
    const v09Json = [];

    let nextEntryId = v05Json.map(e => e.EntryId).reduce((a, b) => Math.max(a, b)) + 1;

    v05Json = JSON.parse(JSON.stringify(v05Json)); // dup the JSON to ensure we don't unintentionally modify it. this prevents certain test cases from breaking where the same file is imported twice

    v05Json.forEach((entry) => {
        const { elementName } = getNamespaceAndName(entry);
        const resultJson = {};

        const authoredDateTime = entry.Metadata ? { ...entry.Metadata.AuthoredDateTime } : null;
        const informationRecorder = entry.Metadata && entry.Metadata.InformationRecorder;
        mapEntryInfo(resultJson, entry);
        switch (elementName) {
            case 'AllergyIntolerance': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/AllergyIntolerance');
                if (entry.Patient) {
                    resultJson.SubjectOfRecord = {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/PatientSubjectOfRecord',
                        },
                        Patient: entry.Patient,
                    };
                    changeEntryType(resultJson.SubjectOfRecord.Patient, 'http://standardhealthrecord.org/spec/shr/core/Patient');
                }

                if (entry.FindingResult) {
                    // unlike other FindingResults that turn into DataValue, this one turns into Code
                    resultJson.Code = { ...entry.FindingResult };
                    changeEntryType(resultJson.Code, 'http://standardhealthrecord.org/spec/shr/core/Code');
                    mapCodingArray(resultJson.Code.Value.Coding);
                }

                if (entry.SubstanceCategory) {
                    resultJson.SubstanceCategory = { ...entry.SubstanceCategory };
                    changeEntryType(resultJson.SubstanceCategory, 'http://standardhealthrecord.org/spec/shr/core/SubstanceCategory');
                    mapCodingArray(resultJson.SubstanceCategory.Value.Coding);
                }

                if (entry.AllergyIntoleranceReaction) {
                    resultJson.AllergyIntoleranceReaction = [];
                    entry.AllergyIntoleranceReaction.forEach(air => {
                        const mappedAIR = { ...air };
                        changeEntryType(mappedAIR, 'http://standardhealthrecord.org/spec/shr/core/AllergyIntoleranceReaction');

                        if (mappedAIR.Manifestation) {
                            mappedAIR.Manifestation.forEach(m => {
                                changeEntryType(m, 'http://standardhealthrecord.org/spec/shr/core/Manifestation');
                                mapCodingArray(m.Value.Coding);
                            });
                        }

                        if (mappedAIR.Severity) {
                            changeEntryType(mappedAIR.Severity, 'http://standardhealthrecord.org/spec/shr/core/Severity');
                            mapCodingArray(mappedAIR.Severity.Value.Coding);
                        }

                        resultJson.AllergyIntoleranceReaction.push(mappedAIR);
                    });
                }

                v09Json.push(resultJson);
                break;
            }
            case 'NoKnownAllergy': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/AllergyIntolerance');

                // US core says use "No known allergy" code, which it turns out we already do

                if (entry.Value) {
                    resultJson.Code = { Value: { ...entry.Value } };
                    changeEntryType(resultJson.Code, 'http://standardhealthrecord.org/spec/shr/core/Code');
                    mapCodingArray(resultJson.Code.Value.Coding);
                }

                v09Json.push(resultJson);
                break;
            }
            case 'BloodPressure': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/BloodPressure');
                mapFindingTopicCode(resultJson, entry.FindingTopicCode);
                mapFindingStatus(resultJson, entry.FindingStatus);
                mapRelevantTime(resultJson, entry.RelevantTime);

                if (entry.PanelMembers && entry.PanelMembers.Observation) {
                    resultJson.Components = entry.PanelMembers.Observation.map(ref => {
                        const bloodPressureReading = v05Json.find(e => e.EntryId === ref._EntryId);
                        const bloodPressureType = getNamespaceAndName(bloodPressureReading).elementName;
                        const DataValue = {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/DataValue'
                            },
                            Value: {
                                EntryType: {
                                    Value: 'http://standardhealthrecord.org/spec/shr/core/Quantity'
                                },
                                ...bloodPressureReading.Value
                            }
                        };

                        mapCoding(DataValue.Value.Units.Value);

                        return {
                            EntryType: {
                                Value: `http://standardhealthrecord.org/spec/shr/core/${bloodPressureType}`
                            },
                            DataValue
                        };
                    });
                }
                v09Json.push(resultJson);
                break;
            }
            case 'BodyTemperature': {
                mapSimpleVital(resultJson, 'http://standardhealthrecord.org/spec/shr/core/BodyTemperature', entry);
                v09Json.push(resultJson);
                break;
            }
            case 'BodyWeight': {
                mapSimpleVital(resultJson, 'http://standardhealthrecord.org/spec/shr/core/BodyWeight', entry);
                v09Json.push(resultJson);
                break;
            }
            case 'CancerDisorderPresent': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/CancerCondition');
                mapCondition(resultJson, entry);
                resultJson.SubjectOfRecord = {
                    EntryType: {
                        Value: 'http://standardhealthrecord.org/spec/shr/core/PatientSubjectOfRecord',
                    },
                    Patient: entry.Patient,
                };
                resultJson.SubjectOfRecord.Patient._EntryType = 'http://standardhealthrecord.org/spec/shr/core/Patient';

                v09Json.push(resultJson);
                break;
            }
            case 'CancerHistologicGrade': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/CancerHistologicGrade');

                mapFindingResult(resultJson, entry.FindingResult);
                mapFindingStatus(resultJson, entry.FindingStatus);
                mapRelevantTime(resultJson, entry.RelevantTime);
                mapSffToPcc(resultJson, entry.SpecificFocusOfFinding);

                v09Json.push(resultJson);
                break;
            }
            case 'CancerProgression': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/CancerDiseaseStatus');
                mapFindingResult(resultJson, entry.FindingResult);
                mapFindingTopicCode(resultJson, entry.FindingTopicCode);

                resultJson.Status = { ...entry.FindingStatus };
                changeEntryType(resultJson.Status, 'http://standardhealthrecord.org/spec/shr/core/Status');

                // TODO: Might need to do a mapping of the actual reference here, but just mapping it to the new data element for now
                resultJson.RelatedCancerCondition = { ...entry.SpecificFocusOfFinding };
                changeEntryType(resultJson.RelatedCancerCondition, 'http://standardhealthrecord.org/spec/onco/core/RelatedCancerCondition');

                if (authoredDateTime) {
                    resultJson.StatementDateTime = { ...authoredDateTime };
                    changeEntryType(resultJson.StatementDateTime, 'http://standardhealthrecord.org/spec/shr/core/StatementDateTime');
                }

                if (entry.CancerProgressionEvidence) {
                    resultJson.EvidenceType = [ ...entry.CancerProgressionEvidence ];
                    resultJson.EvidenceType.forEach(e => {
                        changeEntryType(e, 'http://standardhealthrecord.org/spec/onco/core/EvidenceType');
                    });
                }

                v09Json.push(resultJson);
                break;
            }
            case 'ClinicalNote': {
                // We want to get rid of these properties so that they don't
                // override the resultJson equivalents when we desctructure the objects below
                delete entry.ShrId;
                delete entry.EntryId;
                delete entry.Metadata;

                // TODO: Figure out what to do with DocumentedEncounter

                // Passing through the properties that we care about on the entry since FluxClinicalNote
                // is remaining its own entity
                v09Json.push({ ...resultJson, ...entry});
                break;
            }
            case 'ConditionPresentAssertion': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/Condition');
                mapCondition(resultJson, entry);

                v09Json.push(resultJson);
                break;
            }
            case 'ConsultRequested': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/ReferralRequest');

                resultJson.CommentOrDescription = { ...entry.Reason[0] };
                changeEntryType(resultJson.CommentOrDescription, 'http://standardhealthrecord.org/spec/shr/core/CommentOrDescription');

                resultJson.RequestIntent = { ...entry.RequestIntent };
                changeEntryType(resultJson.RequestIntent, 'http://standardhealthrecord.org/spec/shr/core/RequestIntent');

                resultJson.Status = { ...entry.Encounter.Status };
                mapCodingArray(resultJson.Status.Value.Coding);

                resultJson.ExpectedPerformanceTime = {
                    EntryType: {
                        Value: 'http://standardhealthrecord.org/spec/shr/core/ExpectedPerformanceTime'
                    },
                    Value: { ...entry.Encounter.TimePeriod }
                };

                // We used to embed a Practitioner object in the ExpectedPerformer property
                // In 0.9 we will map add Practitioner to the patient record and reference in the ReferralRecipient property
                if (entry.ExpectedPerformer) {
                    // Check if practitioner entry has already been added to patient record
                    const expectedPerformerName = entry.ExpectedPerformer.Value.Person.HumanName[0].NameAsText.Value;
                    const practitionerEntryID = getOrCreatePractitionerByName(v09Json, expectedPerformerName, nextEntryId++, { ...resultJson.ShrId });

                    resultJson.ReferralRecipient = [
                        {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/ReferralRecipient'
                            },
                            Value: {
                                _ShrId: entry.ShrId,
                                _EntryType: 'http://standardhealthrecord.org/spec/shr/core/Practitioner',
                                _EntryId: practitionerEntryID
                            }
                        }
                    ];

                    const expectedOrganizationName =
                        entry.ExpectedPerformer.Value.Person.PartOf
                        && entry.ExpectedPerformer.Value.Person.PartOf.Value
                        && entry.ExpectedPerformer.Value.Person.PartOf.Value.OrganizationName
                        && entry.ExpectedPerformer.Value.Person.PartOf.Value.OrganizationName.Value;

                    if (expectedOrganizationName) {
                        const organizationEntryID = getOrCreateOrganizationByName(v09Json, expectedOrganizationName, nextEntryId++, { ...resultJson.ShrId });

                        resultJson.ReferralRecipient.push({
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/ReferralRecipient'
                            },
                            Value: {
                                _ShrId: entry.ShrId,
                                _EntryType: 'http://standardhealthrecord.org/spec/shr/core/Organization',
                                _EntryId: organizationEntryID
                            }
                        });
                    }
                }

                if (entry.ResultingClinicalNote) resultJson.ResultingClinicalNote = { ...entry.ResultingClinicalNote };

                v09Json.push(resultJson);
                break;
            }
            case 'HeartRate': {
                mapSimpleVital(resultJson, 'http://standardhealthrecord.org/spec/shr/core/HeartRate', entry);
                v09Json.push(resultJson);
                break;
            }
            case 'MedicationChange': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/MedicationStatement');

                if (authoredDateTime) {
                    resultJson.StatementDateTime = { ...authoredDateTime };
                    changeEntryType(resultJson.StatementDateTime, 'http://standardhealthrecord.org/spec/shr/core/StatementDateTime');
                }

                if (informationRecorder) {
                    const practitionerEntryID = getOrCreatePractitionerByName(v09Json, informationRecorder, nextEntryId++, { ...resultJson.ShrId });

                    resultJson.MedicationStatementInformationSource = {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/MedicationStatementInformationSource'
                        },
                        Value: {
                            _ShrId: entry.ShrId,
                            _EntryType: 'http://standardhealthrecord.org/spec/shr/core/Practitioner',
                            _EntryId: `${practitionerEntryID}`
                        }
                    };
                }

                resultJson.TreatmentIntent = { ...entry.Category };
                changeEntryType(resultJson.TreatmentIntent, 'http://standardhealthrecord.org/spec/shr/core/TreatmentIntent');

                resultJson.ReasonCode = [ ...entry.Reason ];
                resultJson.ReasonCode.forEach(r => changeEntryType(r, 'http://standardhealthrecord.org/spec/shr/core/ReasonCode'));

                resultJson.Status = { ...entry.Status };
                mapCodingArray(resultJson.Status.Value.Coding);

                if (entry.MedicationBeforeChange) {
                    resultJson.RelatedRequest = {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/MedicationStatementRelatedRequest'
                        },
                        Value: { ...entry.MedicationBeforeChange[0].Value }
                    };
                    resultJson.RelatedRequest.Value._EntryType = 'http://standardhealthrecord.org/spec/shr/core/MedicationRequest';
                }

                if (entry.MedicationAfterChange) {
                    // Find and copy over all properties from MedicationRequested referenced in MedicationAfterChange
                    const medicationAfterChange = v05Json.find(e => e.EntryId === entry.MedicationAfterChange[0].Value._EntryId);
                    mapReasons(resultJson, medicationAfterChange.Reason);

                    resultJson.OccurrenceTimeOrPeriod = { ...medicationAfterChange.ExpectedPerformanceTime };
                    changeEntryType(resultJson.OccurrenceTimeOrPeriod, 'http://standardhealthrecord.org/spec/shr/core/OccurrenceTimeOrPeriod');

                    mapMedication(resultJson, medicationAfterChange.Medication, entry.ShrId, nextEntryId++, v09Json);
                    mapDosage(resultJson, medicationAfterChange.Dosage);
                }

                v09Json.push(resultJson);
                break;
            }
            case 'MedicationRequested': {

                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/MedicationRequest');

                if (authoredDateTime) {
                    resultJson.StatementDateTime = { ...authoredDateTime };
                    changeEntryType(resultJson.StatementDateTime, 'http://standardhealthrecord.org/spec/shr/core/StatementDateTime');
                }

                if (informationRecorder) {
                    const practitionerEntryID = getOrCreatePractitionerByName(v09Json, informationRecorder, nextEntryId++, { ...resultJson.ShrId });

                    resultJson.MedicationRequester = {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/MedicationRequester'
                        },
                        Value: {
                            _ShrId: entry.ShrId,
                            _EntryType: 'http://standardhealthrecord.org/spec/shr/core/Practitioner',
                            _EntryId: `${practitionerEntryID}`
                        }
                    };
                }

                mapReasons(resultJson, entry.Reason);

                resultJson.Status = { ...entry.Status };
                mapCodingArray(resultJson.Status.Value.Coding);


                resultJson.ExpectedPerformanceTime = { ...entry.ExpectedPerformanceTime };
                changeEntryType(resultJson.ExpectedPerformanceTime, 'http://standardhealthrecord.org/spec/shr/core/ExpectedPerformanceTime');

                mapMedication(resultJson, entry.Medication, entry.ShrId, nextEntryId++, v09Json);
                mapDosage(resultJson, entry.Dosage);

                resultJson.NumberOfRefillsAllowed = { ...entry.NumberOfRefillsAllowed };
                changeEntryType(resultJson.NumberOfRefillsAllowed, 'http://standardhealthrecord.org/spec/shr/core/NumberOfRefillsAllowed');

                v09Json.push(resultJson);
                break;
            }
            case 'ImagingProcedurePerformed': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/ImagingProcedure');
                mapReasons(resultJson, entry.Reason);

                resultJson.Status = {...entry.Status};
                mapCodingArray(resultJson.Status.Value.Coding);

                resultJson.Code = {...entry.ProcedureCode};
                changeEntryType(resultJson.Code, 'http://standardhealthrecord.org/spec/shr/core/Code');

                resultJson.OccurrenceTimeOrPeriod = { ...entry.OccurrenceTimeOrPeriod };
                if (entry.Annotation) {
                    resultJson.Annotation = [ ...entry.Annotation ];
                }

                v09Json.push(resultJson);
                break;
            }
            case 'MitoticRate': // removing the MitoticRate class and just making it a generic Observation
            case 'Observation': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/Observation');

                mapRelevantTime(resultJson, entry.RelevantTime);
                mapFindingStatus(resultJson, entry.FindingStatus);
                mapFindingTopicCode(resultJson, entry.FindingTopicCode);

                mapFindingResult(resultJson, entry.FindingResult);
                if (resultJson.DataValue.Value.Units) {
                    mapCoding(resultJson.DataValue.Value.Units.Value);
                }
                if (resultJson.DataValue.Value.Coding) {
                    mapCodingArray(resultJson.DataValue.Value.Coding);
                }

                v09Json.push(resultJson);
                break;
            }
            case 'PathologyReport': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/DiagnosticReport');
                mapRelevantTime(resultJson, entry.RelevantTime);

                if (informationRecorder) {
                    const practitionerEntryID = getOrCreatePractitionerByName(v09Json, informationRecorder, nextEntryId++, { ...resultJson.ShrId });

                    resultJson.Participation = {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/Participation'
                        },
                        Participant: {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/Participant'
                            },
                            Value: {
                                _ShrId: entry.ShrId,
                                _EntryType: 'http://standardhealthrecord.org/spec/shr/core/Practitioner',
                                _EntryId: `${practitionerEntryID}`
                            }
                        }
                    };
                }

                const pdfEntryId = nextEntryId++;
                const newMedia = {
                    EntryType: {
                        Value: 'http://standardhealthrecord.org/spec/shr/core/Media'
                    },
                    ShrId: {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/base/ShrId',
                        },
                        Value: entry.ShrId,
                    },
                    EntryId: {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/base/EntryId',
                        },
                        Value: `${pdfEntryId}`
                    },
                    Attachment: {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/Attachment'
                        },
                        ResourceLocation: {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/ResourceLocation'
                            },
                            Value: entry.FindingResult.Value.ResourceLocation.Value
                        }
                    }
                };
                v09Json.push(newMedia);

                resultJson.Media = {
                    _ShrId: entry.ShrId,
                    _EntryId: `${pdfEntryId}`,
                    _EntryType: 'http://standardhealthrecord.org/spec/shr/core/Media'
                };

                v09Json.push(resultJson);
                break;
            }
            case 'Patient': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/Patient');

                // Person used to be an entry on the patient record and the Patient entry had a reference to it
                // In mCODE v0.9, Person is a property on the Patient entry
                const personEntry = { ...v05Json.find(e => e.EntryId === entry.Person._EntryId) };

                if (personEntry) {
                    // Since Person is not an entry, it no longer has these properties
                    delete personEntry.EntryId;
                    delete personEntry.ShrId;
                    delete personEntry.Metadata;

                    // entry types for some properties have changed from 0.5 -> 0.9
                    changeEntryType(personEntry, 'http://standardhealthrecord.org/spec/shr/core/Person');
                    changeEntryType(personEntry.AdministrativeGender, 'http://standardhealthrecord.org/spec/shr/core/AdministrativeGender');
                    changeEntryType(personEntry.DateOfBirth, 'http://standardhealthrecord.org/spec/shr/core/DateOfBirth');
                    changeEntryType(personEntry.Ethnicity, 'http://standardhealthrecord.org/spec/shr/core/Ethnicity');
                    changeEntryType(personEntry.Ethnicity.EthnicityCode, 'http://standardhealthrecord.org/spec/shr/core/EthnicityCode');
                    changeEntryType(personEntry.MaritalStatus, 'http://standardhealthrecord.org/spec/shr/core/MaritalStatus');
                    changeEntryType(personEntry.Race, 'http://standardhealthrecord.org/spec/shr/core/Race');
                    changeEntryType(personEntry.Race.RaceCode, 'http://standardhealthrecord.org/spec/shr/core/RaceCode');
                    personEntry.Communication = [...personEntry.LanguageUsed];
                    personEntry.Communication.forEach((c) => {
                        changeEntryType(c, 'http://standardhealthrecord.org/spec/shr/core/Communication');
                        mapCodingArray(c.Language.Value.Coding);
                    });
                    delete personEntry.LanguageUsed;

                    // Properties with CodeableConcept values have to map Code -> CodeValue
                    personEntry.Address.forEach(a => mapCodingArray(a.Purpose.Value.Coding));
                    personEntry.ContactPoint.forEach((c) => {
                        mapCodingArray(c.Type.Value.Coding);
                        mapCodingArray(c.Purpose.Value.Coding);
                    });

                    resultJson.Person = personEntry;
                }

                const identifierEntry = { ...v05Json.find((e) => {
                    const { elementName } = getNamespaceAndName(e);
                    return elementName === 'PatientIdentifier';
                })};

                resultJson.Identifier = [
                    {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/Identifier'
                        },
                        IdentifierString: {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/IdentifierString'
                            },
                            value: identifierEntry.value,
                        },
                        Type: {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/Type'
                            },
                            Value: {
                                EntryType: {
                                    Value: 'http://standardhealthrecord.org/spec/shr/core/CodeableConcept'
                                },
                                Coding: [
                                    {
                                        EntryType: {
                                            Value: 'http://standardhealthrecord.org/spec/shr/core/Coding'
                                        },
                                        CodeValue: {
                                            EntryType: {
                                                Value: 'http://standardhealthrecord.org/spec/shr/core/CodeValue'
                                            },
                                            Value: 'MR'
                                        },
                                        CodeSystem: {
                                            EntryType: {
                                                Value: 'http://standardhealthrecord.org/spec/shr/core/CodeSystem'
                                            },
                                            Value: 'http://hl7.org/fhir/v2/0203'
                                        }
                                    }
                                ],
                            }
                        }
                    }
                ];

                v09Json.push(resultJson);
                break;
            }
            case 'PatientIdentifier': {
                // PatientIdentifier is now a property on Patient entry
                return;
            }
            case 'Person': {
                // Person is now a property on Patient entry
                return;
            }
            case 'ProcedureRequested': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/ProcedureRequest');

                mapReasons(resultJson, entry.Reason);
                // TODO: handle ReasonCode. I think there is only one example of a non-reference, "proactive" in Ella's mammography

                resultJson.Status = {...entry.Status};
                mapCodingArray(resultJson.Status.Value.Coding);

                resultJson.Type = {...entry.ProcedureCode};
                changeEntryType(resultJson.Type, 'http://standardhealthrecord.org/spec/shr/core/Type');

                resultJson.ExpectedPerformanceTime = entry.ExpectedPerformanceTime;
                changeEntryType(resultJson.ExpectedPerformanceTime, 'http://standardhealthrecord.org/spec/shr/core/ExpectedPerformanceTime');

                if (entry.ExpectedPerformer) {
                    const expectedPerformerName = entry.ExpectedPerformer.Value.Person.HumanName[0].NameAsText.Value;
                    const practitionerEntryID = getOrCreatePractitionerByName(v09Json, expectedPerformerName, nextEntryId++, { ...resultJson.ShrId });

                    resultJson.ExpectedPerformer = {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/shr/core/ExpectedPerformer'
                        },
                        Value: {
                            _ShrId: entry.ShrId,
                            _EntryType: 'http://standardhealthrecord.org/spec/shr/core/Practitioner',
                            _EntryId: `${practitionerEntryID}`
                        }
                    };
                }

                if (entry.Annotation) {
                    resultJson.Annotation = [ ...entry.Annotation ];
                }

                v09Json.push(resultJson);
                break;
            }
            case 'QuestionAnswer': {
                if (entry.PanelMembers) {
                    changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/QuestionnaireResponse');

                    // Questions and Answers used to be entries on the patient record
                    // Now their instances are contained in the `QuestionnaireResponseItem` property of `QuestionnaireResponse`
                    resultJson.QuestionnaireResponseItem = entry.PanelMembers.Observation.map((o) => {
                        const questionAnswerEntry = v05Json.find(e => e.EntryId === o._EntryId);

                        return {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/QuestionnaireResponseItem',
                            },
                            Question: {
                                EntryType: {
                                    Value: 'http://standardhealthrecord.org/spec/shr/core/Question',
                                },
                                Value: questionAnswerEntry.QuestionText.Value,
                            },
                            Answer: [
                                {
                                    EntryType: {
                                        Value: 'http://standardhealthrecord.org/spec/shr/core/Answer',
                                    },
                                    AnswerValue: {
                                        EntryType: {
                                            Value: 'http://standardhealthrecord.org/spec/shr/core/AnswerValue',
                                        },
                                        Value: questionAnswerEntry.FindingResult.Value,
                                    },
                                }
                            ],
                        };
                    });

                    if (entry.RelevantTime) {
                        resultJson.StatementDateTime = { ...entry.RelevantTime };
                        changeEntryType(resultJson.StatementDateTime, 'http://standardhealthrecord.org/spec/shr/core/StatementDateTime');
                    }

                    v09Json.push(resultJson);
                }
                break;
            }
            case 'ToxicAdverseDrugReaction': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/shr/core/AdverseDrugReaction');

                resultJson.Type = { ...entry.Type };
                mapCodingArray(resultJson.Type.Value.Coding);

                resultJson.Seriousness = { ...entry.Seriousness };
                changeEntryType(resultJson.Seriousness, 'http://standardhealthrecord.org/spec/shr/core/Seriousness');

                if (entry.AdverseEventCondition) {
                    resultJson.AdverseEventCondition = entry.AdverseEventCondition.map(ref => {
                        const { _ShrId, _EntryId } = ref.ConditionPresentAssertion;
                        return {
                            EntryType: {
                                Value: 'http://standardhealthrecord.org/spec/shr/core/AdverseEventCondition'
                            },
                            Condition: {
                                _ShrId,
                                _EntryId,
                                _EntryType: 'http://standardhealthrecord.org/spec/onco/core/CancerCondition'
                            }
                        };
                    });
                }

                if (entry.CausalAttribution) {
                    resultJson.CausalAttribution = [ ...entry.CausalAttribution ];
                    resultJson.CausalAttribution.forEach(attr => {
                        changeEntryType(attr, 'http://standardhealthrecord.org/spec/shr/core/CausalAttribution');
                        changeEntryType(attr.CauseCategory, 'http://standardhealthrecord.org/spec/shr/core/CauseCategory');
                    });
                }

                resultJson.StatementDateTime = {
                    EntryType: {
                        Value: 'http://standardhealthrecord.org/spec/shr/core/StatementDateTime'
                    },
                    Value: entry.Metadata.LastUpdated.Value
                };

                v09Json.push(resultJson);
                break;
            }
            case 'TNMClinicalPrimaryTumorClassification': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/TNMClinicalPrimaryTumorCategory');
                mapFindingResult(resultJson, entry.FindingResult);

                v09Json.push(resultJson);
                break;
            }
            case 'TNMClinicalRegionalNodesClassification': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/TNMClinicalRegionalNodesCategory');
                mapFindingResult(resultJson, entry.FindingResult);

                v09Json.push(resultJson);
                break;
            }
            case 'TNMClinicalDistantMetastasesClassification': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/TNMClinicalDistantMetastasesCategory');
                mapFindingResult(resultJson, entry.FindingResult);

                v09Json.push(resultJson);
                break;
            }
            case 'TNMClinicalStageGroup': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/TNMClinicalStageGroup');

                mapRelevantTime(resultJson, entry.RelevantTime);
                mapFindingStatus(resultJson, entry.FindingStatus);
                mapFindingTopicCode(resultJson, entry.FindingTopicCode);

                // Mapping PanelMembers
                // Need to change namespace for t, n, and m references
                // Removing all other observations
                if (entry.PanelMembers) {
                    mapPanelMembers(resultJson, entry.PanelMembers);
                    resultJson.PanelMembers.Observation.forEach((p, i, arr) => {
                        if (p._EntryType.Value === 'http://standardhealthrecord.org/spec/mcode/TNMClinicalPrimaryTumorClassification') {
                            p._EntryType = 'http://standardhealthrecord.org/spec/onco/core/TNMClinicalPrimaryTumorCategory';
                        } else if (p._EntryType.Value === 'http://standardhealthrecord.org/spec/mcode/TNMClinicalRegionalNodesClassification') {
                            p._EntryType = 'http://standardhealthrecord.org/spec/onco/core/TNMClinicalRegionalNodesCategory';
                        } else if (p._EntryType.Value === 'http://standardhealthrecord.org/spec/mcode/TNMClinicalDistantMetastasesClassification') {
                            p._EntryType = 'http://standardhealthrecord.org/spec/onco/core/TNMClinicalDistantMetastasesCategory';
                        } else {
                            arr.splice(i, 1);
                        }
                    });
                }

                resultJson.Method = { ...entry.FindingMethod };
                changeEntryType(resultJson.Method, 'http://standardhealthrecord.org/spec/shr/core/Method');

                mapFindingResult(resultJson, entry.FindingResult);
                if (entry.SpecificFocusOfFinding) {
                    mapSffToPcc(resultJson, entry.SpecificFocusOfFinding);
                }

                v09Json.push(resultJson);
                break;
            }
            case 'TumorDimensions': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/TumorDimensions');
                mapRelevantTime(resultJson, entry.RelevantTime);
                mapFindingStatus(resultJson, entry.FindingStatus);
                mapFindingResult(resultJson, entry.FindingResult);
                mapFindingTopicCode(resultJson, entry.FindingTopicCode);
                mapCoding(resultJson.DataValue.Value.Units.Value);

                v09Json.push(resultJson);
                break;
            }
            case 'TumorMarker': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/TumorMarkerTest');

                resultJson.DataValue = {
                    Value: {...entry.FindingResult.Value},
                    EntryType: {
                        Value: 'http://standardhealthrecord.org/spec/onco/core/TumorMarkerTestDataValue',
                    },
                };
                mapCodingArray(resultJson.DataValue.Value.Coding);

                mapRelevantTime(resultJson, entry.RelevantTime);
                mapFindingStatus(resultJson, entry.FindingStatus);
                mapFindingTopicCode(resultJson, entry.FindingTopicCode);

                v09Json.push(resultJson);
                break;
            }
            // The genetic mutations below are all mapped the same way
            case 'BRCA1Variant':
            case 'BRCA2Variant':
            case 'KITVariant':
            case 'PDGFRAVariant': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/GeneticMutationTestResult');
                mapFindingResult(resultJson, entry.FindingResult);

                resultJson.MutationTested = {
                    EntryType: {
                        Value: 'http://standardhealthrecord.org/spec/onco/core/MutationTested'
                    },
                    VariantIdentifier: {
                        EntryType: {
                            Value: 'http://standardhealthrecord.org/spec/onco/core/VariantIdentifier'
                        },
                        Value: { ...entry.SpecificFocusOfFinding.Value }
                    }
                };
                mapCodingArray(resultJson.MutationTested.VariantIdentifier.Value.Coding);

                v09Json.push(resultJson);
                break;
            }
            // The genetic analysis panels are all mapped the same way
            case 'BreastCancerGeneticAnalysisPanel':
            case 'GastrointestinalStromalTumorCancerGeneticAnalysisPanel': {
                changeEntryType(resultJson, 'http://standardhealthrecord.org/spec/onco/core/GenomicsReport');
                mapRelevantTime(resultJson, entry.RelevantTime);

                resultJson.Observation = entry.PanelMembers.Observation.map((o) => {
                    const { _ShrId, _EntryId } = o;

                    return {
                        _ShrId,
                        _EntryId,
                        _EntryType: 'http://standardhealthrecord.org/spec/onco/core/GeneticMutationTestResult'
                    };
                });

                v09Json.push(resultJson);
                break;
            }
            default: {
                break;
            }
        }
    });

    return v09Json;
};


if (require.main === module) {
    // USAGE:
    // $ npx babel-node --presets es2015 --plugins transform-object-rest-spread ./src/dataaccess/McodeV05EntryMapper.js <file-to-convert>
    console.log('called directly');
    const fs = require('fs');
    const program = require('commander');

    let inFile;
    program
        .usage('<path-to-patient-json>')
        .arguments('<path-to-patient-json>')
        .action((pathToPatientJson) => {
            inFile = pathToPatientJson;
        })
        .parse(process.argv);

    // Check that input file is specified
    if (typeof inFile === 'undefined') {
        // print error in red text (\x1b[31m) then reset color back to normal (\x1b[0m)
        console.error('\x1b[31m', 'Missing path to patient JSON', '\x1b[0m');
        program.help();
    }

    console.log(`Reading ${inFile}`);
    const patientEntries = JSON.parse(fs.readFileSync(inFile, 'utf8'));
    const mappedEntries = mapEntries(patientEntries);
    const outFile = inFile.replace('V05', 'V09');
    console.log(`Writing to ${outFile}`);
    fs.writeFileSync(outFile, JSON.stringify(mappedEntries, null, 2), 'utf8');
    console.log('Done.');
}
