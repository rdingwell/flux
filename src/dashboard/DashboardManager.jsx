import Collection from 'lodash';
import ClinicianDashboard from './ClinicianDashboard';
const PatientDashboard = ClinicianDashboard;

// Handles the dashboard to be displayed
class DashboardManager {
    constructor(possibleSuperRoles) {
        if (!possibleSuperRoles) {
            this.possibleSuperRoles = [
                {
                    name: 'Clinician',
                    dashboard: ClinicianDashboard
                }, {
                    name: 'Patient',
                    dashboard: PatientDashboard
                }
            ];
        } else {
            this.possibleSuperRoles = possibleSuperRoles;
        }
    }

    //Provide all possible superRoles, high level categories of people who could use the application
    getPossibleSuperRoles () {
        return Collection.reduce(this.possibleSuperRoles, function (accumulator, currentSuperRoleObj) {
            const currentSuperRoleName = currentSuperRoleObj.name;
            if (currentSuperRoleName) {
                accumulator.push(currentSuperRoleName);
            }
            return accumulator;
        }, []);
    }

    // Provides a dashboard based on the currentSuperRole
    getDashboardForSuperRole(currentSuperRole) {
        const dashboard = Collection.find(this.possibleSuperRoles, function (currentSuperRoleObj) {
            return currentSuperRoleObj.name === currentSuperRole;
        }).dashboard;
        if (dashboard)  {
            return dashboard;
        } else {
            console.log(`Trying to get dashboard for ${currentSuperRole} when no such dashboard has been defined.`);
            return;
        }
    }
}

export default DashboardManager;
