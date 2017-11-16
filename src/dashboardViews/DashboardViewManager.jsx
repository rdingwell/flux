import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PatientSummaryPanel from '../summary/PatientSummaryPanel';
import PreEncounterView from './PreEncounterView';
// import EncounterView from './EncounterView';
import PostEncounterView from './PostEncounterView';
const EncounterView = PostEncounterView;


class DashboardViewManager extends Component { 
    // Based on the current clinical event, return a React Component to render
    renderCurrentView = (currentClinicalEvent) => { 
        switch(currentClinicalEvent){ 
        case "pre-encounter":
            return <PreEncounterView {...this.props} />
        case "encounter":
            return <EncounterView {...this.props} />
        case "post-encounter":
            return <PostEncounterView {...this.props} />
        default: 
            console.error(`current clinical event ${currentClinicalEvent} is not a valid event`);  
            return "";
        }
    }

    render() { 
        return (
            <Grid className="FullApp-content" fluid>
                <Row center="xs">
                    <Col sm={12}>
                        <PatientSummaryPanel
                            patient={this.props.appState.patient}
                            possibleClinicalEvents={this.props.possibleClinicalEvents}
                            clinicalEvent={this.props.appState.clinicalEvent}
                            setFullAppState={this.props.setFullAppState} 
                        />
                    </Col>
                </Row>
                {this.renderCurrentView(this.props.appState.clinicalEvent)}
            </Grid>
        );
    }
}

DashboardViewManager.proptypes = { 
    possibleClinicalEvents: PropTypes.array.isRequired,
    dataAccess: PropTypes.object.isRequired,
    summaryMetadata: PropTypes.object.isRequired,
    shortcutManager: PropTypes.object.isRequired,
    contextManager: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired,
    setFullAppState: PropTypes.func.isRequired,
    updateErrors: PropTypes.func.isRequired,
    onContextUpdate: PropTypes.func.isRequired,
    itemInserted: PropTypes.func.isRequired,
    newCurrentShortcut: PropTypes.func.isRequired,
    handleShortcutUpdate: PropTypes.func.isRequired,
    handleStructuredFieldEntered: PropTypes.func.isRequired,
    handleStructuredFieldExited: PropTypes.func.isRequired,
    handleSelectionChange: PropTypes.func.isRequired,
    handleSummaryItemSelected: PropTypes.func.isRequired,
};

export default DashboardViewManager;