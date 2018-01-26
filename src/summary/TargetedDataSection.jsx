import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../elements/Button';
import './TargetedDataSection.css';
import Lang from 'lodash';

export default class TargetedDataSection extends Component {
    constructor(props) {
        super(props);

        const optionsForSection = this.getOptions(props.section);
        const defaultOrTabular = optionsForSection.length > 0 ? optionsForSection[0] : 'tabular';

        // this.state.defaultVisualizer is the first possible visualization, this.state.chosenVisualizer changes when icons are clicked
        this.state = {
            defaultVisualizer: defaultOrTabular,
            chosenVisualizer: null
        };
    }

    componentDidUpdate() {
        const optionsForSection = this.getOptions(this.props.section);
        const defaultOrTabular = optionsForSection.length > 0 ? optionsForSection[0] : 'tabular';
        if (this.state.defaultVisualizer !== defaultOrTabular ||
            (this.state.chosenVisualizer !== null && !optionsForSection.includes(this.state.chosenVisualizer))) {
            this.setState({defaultVisualizer: defaultOrTabular, chosenVisualizer: null});
        }
    }

    handleViewChange = (chosenVisualizer) => {
        this.setState({chosenVisualizer});
    }

    checkVisualization = () => {
        let visualization;
        if (this.state.chosenVisualizer === null) {
            visualization = this.state.defaultVisualizer;
        } else {
            visualization = this.state.chosenVisualizer;
        }
        return visualization;
    }

    renderIcon = (type, i) => {
        const visualization = this.checkVisualization();
        const isSelected = visualization === type;
        let icon = this.props.visualizerManager.renderIcon(type, isSelected);

        if (icon !== null) {
            return (
                <Button
                    key={i}
                    className="small-btn"
                    id={type}
                    onClick={() => this.handleViewChange(type)}>
                    {icon}
                </Button>
            );
        }
        return null;
    }

    getVisualizationsIcons = (options) => {
        let visualizationButtons = options.map((type, i) => this.renderIcon(type, i));
        return visualizationButtons;
    }

/*    getOptions = (section) => {
        let options = [];
        if (section.type === "NameValuePairs") {
            options.push('tabular');
            if (section.narrative) {
                options.push('narrative');
            }
        } else if (section.type === "Events") {
            options.push('graphic');
        } else if (section.type === "ValueOverTime") {
            options.push('chart');
        } else if (section.type === "DiseaseStatusValues") {
            options.push('chart');
        } else if (section.type === "ListType") {
            if (section.name === 'Medications') {
                options.push('chart'); // TODO: This will get handled better when we have functionality to reuse visualizations
            }
            options.push('tabular');
        }
        return options;
    }*/
    
    getOptions = (section) => {
        return this.props.visualizerManager.getSupportedVisualizerTypesForDataType(section.type);
    }

    renderVisualizationOptions = (options) => {
        if (options.length > 1) {
            return (
                <div className="right-icons">
                    {this.getVisualizationsIcons(options)}
                </div>
            );
        } else {
            return null;
        }
    }

    // renderSection checks the type of data that is being passed and chooses the correct component to render the data
    // TODO: Add a List type and a tabular renderer for it for Procedures section. case where left column is data
    //       and not just a label
    renderSection = (section) => {
        const { patient, condition, onItemClicked, allowItemClick, isWide, type } = this.props;
        const visualization = this.checkVisualization();

        const viz = this.props.visualizerManager.getVisualizer(type, visualization);
        if (Lang.isNull(viz)) return null;
        
        const sectionTransform = viz.transform;
        const Visualizer = viz.visualizer;
                
        return (
            <Visualizer
                patient={patient}
                condition={condition}
                conditionSection={section}
                sectionTransform={sectionTransform}
                onItemClicked={onItemClicked}
                allowItemClick={allowItemClick}
                isWide={isWide}
            />
        );
/*        switch (type) {
            case "ListType": {
                if (visualization === 'tabular') {
                    return (
                        <TabularListVisualizer
                            patient={patient}
                            condition={condition}
                            conditionSection={section}
                            onItemClicked={onItemClicked}
                            allowItemClick={allowItemClick}
                            isWide={isWide}
                        />
                    );
                } else if (visualization === 'chart' && section.name === 'Medications') {
                    return (
                        <MedicationRangeChartVisualizer
                            patient={patient}
                            condition={condition}
                            conditionSection={section}
                            onItemClicked={onItemClicked}
                            allowItemClick={allowItemClick}
                            isWide={isWide}
                        />
                    );
                } else {
                    return null;
                }
            }
            case 'NameValuePairs': {
                if (visualization === 'tabular') {
                    return (
                        <TabularNameValuePairsVisualizer
                            patient={patient}
                            condition={condition}
                            conditionSection={section}
                            onItemClicked={onItemClicked}
                            allowItemClick={allowItemClick}
                            isWide={isWide}
                        />
                    );
                } else if (visualization === 'narrative') {
                    return (
                        <NarrativeNameValuePairsVisualizer
                            patient={patient}
                            condition={condition}
                            conditionSection={section}
                            onItemClicked={onItemClicked}
                            allowItemClick={allowItemClick}
                            isWide={isWide}
                        />
                    );
                } else {
                    return null;
                }
            }
            case 'ValueOverTime': {
                if (visualization === 'chart') {
                    return (
                        <BandedLineChartVisualizer
                            patient={patient}
                            condition={condition}
                            conditionSection={section}
                            onItemClicked={onItemClicked}
                            allowItemClick={allowItemClick}
                            isWide={isWide}
                        />
                    );
                } else {
                    return null;
                }
            }
            case 'DiseaseStatusValues' : {
                if (visualization === 'chart') {
                    return (
                        <ProgressionLineChartVisualizer
                            patient={patient}
                            condition={condition}
                            conditionSection={section}
                            onItemClicked={onItemClicked}
                            allowItemClick={allowItemClick}
                            isWide={isWide}
                        />
                    );
                } else {
                    return null;
                }
            }
            case 'Events': {
                if (visualization === 'graphic') {
                    return (
                        <TimelineEventsVisualizer
                            patient={patient}
                            condition={condition}
                            conditionSection={section}
                            isWide={isWide}
                        />
                    );
                } else {
                    return null;
                }
            }
            default:
                return null;
        }*/
    }

    render() {
        const { section, condition, clinicalEvent } = this.props;
        const visualizationOptions = this.getOptions(section);
        const selectedCondition = condition && condition.specificType.codeableConcept.displayText.string;
        const encounterView = clinicalEvent === "encounter";

        return (
            <div id="targeted-data-section">
                <h2 className="section-header">
                    <span className="section-header__name">{section.name}</span>
                    {!encounterView && <span className="section-header__condition">{selectedCondition}</span>}
                    {this.renderVisualizationOptions(visualizationOptions)}
                </h2>

                {encounterView && <div className="section-header__condition encounter">{selectedCondition}</div>}

                {this.renderSection(section)}
            </div>
        );
    }
}

TargetedDataSection.propTypes = {
    type: PropTypes.string,
    section: PropTypes.object,
    patient: PropTypes.object,
    condition: PropTypes.object,
    onItemClicked: PropTypes.func,
    allowItemClick: PropTypes.bool,
    isWide: PropTypes.bool.isRequired,
    clinicalEvent: PropTypes.string.isRequired
}
