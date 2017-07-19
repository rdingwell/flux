// React imports
import React, { Component } from 'react';
// material-ui
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
// Libraries
import staging from '../../lib/staging';
import lookup from '../../lib/staging_lookup';
// Lodash
import Lang from 'lodash'
// Styling
import './StagingForm.css';

class StagingForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        tumorValues: lookup.getTsForEdition(7),
        nodeValues: lookup.getNsForEdition(7),
        metastasesValues: lookup.getMsForEdition(7)
      };
  }

  _currentlySelected(item, i) {
    return (item === i ? true : false);
  }

  _handleTumorSizeClick = (e, i) => {
    e.preventDefault();
    console.log("StagingForm._handleTumorSizeClick T=" + i);
    
    let newStaging = Lang.clone(this.props.staging);
    newStaging.tumorSize = this.state.tumorValues[i].name
    this.props.onStagingUpdate(newStaging);
  }

  _handleNodeClick = (e, i) => {
    e.preventDefault();
    console.log("StagingForm._handleNodeClick N=" + i);

    let newStaging = Lang.clone(this.props.staging);
    newStaging.nodeSize = this.state.nodeValues[i].name;
    this.props.onStagingUpdate(newStaging);
  }

  _handleMetastasisClick = (e, i) => {
    e.preventDefault();
    console.log("StagingForm._handleMetastasisClick M=" + i);
    
    let newStaging = Lang.clone(this.props.staging);
    newStaging.metastasis = this.state.metastasesValues[i].name;
    this.props.onStagingUpdate(newStaging);
  }

  render() {
    // console.log("in render. t: " + this.props.t);
    return (
       <div>
            <h1>Current Staging</h1>
            <Divider className="divider" />

            <h4>Tumor Size</h4> 
            {this.state.tumorValues.map((t, i) => {
                const buttonClass = (t.description.length > 100) ? "tooltiptext large" : "tooltiptext";
                return (
                  <div key={t.name} className="tooltip">
                     <span id={t.name} className={buttonClass}>{t.description}</span>
                      <RaisedButton
                          className="btn tumor-size"
                          key={i}
                          label={titlecase(t.name)}
                          onClick={(e) => this._handleTumorSizeClick(e, i)}
                          disabled={this._currentlySelected(this.props.staging.tumorSize, this.state.tumorValues[i].name)}
                      />
                  </div>
                );
            })}

            <h4>Node</h4>
            {this.state.nodeValues.map((n, i) => {
                const buttonClass = (n.description.length > 100) ? "tooltiptext large" : "tooltiptext";
                return (
                  <div key={n.name} className="tooltip">
                     <span id={n.name} className={buttonClass}>{n.description}</span>
                      <RaisedButton
                          className="btn node"
                          key={i}
                          label={titlecase(n.name)}
                          onClick={(e) => this._handleNodeClick(e, i)}
                          disabled={this._currentlySelected(this.props.staging.nodeSize, this.state.nodeValues[i].name)}
                      />
                  </div>
                );
            })}

            <h4>Metastasis</h4>
            {this.state.metastasesValues.map((m, i) => {
                const buttonClass = (m.description.length > 100) ? "tooltiptext large" : "tooltiptext";
                return (
                  <div key={m.name} className="tooltip">
                   <span id={m.name} className={buttonClass}>{m.description}</span>
                    <RaisedButton
                        className="btn metastasis"
                        key={i}
                        label={titlecase(m.name)}
                        onClick={(e) => this._handleMetastasisClick(e, i)}
                        disabled={this._currentlySelected(this.props.staging.metastasis, this.state.metastasesValues[i].name)}
                    />
                  </div>
                );
            })}

            <h4>Prognostic Stage</h4>
            <div className="stage">{staging.breastCancerPrognosticStage(this.props.staging.tumorSize, this.props.staging.nodeSize, this.props.staging.metastasis) || 'Undefined'}</div>
        </div>
    );
  }
}

export default StagingForm;


function titlecase(label) {
  return label.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}
