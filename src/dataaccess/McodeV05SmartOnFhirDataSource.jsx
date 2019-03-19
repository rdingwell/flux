import IDataSource from './IDataSource';
import PatientRecord from '../patient/PatientRecord';
import ObjectFactory from '../model/ObjectFactory';

import 'fhirclient';

class McodeV05SmartOnFhirDataSource extends IDataSource {
    constructor() {
        super();
        this._gestalt = {
            create: {
                async: false,
                sync: false
            },
            read: {
                async: true,
                sync: false
            },
            update: {
                async: false,
                sync: false
            },
            delete: {
                async: false,
                sync: false
            }
        };
    }
    getGestalt() {
        return this._gestalt;
    }

    _getClientAsync() {
        // if the client is already loaded, just use it
        // wrap it in a promise for consistency
        if (this._client) return Promise.resolve(this._client);

        return new Promise((resolve, _reject) => {
            // this is admittedly clunky, but the FHIR client function uses callbacks
            // so this converts it to a Promise
            window.FHIR.oauth2.ready((smart) => {
                resolve(smart);
            });
        }).then((client) => {
            this._client = client;
            return this._client;
        });
    }

    _fetchAll(resourceType) {
        // the FHIR server can return as many or as few results as it would like
        // so we have to follow links to get the "next" set of results.
        // the FHIR client library includes a fetchAll function, but it has 2 limitations:
        // 1. there is a bug where it can hit (current URL)(bundle contents)
        //    for instance http://localhost/smart?{"resourceType":"Bundle",...}
        // 2. it returns a list of resources, not a bundle, so we don't get access to entry.fullUrl

        return this._client.patient.api.search({ type: resourceType, query: {} })
            .then(response => this._handleResponseBundle(response.data));
    }

    _getNext(prevBundle, nextURL) {
        // getNext fetches the next bundle given a URL and merges it into the current one
        // prevBundle may be a synthetic bundle containing all the results fetched so far

        return this._client.patient.api.getBundleByUrl({ url: nextURL })
            .then(response => this._handleResponseBundle(response.data, prevBundle));
    }

    _handleResponseBundle(newBundle, prevBundle=null) {
        if (prevBundle) {
            // merge the entries from the previous bundle into the new one
            newBundle.entry.unshift(...prevBundle.entry);
            newBundle.total = newBundle.entry.length;
        }

        const nextURL = newBundle.link && newBundle.link.find(l => l.relation === 'next');
        if (nextURL) {
            // if the bundle includes a link to the next one,
            //  keep going, hold on to the current one and fetch the next one
            return this._getNext(newBundle, nextURL.url);
        } else {
            // otherwise we're done
            return newBundle;
        }
    }

    getPatient(id, callback) {
        this._getClientAsync().then(client => client.patient.api.conformance({}))
        .then(metadata => metadata.data.rest[0].resource.map(res => res.type))
        .then(resourceTypes => {
            // the FHIR client library does not seem to support calling Patient$everything,
            // so we fake it by manually fetching all the resource types.
            // further, the library only supports async querying
            const queries = [];
            for (const resourceType of resourceTypes) {
                const result = this._fetchAll(resourceType);
                queries.push(result);
            }

            return Promise.all(queries);
        }).then(responses => {
            const entries = [];
            responses.forEach(response => {
                // response is a Bundle of type searchset
                // TODO: error handling?
                if (response && response.entry) {
                    entries.push(...response.entry);
                }
            });

            // rather than update PatientRecord and all the Flux wrapper classes to take in FHIR,
            // the approach here is:
            // 1. load them as FHIR as regular SHR objects,
            // 2. convert those regular SHR objects into SHR json
            // 3. instantiate the PatientRecord with the SHR JSON so that it hydrates the Flux wrapper classes correctly
            // this approach will likely result in slower performance than supporting FHIR --> Flux wrappers directly, but with massive development time savings

            const mappedResources = {};
            const referencesOut = [];
            const allObjects = entries.map(entry => {
                try {
                    const result = ObjectFactory.createInstanceFromFHIR(entry.resource, null, this._client.patient.id, entries, mappedResources, referencesOut);

                    // shortId here is the standard "resourceType/resourceID" ID format
                    const shortId = `${entry.resource.resourceType}/${entry.resource.id}`;

                    // this format and the entry fullURL are 2 formats that are used for references
                    // so add this object to the map with both keys, so either one could be used for lookups
                    // TODO: are there other formats?
                    mappedResources[entry.fullUrl] = mappedResources[shortId] = result;
                    return result;
                } catch (e) {
                    // just log the error, don't stop processing other potentially good objects
                    console.error(e);
                    return null;
                }
            });

            allObjects.push(...referencesOut);
            const json = allObjects.filter(o => o).map(o => o.toJSON());
            return new PatientRecord(json);
        })
        .then(record => callback(record), error => callback(null, error));
    }

    getListOfPatients() {
        console.error("listing of patients is not implemented in McodeV05SmartOnFhirDataSource.");
    }

    newPatient() {
        console.error("creating a new patient is not implemented in McodeV05SmartOnFhirDataSource.");
    }

    savePatient(patient) {
        console.error("saving a patient is not implemented in McodeV05SmartOnFhirDataSource.");
        // TODO. presumably we want to use
        // this._client.patient.api.update, or some combination of update/create. update uses PUT, create uses POST. for now assume PUT works everywhere
        // TODO: is there the possibility of deletes?
        // note that this also depends on toFHIR, which is not currently available
        // const successCallback = (entry) => {};
        // const errorCallback = (error) => {};
        // const fhirResources = patient.entries.map(e => e.toFHIR());
        // for (const resource of fhirResources) {
        //     this._client.patient.api.update({ resource }, successCallback, errorCallback);
        // }
    }
}

export default McodeV05SmartOnFhirDataSource;