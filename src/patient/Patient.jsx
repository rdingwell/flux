import Lang from 'lodash'
import moment from 'moment';
import staging from '../lib/staging';
import toxicityLookup from '../lib/toxicity_lookup';

class Patient {
	hardCodedPatient = [
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "1",
			entryType: 	[ 	"http://standardhealthrecord.org/demographics/PersonOfRecord",
							"http://standardhealthrecord.org/actor/Person" ],
			value: { value: "Debra Hernandez672" },
			dateOfBirth: "5 APR 1966",
			placeOfBirth: { country: "US" },
			birthSex: {coding: {value: "F", displayText: "Female"}},
			administrativeGender: "female",
			race: { coding: { value: "white"}},
			ethnicity: { coding: { value: "2186-5", displayText: "Non Hispanic or Latino"}},
			maritalStatus: { coding: { value: "M", codeSystem: "http://hl7.org/fhir/v3/MaritalStatus", displayText: "Married"}},
			mothersMaidenName: { value: "Himinez221" },
			fathersName: { value: "Jose Hernandez672" },
			addressUsed: [{ value: {addressLine: [ "123 Main Street"], city: "Boston", state: "MA", country: "US"}, addressUse: { coding: { value: "primary_residence" }}}],
			telecom: [{ value: "999-555-5555", telecomType: "phone", telecomQualifier: "home"}, { value: "999-555-4444", telecomType: "phone", telecomQualifier: "mobile"}],
			languageUsed: [{ value: {coding: { value: "en-US", displayText: "English (United States)"}}}],
			originalCreationDate: "13 JAN 2012",
			lastUpdateDate: "13 JAN 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "2",
			entryType:	[ "http://standardhealthrecord.org/demographics/Photograph" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			when: "01 JAN 2014",
			filePath: "./DebraHernandez672.jpg",
			originalCreationDate: "13 JAN 2012",
			lastUpdateDate: "01 JAN 2014"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "3",
			entryType:	[ "http://standardhealthrecord.org/base/PatientIdentifier" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			organization: { value: "MITRE"},
			identifierType: "MRN",
			value: "026-DH-678944",
			originalCreationDate: "13 JAN 2012",
			lastUpdateDate: "13 JAN 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "4",
			entryType: 	[ "http://standardhealthrecord.org/core/ClinicalNote" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			date: "02 AUG 2015",
			subject: "Clinical follow-up",
			hospital: "Dana Farber Cancer Institute",
			clinician: "Dr. Smith",
			content: "@NAME:'Debra Hernandez672' is a @AGE:'51 year old' @GENDER:'female' presenting with @DIAGNOSIS[Lobular carcinoma of the breast]:'Lobular carcinoma of the breast'.\nDisease #progression[Stable based on physical exam at 02.AUG.2015].",
			originalCreationDate: "02 AUG 2015",
			lastUpdateDate: "02 AUG 2015"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "5",
			entryType: 	[ "http://standardhealthrecord.org/core/ClinicalNote" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			date: "12 JUL 2012",
			subject: "Consult",
			hospital: "Dana Farber Cancer Institute",
			clinician: "Dr. Zheng",
			originalCreationDate: "12 JUL 2012",
			lastUpdateDate: "12 JUL 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "6",
			entryType: 	[ "http://standardhealthrecord.org/core/ClinicalNote" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			date: "20 JUN 2012",
			subject: "Clinical post-op",
			hospital: "Brigham and Women's Hospital",
			clinician: "Dr. Smith",
			originalCreationDate: "20 JUN 2012",
			lastUpdateDate: "20 JUN 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "7",
			entryType: 	[ "http://standardhealthrecord.org/core/ClinicalNote" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			date: "16 MAY 2012",
			subject: "Clinical follow-up",
			hospital: "Dana Farber Cancer Institute",
			clinician: "Dr. Strauss",
			originalCreationDate: "16 MAY 2012",
			lastUpdateDate: "16 MAY 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "8",
			entryType: 	[	"http://standardhealthrecord.org/oncology/BreastCancer",
							"http://standardhealthrecord.org/condition/Condition" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			value: {coding: {value: "254837009", codeSystem: "http://snomed.info/sct", displayText: "Malignant tumor of breast"}},
			specificType: {coding: {value: "C1334276", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Invasive Ductal and Invasive Lobular Breast Carcinoma"}},
			category: {coding: {value: "#disease"}},
			clinicalStatus: "recurrence",
			includeOnProblemList: true,
			whenClinicallyRecognized: "13 JAN 2012",
			breastCancerHistologicGrade: {coding: {value: "369792005", codeSystem: "http://snomed.info/sct", displayText: "High grade or poorly differentiated"}},
			observation: [
				{
					entryType:	[	"http://standardhealthrecord.org/oncology/TumorSize",
									"http://standardhealthrecord.org/observation/Observation",
									"http://standardhealthrecord.org/base/Action" ],
					value: {value: 30.0, units: {value: "mm"}},
					specificType: {coding: {value: "C0475440", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Tumor Size"}},
					status: "final",
					_issue: "stricly speaking, the observations in this list are elements and not entries so entryType shouldn't exist but how would you know which concrete type this represents otherwise? Problem is bigger for choices where some or all choices are just elements"
				},
				{
					entryType:	[	"http://standardhealthrecord.org/oncology/BreastCancerReceptorStatus",
									"http://standardhealthrecord.org/observation/Panel",
									"http://standardhealthrecord.org/observation/Observation",
									"http://standardhealthrecord.org/base/Action" ],
					panelMembers: [
						{	value: {coding: {value: "C1446409", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Positive"}},
													receptorType: {coding: {value: "23307004", codeSystem: "http://snomed.info/sct", displayText: "Estrogen Receptor Family"}},
													specificType: {coding: {value: "16112-5", codeSystem: "http://loinc.org", displayText: "Estrogen receptor:Imp:Pt:Tiss:Nom"}},
													status: "final"},
						{	value: {coding: {value: "C1446409", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Positive"}},
													receptorType: {coding: {value: "C0034833", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Progesterone Receptor"}},
													specificType: {coding: {value: "16113-3", codeSystem: "http://loinc.org", displayText: "Progesterone receptor:Imp:Pt:Tiss:Nom"}},
													status: "final"}
					]
				}
			],
			_issue: "where capture recurrence date of 2013-10-12?",
			originalCreationDate: "13 JAN 2012",
			lastUpdateDate: "01 FEB 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "9",
			entryType:	[	"http://standardhealthrecord.org/medication/MedicationPrescription",
							"http://standardhealthrecord.org/base/Request",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			medication: { value: {coding: {value: "42512", displayText: "Adriamycin"}}},
			dosage: { 	amountPerDose: {value: 60, units: {coding: {value: "mg/m2"}}},
						timingOfDoses: {value: 6, units: {coding: {value: "cycles"}}},
						doseAsNeededIndicato: false},
			status: "completed",
			requestedPerformanceTime: {	timePeriodStart: "10 FEB 2012", 
										timePeriodEnd: "20 AUG 2012"},
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "01 DEC 2013",
			lastUpdateDate: "01 DEC 2013"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "10",
			entryType:	[	"http://standardhealthrecord.org/medication/MedicationPrescription",
							"http://standardhealthrecord.org/base/Request",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			medication: { value: {coding: {value: "3002", displayText: "Cyclophosphamide"}}},
			dosage: { 	amountPerDose: {value: 10, units: {coding: {value: "mg/kg"}}},
						timingOfDoses: {value: 6, units: {coding: {value: "cycles"}}},
						doseAsNeededIndicato: false},
			status: "completed",
			requestedPerformanceTime: {	timePeriodStart: "10 FEB 2012", 
										timePeriodEnd: "20 AUG 2012"},
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "01 FEB 2012",
			lastUpdateDate: "01 FEB 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "11",
			entryType:	[	"http://standardhealthrecord.org/medication/MedicationPrescription",
							"http://standardhealthrecord.org/base/Request",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			medication: { value: {coding: {value: "10324", displayText: "Tamoxifen"}}},
			dosage: { 	amountPerDose: {value: 20, units: {coding: {value: "mg"}}},
						timingOfDoses: {value: 1, units: {coding: {value: "per day"}}},
						doseAsNeededIndicato: false},
			status: "completed",
			requestedPerformanceTime: {	timePeriodStart: "01 NOV 2013", 
										timePeriodEnd: "13 AUG 2016"},
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "01 NOV 2013",
			lastUpdateDate: "01 NOV 2013"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "12",
			entryType:	[	"http://standardhealthrecord.org/medication/MedicationPrescription",
							"http://standardhealthrecord.org/base/Request",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			medication: { value: {coding: {value: "72965", displayText: "Letrozole"}}},
			dosage: { 	amountPerDose: {value: 2.5, units: {coding: {value: "mg"}}},
						timingOfDoses: {value: 1, units: {coding: {value: "per day"}}},
						doseAsNeededIndicato: false},
			status: "completed",
			requestedPerformanceTime: {	timePeriodStart: "10 JAN 2015", 
										timePeriodEnd: "10 JAN 2016"},
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "09 JAN 2015",
			lastUpdateDate: "09 JAN 2015"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "13",
			entryType:	[	"http://standardhealthrecord.org/medication/MedicationPrescription",
							"http://standardhealthrecord.org/base/Request",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			medication: { value: {coding: {value: "202421", displayText: "Coumadin"}}},
			dosage: { 	amountPerDose: {value: 2, units: {coding: {value: "mg"}}},
						timingOfDoses: {value: 1, units: {coding: {value: "per day"}}},
						doseAsNeededIndicato: false},
			status: "completed",
			requestedPerformanceTime: {	timePeriodStart: "05 SEP 2015", 
										timePeriodEnd: "01 JUN 2017"},
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "05 SEP 2015",
			lastUpdateDate: "05 SEP 2015"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "14",
			entryType:	[	"http://standardhealthrecord.org/medication/MedicationPrescription",
							"http://standardhealthrecord.org/base/Request",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			medication: { value: {coding: {value: "262105", displayText: "Aromasin"}}},
			dosage: { 	amountPerDose: {value: 25, units: {coding: {value: "mg"}}},
						timingOfDoses: {value: 1, units: {coding: {value: "per day"}}},
						doseAsNeededIndicato: false},
			status: "active",
			requestedPerformanceTime: {	timePeriodStart: "05 JUN 2017", 
										timePeriodEnd: "01 JAN 2018"},
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "05 JUN 2017",
			lastUpdateDate: "05 JUN 2017"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "15",
			entryType:	[	"http://standardhealthrecord.org/procedure/Procedure",
							"http://standardhealthrecord.org/base/Intervention",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			specificType: { coding: { value: "C0024671", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Mammography"}},
			status: "completed",
			occurrenceTime: "13 JAN 2012",
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "13 JAN 2012",
			lastUpdateDate: "13 JAN 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "16",
			entryType:	[	"http://standardhealthrecord.org/procedure/Procedure",
							"http://standardhealthrecord.org/base/Intervention",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			specificType: { coding: { value: "C0454059", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Radiation therapy procedure or service"}},
			status: "completed",
			occurrenceTime: {	timePeriodStart: "12 JUL 2012", 
								timePeriodEnd: "16 AUG 2012"},
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "02 JUL 2012",
			lastUpdateDate: "02 JUL 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "17",
			entryType:	[	"http://standardhealthrecord.org/procedure/Procedure",
							"http://standardhealthrecord.org/base/Intervention",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			specificType: { coding: { value: "C0851238", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Lumpectomy"}},
			status: "completed",
			occurrenceTime: "20 SEP 2012",
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "20 SEP 2012",
			lastUpdateDate: "20 SEP 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "18",
			entryType:	[	"http://standardhealthrecord.org/procedure/Procedure",
							"http://standardhealthrecord.org/base/Intervention",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			specificType: { coding: { value: "C0796693", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Sentinel Lymph Node Biopsy"}},
			status: "completed",
			occurrenceTime: "20 SEP 2012",
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "20 SEP 2012",
			lastUpdateDate: "20 SEP 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "19",
			entryType:	[	"http://standardhealthrecord.org/procedure/Procedure",
							"http://standardhealthrecord.org/base/Intervention",
							"http://standardhealthrecord.org/base/Action" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			specificType: { coding: { value: "C0024671", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Mammography"}},
			status: "completed",
			occurrenceTime: "04 OCT 2013",
			reason: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			originalCreationDate: "04 OCT 2013",
			lastUpdateDate: "04 OCT 2013"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "20",
			entryType:	[	"http://standardhealthrecord.org/oncology/Progression",
							"http://standardhealthrecord.org/assessment/Assessment" ],			
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			value: { coding: { value: "C1272745", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Improving, responding to treatment"}},
			focalCondition: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			clinicallyRelevantTime: "13 JUN 2012",
			evidence: [ 	{ coding: { value: "C0031809", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "physical examination"}} ],
			assessmentType: { coding: { value: "#progression"}},
			status: "completed",
			originalCreationDate: "13 JUN 2012",
			lastUpdateDate: "13 JUN 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "21",
			entryType:	[	"http://standardhealthrecord.org/oncology/Progression",
							"http://standardhealthrecord.org/assessment/Assessment" ],			
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			value: { coding: { value: "C0677874", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Complete response or remission; no measurable or observable evidence of cancer."}},
			focalCondition: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			clinicallyRelevantTime: "01 NOV 2012",
			evidence: [ 	{ coding: { value: "C0011923", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "imaging"}},
							{ coding: { value: "C0031809", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "physical examination"}} ],
			assessmentType: { coding: { value: "#progression"}},
			status: "completed",
			originalCreationDate: "01 NOV 2012",
			lastUpdateDate: "01 NOV 2012"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "22",
			entryType:	[	"http://standardhealthrecord.org/oncology/Progression",
							"http://standardhealthrecord.org/assessment/Assessment" ],			
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			value: { coding: { value: "C1546960", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Worsening, disease progressing"}},
			focalCondition: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			clinicallyRelevantTime: "17 APR 2014",
			evidence: [ 	{ coding: { value: "C0011923", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "imaging"}} ],
			assessmentType: { coding: { value: "#progression"}},
			status: "completed",
			originalCreationDate: "17 APR 2014",
			lastUpdateDate: "17 APR 2014"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "23",
			entryType:	[	"http://standardhealthrecord.org/oncology/Progression",
							"http://standardhealthrecord.org/assessment/Assessment" ],			
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			value: { coding: { value: "C1272745", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Improving, responding to treatment"}},
			focalCondition: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			clinicallyRelevantTime: "03 JUL 2014",
			evidence: [ 	{ coding: { value: "C0030664", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "pathology"}} ],
			assessmentType: { coding: { value: "#progression"}},
			status: "completed",
			originalCreationDate: "03 JUL 2014",
			lastUpdateDate: "03 JUL 2014"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "24",
			entryType:	[	"http://standardhealthrecord.org/oncology/Progression",
							"http://standardhealthrecord.org/assessment/Assessment" ],			
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			value: { coding: { value: "C0205360", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Stable, neither improving nor worsening"}},
			focalCondition: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			clinicallyRelevantTime: "14 JUN 2015",
			evidence: [ 	{ coding: { value: "C0030664", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "pathology"}},
							{ coding: { value: "C1457887", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "symptoms"}} ],
			assessmentType: { coding: { value: "#progression"}},
			status: "completed",
			originalCreationDate: "14 JUN 2015",
			lastUpdateDate: "14 JUN 2015"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "25",
			entryType:	[	"http://standardhealthrecord.org/oncology/Progression",
							"http://standardhealthrecord.org/assessment/Assessment" ],			
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			value: { coding: { value: "C0205360", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Stable, neither improving nor worsening"}},
			focalCondition: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			clinicallyRelevantTime: "11 AUG 2016",
			evidence: [ 	{ coding: { value: "C0031809", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "physical examination"}},
							{ coding: { value: "C1457887", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "symptoms"}} ],
			assessmentType: { coding: { value: "#progression"}},
			status: "completed",
			originalCreationDate: "11 AUG 2016",
			lastUpdateDate: "11 AUG 2016"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "26",
			entryType:	[	"http://standardhealthrecord.org/oncology/Progression",
							"http://standardhealthrecord.org/assessment/Assessment" ],			
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			value: { coding: { value: "C1546960", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Worsening, disease progressing"}},
			focalCondition: {entryType: "http://standardhealthrecord.org/condition/Condition", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "8"},
			clinicallyRelevantTime: "15 MAY 2017",
			evidence: [ 	{ coding: { value: "C0030664", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "pathology"}},
							{ coding: { value: "C0011923", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "imaging"}},
							{ coding: { value: "C1457887", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "symptoms"}} ],
			assessmentType: { coding: { value: "#progression"}},
			status: "completed",
			originalCreationDate: "15 MAY 2017",
			lastUpdateDate: "15 MAY 2017"
		},
		{
			shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d",
			entryId: "27",
			entryType: 	[	"http://standardhealthrecord.org/condition/Injury",
							"http://standardhealthrecord.org/condition/Condition" ],
			focalSubject: {entryType: "http://standardhealthrecord.org/demographics/PersonOfRecord", shrId: "788dcbc3-ed18-470c-89ef-35ff91854c7d", entryId: "1"},
			specificType: {coding: {value: "C0016658", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Fracture"}},
			category: {coding: {value: "#structural_abnormality"}},
			clinicalStatus: "active",
			includeOnProblemList: true,
			whenClinicallyRecognized: "13 JUN 2017",
			originalCreationDate: "13 JUN 2017",
			lastUpdateDate: "13 JUN 2017"
		},
	];

	constructor() {
		this.patient = this.hardCodedPatient;
        this.personOfRecord = this.getPersonOfRecord();
        this.shrId = this.personOfRecord.shrId;
        this.nextEntryId = Math.max.apply(Math, this.patient.map(function(o) { return o.entryId; })) + 1;
        this.patientFocalSubject = {    "entryType": this.personOfRecord.entryType[0],
                                        "shrId": this.shrId,
                                        "entryId": this.personOfRecord.entryId };
    }
    
    addEntryToPatientWithPatientFocalSubject(entry) {
        entry.shrId = this.shrId;
        entry.entryId = this.nextEntryId;
        this.nextEntryId = this.nextEntryId + 1;
        entry.focalSubject = this.patientFocalSubject;
        let today = new moment().format("D MMM YYYY");
        entry.originalCreationDate = today;
        entry.lastUpdateDate = today;
        this.patient.push(entry);
    }
    
    static createEntryReferenceTo(entry) {
        return { "entryType": entry.entryType[0], "shrId": entry.shrId, "entryId": entry.entryId };
    }
	
	getName() {
		let personOfRecord = this.getPersonOfRecord();
		if (Lang.isNull(personOfRecord)) return null;
		return personOfRecord.value.value;
	}
	
	getDateOfBirth() {
		let personOfRecord = this.getPersonOfRecord();
		return new moment(personOfRecord.dateOfBirth, "D MMM YYYY");
	}
	
	getAge() {
		let personOfRecord = this.getPersonOfRecord();
		var today = new Date();
		var birthDate = new Date(personOfRecord.dateOfBirth);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}
	
	getGender() {
		let personOfRecord = this.getPersonOfRecord();
		return personOfRecord.administrativeGender;
	}
	
	getPersonOfRecord() {
		return this.getMostRecentEntryOfType("http://standardhealthrecord.org/demographics/PersonOfRecord");
	}
	
	getMRN() {
		let list = this.patient.filter((item) => { return item.entryType[0] === "http://standardhealthrecord.org/base/PatientIdentifier" && item.identifierType === "MRN" });
		let identifierEntry = this.getMostRecentEntryFromList(list);
		if (Lang.isNull(identifierEntry)) return null;
		return identifierEntry.value;
	}
	
	getMostRecentPhoto() {
		let photoEntry = this.getMostRecentEntryOfType("http://standardhealthrecord.org/demographics/Photograph");
		if (Lang.isNull(photoEntry)) return null;
		return photoEntry.filePath;
	}
	
	getCurrentHomeAddress() {
		let personOfRecord = this.getPersonOfRecord();
		if (Lang.isNull(personOfRecord)) return null;
		let addressUsed = personOfRecord.addressUsed.filter((item) => { return item.addressUse.coding.value === "primary_residence" });
		if (addressUsed.length === 0) return null;
		return addressUsed[0].value;
	}
	
	getConditions() {
		let result = this.getEntriesIncludingType("http://standardhealthrecord.org/condition/Condition");
		return result;
	}
	
	getLastBreastCancerCondition() {
		let result = this.getEntriesOfType("http://standardhealthrecord.org/oncology/BreastCancer");
		return result[result.length - 1];
	}
	
	getNotes() {
		return this.getEntriesOfType("http://standardhealthrecord.org/core/ClinicalNote");
	}
	
	getKeyEventsChronologicalOrder() {
		let conditions = this.getConditions();
		let result = [];
		conditions.forEach((c, i) => {
			result.push({name: "diagnosis date - " + c.specificType.coding.displayText, start_time: c.whenClinicallyRecognized});
		});
		result.sort(this._eventTimeSorter);
		return result;
	}
	
	getMedications() {
		return this.getEntriesOfType("http://standardhealthrecord.org/medication/MedicationPrescription");
	}
	
	getMedicationsChronologicalOrder() {
		let list = this.getMedications();
		list.sort(this._medsTimeSorter);
		return list;
	}
	
	getProcedures() {
		return this.getEntriesOfType("http://standardhealthrecord.org/procedure/Procedure");
	}
	
	getProceduresChronologicalOrder() {
		let list = this.getProcedures();
		list.sort(this._proceduresTimeSorter);
		return list;
	}
	
	getProceduresForCondition(condition) {
		return this.patient.filter((item) => { 
			return item.entryType[0] === "http://standardhealthrecord.org/procedure/Procedure" && item.reason.entryId === condition.entryId;
		});
	}
	
	getProceduresForConditionChronologicalOrder(condition) {
		let list = this.getProceduresForCondition(condition);
		list.sort(this._proceduresTimeSorter);
		return list;
	}

	getObservationsForCondition(condition, type) {
		return condition.observation.filter((item) => { 
			return item.entryType[0] === type;
		});
	}
	
	getMostRecentStagingForCondition(condition, sinceDate = null) {
		let stagingList = this.getObservationsForCondition(condition, "http://standardhealthrecord.org/oncology/TNMStage");
		if (stagingList.length === 0) return null;
        const sortedStagingList = stagingList.sort(this._observationTimeSorter);
        const length = sortedStagingList.length;
        let s = (sortedStagingList[length - 1]);
		if (Lang.isNull(sinceDate)) return s;
		const startTime = new moment(s.occurrenceTime, "D MMM YYYY");
		if (startTime < sinceDate) {
			return null;
		} else {
			return s;
		}
    }
	
	getReceptorStatus(condition, receptorType) {
		let listObs = this.getObservationsForCondition(condition, "http://standardhealthrecord.org/oncology/BreastCancerReceptorStatus");
		let obs = listObs[0];
		let list = obs.panelMembers.filter((item) => {
			return item.receptorType.coding.value === receptorType;
		});
		if (list.length === 0) return null; else return list[0];
	}
	
	getProgressionsChronologicalOrder() {
		let progressions = this.getProgressions();
		progressions.sort(this._progressionTimeSorter);
		return progressions;
	}
	
	getProgressions() {
		return this.getEntriesOfType("http://standardhealthrecord.org/oncology/Progression");
	}
	
	getProgressionsForCondition(condition) {
		return this.patient.filter((item) => { 
			return item.entryType[0] === "http://standardhealthrecord.org/oncology/Progression" && item.focalCondition.entryId === condition.entryId;
		});
	}
	
	getFocalConditionForProgression(progression) {
		let result = this.patient.filter((item) => { return item.entryType.some((t) => { return t === "http://standardhealthrecord.org/condition/Condition"; }) && item.entryId === progression.focalCondition.entryId});
		return result[0];
	}
	
    getMostRecentProgressionForCondition(condition, sinceDate = null) {
		let progressionList = this.getProgressionsForCondition(condition);
        const sortedProgressionList = progressionList.sort(this._progressionTimeSorter);
        const length = sortedProgressionList.length;
        let p = (sortedProgressionList[length - 1]);
		if (Lang.isNull(sinceDate)) return p;
		const startTime = new moment(p.clinicallyRelevantTime, "D MMM YYYY");
		if (startTime < sinceDate) {
			return null;
		} else {
			return p;
		}
    }

	_medsTimeSorter(a, b) {
		const a_startTime = new moment(a.requestedPerformanceTime.timePeriodStart, "D MMM YYYY");
		const b_startTime = new moment(b.requestedPerformanceTime.timePeriodStart, "D MMM YYYY");
		if (a_startTime < b_startTime) { return -1; }
		if (a_startTime > b_startTime) { return 1; }
		return 0;
	}
	_progressionTimeSorter(a, b) {
		const a_startTime = new moment(a.clinicallyRelevantTime, "D MMM YYYY");
		const b_startTime = new moment(b.clinicallyRelevantTime, "D MMM YYYY");
		if (a_startTime < b_startTime) { return -1; }
		if (a_startTime > b_startTime) { return 1; }
		return 0;
	}
	_observationTimeSorter(a, b) {
		const a_startTime = new moment(a.occurrenceTime, "D MMM YYYY");
		const b_startTime = new moment(b.occurrenceTime, "D MMM YYYY");
		if (a_startTime < b_startTime) { return -1; }
		if (a_startTime > b_startTime) { return 1; }
		return 0;
	}
	_proceduresTimeSorter(a, b) {
		const a_startTime = new moment(a.occurrenceTime, "D MMM YYYY");
		const b_startTime = new moment(b.occurrenceTime, "D MMM YYYY");
		if (a_startTime < b_startTime) { return -1; }
		if (a_startTime > b_startTime) { return 1; }
		return 0;
	}
	_eventTimeSorter(a, b) {
		const a_startTime = new moment(a.start_time, "D MMM YYYY");
		const b_startTime = new moment(b.start_time, "D MMM YYYY");
		if (a_startTime < b_startTime) { return -1; }
		if (a_startTime > b_startTime) { return 1; }
		return 0;
	}

	// generic methods
	getEntriesIncludingType(type) {
		return this.patient.filter((item) => { return item.entryType.some((t) => { return t === type; }) });
	}
	
	getEntriesOfType(type) {
		return this.patient.filter((item) => { return item.entryType[0] === type });
	}
	
	getMostRecentEntryOfType(type) {
		let list = this.getEntriesOfType(type);
		return this.getMostRecentEntryFromList(list);
	}
	
	getMostRecentEntryFromList(list) {
		if (list.length === 0) return null;
		let maxDate = Math.max.apply(null, list.map(function(o) { return new Date(o.lastUpdateDate);}));
		let result = list.filter((item) => { return new Date(item.lastUpdateDate).getTime() === new Date(maxDate).getTime() });
		if (Lang.isUndefined(result) || Lang.isNull(result) || result.length === 0) return null;
		return result[0];
	}

    // Toxicity Creation
    static createNewToxicity(adverseEvent, grade, attribution) {
        const today = new moment().format("D MMM YYYY");
        let adverseEventCoding, gradeCoding, attributionCoding;
        if (Lang.isUndefined(adverseEvent) || Lang.isNull(adverseEvent) || adverseEvent.length === 0) {
            adverseEventCoding = { "value" : "", "codeSystem": "", "displayText": ""};
        } else {
            adverseEventCoding = this._adverseEventToCodeableConcept(adverseEvent);
        }
        if (Lang.isUndefined(grade) || Lang.isNull(grade) || grade.length === 0) {
            gradeCoding = { "value" : "", "codeSystem": "", "displayText": ""};
        } else {
            gradeCoding = this._toxicityGradeToCodeableConcept(grade);
        }
        if (Lang.isUndefined(attribution) || Lang.isNull(attribution) || attribution.length === 0) {
            attributionCoding = { "value" : "", "codeSystem": "", "displayText": ""};
        } else {
            attributionCoding = this._toxicityAttributionToCodeableConcept(grade);
        }
        return {
			"entryType":	[	"http://standardhealthrecord.org/oncology/ToxicReaction",
                                "http://standardhealthrecord.org/adverse/AdverseReaction",
                                "http://standardhealthrecord.org/adverse/AdverseEvent"],
			"value": { "coding": adverseEventCoding },
            "adverseEventGrade": { "coding": gradeCoding },
			"attribution": { "coding": attributionCoding },
			"originalCreationDate": today,
			"lastUpdateDate": today
		};
    }

    static updateAdverseEventForToxicReaction(toxicity, adverseEvent) {
        let adverseEventCoding;
        if (Lang.isUndefined(adverseEvent) || Lang.isNull(adverseEvent) || adverseEvent.length === 0) {
            adverseEventCoding = { "value" : "", "codeSystem": "", "displayText": ""};
        } else {
            adverseEventCoding = this._adverseEventToCodeableConcept(adverseEvent);
        }
        toxicity.value.coding = adverseEventCoding;
    }
    
    static updateGradeForToxicReaction(toxicity, grade) {
        let gradeCoding;
        if (Lang.isUndefined(grade) || Lang.isNull(grade) || grade.length === 0) {
            gradeCoding = { "value" : "", "codeSystem": "", "displayText": ""};
        } else {
            gradeCoding = this._toxicityGradeToCodeableConcept(grade);
        }
        toxicity.adverseEventGrade.coding = gradeCoding;
    }
	
	static updateAttributionForToxicReaction(toxicity, attribution) {
		let attributionCoding;
		if (Lang.isUndefined(attribution) || Lang.isNull(attribution) || attribution.length === 0) {
			attributionCoding = { "value": "", "codeSystem": "", "displayText": ""};
		} else {
			attributionCoding = this._toxicityAttributionToCodeableConcept(attribution);
		}
		toxicity.attribution.coding = attributionCoding;
	}
    
    static _adverseEventToCodeableConcept(adverseEventName) {
        const adverseEvent = toxicityLookup.findAdverseEvent(adverseEventName);
        return { value: adverseEvent['MedDRA v12.0 Code'], codeSystem: "https://www.meddra.org/", displayText: adverseEvent['name']};
    }
    
    static _toxicityGradeToCodeableConcept(grade) {
        if (grade.toLowerCase() === "grade 1") return {value: "C1513302", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Grade 1"};
        if (grade.toLowerCase() === "grade 2") return {value: "C1513374", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Grade 2"};
        if (grade.toLowerCase() === "grade 3") return {value: "C1519275", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Grade 3"};
        if (grade.toLowerCase() === "grade 4") return {value: "C1517874", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Grade 4"};
        if (grade.toLowerCase() === "grade 5") return {value: "C1559081", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Grade 5"};
        return null;
    }
    
    // @param attribution - the string name of the attribution
    static _toxicityAttributionToCodeableConcept(attribution) {
        const options = toxicityLookup.getAttributionOptions();
        const attributionObject = options.find( attr => attr.name === attribution);
        // TODO: The value of this object is just using a local VS defined by Mark in SHR for now. Will be updated eventually. CodeSystem may change.
        return { "value": `#${attributionObject.name}`, codeSystem: 'https://www.meddra.org/', "displayText": attributionObject.name };
    }
    
    // Progression Creation
    static createNewProgression(status, reasons) {
        /* leaves out shrId, entryId, focalSubject, and focalCondition. Should be filled out if added to a patient */
        const today = new moment().format("D MMM YYYY");
        let statusCoding, reasonCodings = [];
        if (Lang.isUndefined(status) || Lang.isNull(status) || status.length === 0) {
            statusCoding = { "value": "", "codeSystem": "", "displayText": ""};
        } else {
            statusCoding = this._progressionStatusToCodeableConcept(status);
        }
        if (!Lang.isUndefined(reasons) && !Lang.isNull(reasons) && reasons.length > 0) {
            reasons.forEach((reason) => {
                reasonCodings.push(this.createProgressionReason(reason));
            });
        }
        return {
			"entryType":	[	"http://standardhealthrecord.org/oncology/Progression",
							"http://standardhealthrecord.org/assessment/Assessment" ],			
			"value": { "coding": statusCoding },
			"clinicallyRelevantTime": today,
			"evidence": reasonCodings,
			"assessmentType": { "coding": { "value": "#progression"}},
			"status": "unknown",
			"originalCreationDate": today,
			"lastUpdateDate": today
		};
    }
    
    static createProgressionReason(reason) {
        return { coding: this._progressionReasonToCodeableConcept(reason) };
    }
    
	static updateStatusForProgression(progression, status) {		
		const status_code = this._progressionStatusToCodeableConcept(status);
        if (Lang.isNull(status_code)) {
            progression.value.coding.displayText = "";
            progression.value.coding.value = "";
            progression.value.coding.codeSystem = "";
        } else {
            progression.value.coding.displayText = status;
            progression.value.coding.value = status_code.code;
            progression.value.coding.codeSystem = status_code.codesystem;
        }
	}
    
    static updateReasonsForProgression(progression, reasons) {
        let reasonObjects = [];
        reasons.forEach((reason) => {
            reasonObjects.push({coding: this._progressionReasonToCodeableConcept(reason)});
        });
        progression.evidence = reasonObjects;
    }

    static _progressionStatusToCodeableConcept(status) {
        if (status === 'Complete Response') return { value: "C0677874", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Complete Response"};
        if (status === 'Complete Resection') return { value: "C0015250", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Complete Resection"};
        if (status === 'Responding') return { value: "C1272745", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Responding"};
        if (status === 'Stable') return { value: "C0205360", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Stable"};
        if (status === 'Progressing') return { value: "C1546960", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Progressing"};
        if (status === 'Inevaluable') return { value: "C3858734", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Inevaluable"};
        return { value: "", codeSystem: "", displayText: ""}
    }
    static _progressionReasonToCodeableConcept(reason) {
        if (reason === "Pathology") return { value: "C0030664", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Pathology"};
        if (reason === "Imaging") return { value: "C0011923", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Imaging"};
        if (reason === "Symptoms") return { value: "C1457887", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Symptoms"};
        if (reason === "Physical exam") return { value: "C0031809", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Physical exam"};
        if (reason === "Markers") return { value: "C0005516", codeSystem: "http://ncimeta.nci.nih.gov", displayText: "Markers"};
        return { value: "", codeSystem: "", displayText: ""}
   }
    
    // Staging Creation
	static createNewTNMStageObservation(t, n, m) {
		let tCoding, nCoding, mCoding;
		let gotAllThree = true;
		if (Lang.isUndefined(t) || Lang.isNull(t) || t.length === 0) {
			tCoding = { "value": "", "codeSystem": "", "displayText": ""};
			gotAllThree = false;
		} else {
			const t_code = this._tToCodeableConcept(t);
			tCoding = { "value": t_code.code, "codeSystem": t_code.codesystem, "displayText": t_code.displayText}
		}
		if (Lang.isUndefined(n) || Lang.isNull(n) || n.length === 0) {
			nCoding = { "value": "", "codeSystem": "", "displayText": ""};
			gotAllThree = false;
		} else {
			const n_code = this._nToCodeableConcept(n);
			nCoding = { "value": n_code.code, "codeSystem": n_code.codesystem, "displayText": n_code.displayText};
		}
		if (Lang.isUndefined(m) || Lang.isNull(m) || m.length === 0) {
			mCoding = { "value": "", "codeSystem": "", "displayText": ""};
			gotAllThree = false;
		} else {
			const m_code = this._mToCodeableConcept(m);
			mCoding = { "value": m_code.code, "codeSystem": m_code.codesystem, "displayText": m_code.displayText};
		}
		let stage, stage_code;
		if (gotAllThree) {
			stage = staging.breastCancerPrognosticStage(t, n, m);
			stage_code = this._stageToCodeableConcept(stage);
		} else {
			stage = "";
			stage_code = {code: "", codesystem: ""};
		}
		//if (Lang.isNull(stage_code) || Lang.isUndefined(stage_code)) return null;
		return {
			"entryType":	[	"http://standardhealthrecord.org/oncology/TNMStage",
								"http://standardhealthrecord.org/observation/Observation",
								"http://standardhealthrecord.org/base/Action" ],
			"value": {"coding": { "value": stage_code.code, "codeSystem": stage_code.codesystem, "displayText": stage}},
			"specificType": {"coding": {"value": "21908-9", "codeSystem": "http://loinc.org", "displayText": "Stage"}},
			"status": "unknown",
			"occurrenceTime": new moment().format("D MMM YYYY"),
			"tStage": {"coding": tCoding},
			"nStage": {"coding": nCoding},
			"mStage": {"coding": mCoding}
		};
	}

	static updateTForStaging(stagingObservation, t) {		
		const t_code = this._tToCodeableConcept(t);
        if (Lang.isNull(t_code)) {
            stagingObservation.tStage.coding.displayText = "";
            stagingObservation.tStage.coding.value = "";
            stagingObservation.tStage.coding.codeSystem = "";
        } else {
            stagingObservation.tStage.coding.displayText = t_code.displayText;
            stagingObservation.tStage.coding.value = t_code.code;
            stagingObservation.tStage.coding.codeSystem = t_code.codesystem;
        }
		this.updateStage(stagingObservation);
	}
	static updateNForStaging(stagingObservation, n) {		
		const n_code = this._nToCodeableConcept(n);
        if (Lang.isNull(n_code)) {
            stagingObservation.nStage.coding.displayText = "";
            stagingObservation.nStage.coding.value = "";
            stagingObservation.nStage.coding.codeSystem = "";
        } else {
            stagingObservation.nStage.coding.displayText = n_code.displayText;
            stagingObservation.nStage.coding.value = n_code.code;
            stagingObservation.nStage.coding.codeSystem = n_code.codesystem;
        }
		this.updateStage(stagingObservation);
	}
	static updateMForStaging(stagingObservation, m) {		
		const m_code = this._mToCodeableConcept(m);
        if (Lang.isNull(m_code)) {
            stagingObservation.mStage.coding.displayText = "";
            stagingObservation.mStage.coding.value = "";
            stagingObservation.mStage.coding.codeSystem = "";
        } else {
            stagingObservation.mStage.coding.displayText = m_code.displayText;
            stagingObservation.mStage.coding.value = m_code.code;
            stagingObservation.mStage.coding.codeSystem = m_code.codesystem;
        }
		this.updateStage(stagingObservation);
	}
	
	static updateStage(stagingObservation) {
		let curT = stagingObservation.tStage.coding.displayText;
		let curN = stagingObservation.nStage.coding.displayText;
		let curM = stagingObservation.mStage.coding.displayText;
		if (curT.length > 0 && curN.length > 0 && curM.length > 0) {
			const stage = staging.breastCancerPrognosticStage(curT, curN, curM);
			const stage_code = this._stageToCodeableConcept(stage);
			if (!Lang.isNull(stage_code) && !Lang.isUndefined(stage_code)) {
				stagingObservation.value.coding.value = stage_code.code;
				stagingObservation.value.coding.codeSystem = stage_code.codesystem;
				stagingObservation.value.coding.displayText = stage;
				return;
			}
		}
		stagingObservation.value.coding.value = "";
		stagingObservation.value.coding.codeSystem = "";
		stagingObservation.value.coding.displayText = "";
	}
	
	addObservationToCondition(observation, condition) {
		condition.observation.push(observation);
	}
	
	static _stageToCodeableConcept(stage) {
		if (Lang.isUndefined(stage) || Lang.isNull(stage)) return null;
		if (stage.toUpperCase() === 'IA') return {codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"46333007"};
		if (stage.toUpperCase() === 'IB') return {codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"786005"};
		if (stage.toUpperCase() === 'IIA') return {codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"52774001"};
		if (stage.toUpperCase() === 'IIB') return {codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"17816005"};
		if (stage.toUpperCase() === 'IIIA') return {codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"73082003"};
		if (stage.toUpperCase() === 'IIIB') return {codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"64062008"};
		if (stage.toUpperCase() === 'IIIC') return {codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"48105005"};
		if (stage.toUpperCase() === 'IV') return {codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"2640006"};
		return null;
	}
	static _tToCodeableConcept(t) {
		if (t.toUpperCase() === 'T0') return {displayText: "T0", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"433371000124106"};
		if (t.toUpperCase() === 'TIS') return {displayText: "Tis", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"44401000"};
		if (t.toUpperCase() === 'T1') return {displayText: "T1", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"369895002"};
		if (t.toUpperCase() === 'T1MI') return {displayText: "T1mi", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"433381000124109"};
		if (t.toUpperCase() === 'T1A') return {displayText: "T1a", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"369897005"};
		if (t.toUpperCase() === 'T1B') return {displayText: "T1b", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"369898000"};
		if (t.toUpperCase() === 'T1C') return {displayText: "T1c", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"433391000124107"};
		if (t.toUpperCase() === 'T2') return {displayText: "T2", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"369900003"};
		if (t.toUpperCase() === 'T3') return {displayText: "T3", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"369901004"};
		if (t.toUpperCase() === 'T4') return {displayText: "T4", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"433401000124109"};
		return null;
	}
	static _nToCodeableConcept(n) {
		if (n.toUpperCase() === 'N0') return {displayText: "N0", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"436311000124105"};
		if (n.toUpperCase() === 'N1') return {displayText: "N1", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"433511000124108"};
		if (n.toUpperCase() === 'N1MI') return {displayText: "N1mi", codesystem: "urn:oid:2.16.840.1.113883.3.26.1.1", code: "C95955"};
		if (n.toUpperCase() === 'N2') return {displayText: "N2", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"433551000124109"};
		if (n.toUpperCase() === 'N3') return {displayText: "N3", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"433431000124101"};
		return null;
	}
	static _mToCodeableConcept(m) {
		if (m.toUpperCase() === 'M0') return {displayText: "M0", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"433581000124101"};
		if (m.toUpperCase() === 'M1') return {displayText: "M1", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"436331000124104"};
		if (m.toUpperCase() === 'M1A') return {displayText: "M1a", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"436341000124109"};
		if (m.toUpperCase() === 'M1B') return {displayText: "M1b", codesystem: "urn:oid:2.16.840.1.113883.6.96", code:"436321000124102"};
		return null;
	}
}

export default Patient;