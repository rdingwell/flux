import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Lang from 'lodash';
import FontAwesome from 'react-fontawesome';

import TemplateForm from '../forms/TemplateForm';
import ContextOptions from './ContextOptions';
import './ContextTray.css';

export default class ContextTray extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // value keeps track of which context is active
            // 0 when Templates are selected. 1 when Patient is selected
            // In editor, value is incremented by 1 for each context added (i.e @condition, #disease status)
            value: 1,
            lastActiveContextCount: 0,
            templates: [
                { name: 'progress note', content: 'REASON FOR VISIT:\n@reason for next visit @condition[[Invasive ductal carcinoma of breast]]\n\nHISTORY OF PRESENT ILLNESS:\n@HPI\n\nREVIEW OF SYSTEMS:\n\nALLERGIES:\n@ALLERGIES\n\nMEDICATIONS:\n@active medications\n\nPHYSICAL EXAM:\n\nASSESSMENT:\n\nPLAN:\n\n' },
                { name: 'op note', content: 'op note' },
                { name: 'follow-up', content: 'follow up' },
                { name: 'consult note', content: '@patient presenting with ' }
            ]
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let activeContexts = this.getActiveContexts();

        if (this.state.lastActiveContextCount !== activeContexts.length) {
            this.setState({
                value: activeContexts.length + 1,
                lastActiveContextCount: activeContexts.length
            }, () => {
                // scrolls to newest ContextOption section
                const newContextSection = findDOMNode(this.refs[`context-option-${this.state.value - 2}`]);
                if (newContextSection) newContextSection.scrollIntoView();
            });
        }
    }

    // Get all contexts being used in the editor
    getActiveContexts() {
        let activeContexts = [];

        this.props.contextManager.getActiveContexts().slice(0).reverse().forEach((context, i) => {
            if (!Lang.isNull(context.getLabel())) {
                activeContexts.push(context);
            }
        });

        return activeContexts;
    }

    insertTemplate = (i) => {
        this.props.onShortcutClicked(this.state.templates[i].content);
    }

    handleShortcutClick = (shortcut) => {
        this.props.onShortcutClicked(shortcut); // + shortcut.substring(0, 1)); no longer need trailing @ or #
    }

    handleTemplateSectionClick = () => this.setState({ value: 0 })
    handlePatientSectionClick = () => this.setState({ value: 1 })

    findParentContext(activeContexts) {
        const value = this.state.value - 2;
        if (activeContexts[value] == null) {
            return null;
        } else if (activeContexts[value].parentContext) {
            return activeContexts[value].parentContext;
        } else {
            return activeContexts[value];
        }
    }

    filterContextChildren(activeContexts, context) {
        if (context == null || context.children.length === 0) {
            return [];
        }
        
        return context.children.filter((childContext) => activeContexts.indexOf(childContext) > -1);
    }

    renderParentContexts(contexts) {
        const activeContextIndex = this.state.value - 2;
        const activeContext = contexts[activeContextIndex];
        const parentContexts = contexts.filter((context) => context.parentContext == null);

        console.log("parent contexts");
        console.log(parentContexts);

        if (parentContexts.length === 0) {
            return null;
        }

        const selectedParentContext = this.findParentContext(contexts);

        console.log("selected parent context");
        console.log(selectedParentContext);
        const children = this.filterContextChildren(contexts, selectedParentContext);

        // console.log("children");
        // console.log(children);

        return (
            <div>
                <section>
                    {parentContexts.map((context, i) => {
                        const isActive = activeContext === context;
                        const contextIndex = contexts.indexOf(context) + 2;

                        console.log("is active");
                        console.log(isActive);

                        console.log("context");
                        console.log(context);

                        if (!isActive && (selectedParentContext !== context)) {
                            return (
                                <div
                                    className={`section-item${isActive ? ' selected' : '-disabled'}`}

                                    key={`context-header-option-${contextIndex}`}
                                    title={context.text}
                                >
                                    {/*<FontAwesome name={isActive ? 'angle-down' : 'angle-right'} fixedWidth />*/}
                                    {context.text}
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    className={`section-item${isActive ? ' selected' : ''}`}
                                    onClick={() => this.setState({ value: contextIndex })}
                                    key={`context-header-option-${contextIndex}`}
                                    title={context.text}
                                >
                                    <FontAwesome name={isActive ? 'angle-down' : 'angle-right'} fixedWidth />
                                    {context.text}
                                </div>
                            );
                        }


                    })}
                </section>

                {activeContext && activeContext === selectedParentContext &&
                    <ContextOptions
                        ref={`context-option-${this.state.value}`}
                        contextManager={this.props.contextManager}
                        shortcutManager={this.props.shortcutManager}
                        handleClick={this.handleShortcutClick}
                        context={activeContext}
                    />
                }

                {this.renderChildrenContexts(contexts, children)}
            </div>
        );
    }

    renderChildrenContexts(contexts, children) {
        if (children.length === 0) {
            return null;
        }

        const activeContextIndex = this.state.value - 2;
        const activeContext = contexts[activeContextIndex];
        const activeChildIndex = children.indexOf(activeContext);
        const subchildren = children
            .map((child) => this.filterContextChildren(contexts, child))
            .reduce((memo, val) => memo.concat(val), []);

        return (
            <div>
                <section>
                    {children.map((context, i) => {
                        const contextIndex = contexts.indexOf(context) + 2;
                        const isActive = context === activeContext;

                        return (
                            <div
                                className={`section-item${isActive ? ' selected' : ''}`}
                                onClick={() => this.setState({ value: contextIndex })}
                                key={`context-child-option-${contextIndex}`}
                                title={context.text}
                            >
                                <FontAwesome name={isActive ? 'angle-down' : 'angle-right'} fixedWidth />
                                {context.text}
                            </div>
                        );
                    })}
                </section>

                {activeChildIndex > -1 &&
                    <ContextOptions
                        ref={`context-option-${this.state.value}`}
                        contextManager={this.props.contextManager}
                        shortcutManager={this.props.shortcutManager}
                        handleClick={this.handleShortcutClick}
                        context={activeContext}
                    />
                }

                {this.renderChildrenContexts(contexts, subchildren)}
            </div>
        );
    }

    render() {
        const { value, templates } = this.state;
        const activeContexts = this.getActiveContexts();

        // console.log(activeContexts);
        // console.log("value: ");
        // console.log(value);
        // console.log("activeContexts");

        return (
            <div className="context-tray">
                <section>
                    <div
                        className={`section-item${value === 0 ? ' selected' : ''}`}
                        onClick={this.handleTemplateSectionClick}
                    >
                        <FontAwesome name={value === 0 ? 'angle-down' : 'angle-right'} fixedWidth />
                        Templates
                    </div>

                    <div
                        className={`section-item${value === 1 ? ' selected' : ''}`}
                        onClick={this.handlePatientSectionClick}
                    >
                        <FontAwesome name={value === 1 ? 'angle-down' : 'angle-right'} fixedWidth />
                        Patient
                    </div>
                </section>

                {value === 0 &&
                    <section>
                        <TemplateForm
                            patient={this.props.patient}
                            heading=""
                            templates={templates.map((item) => { return item.name })}
                            handleClick={this.insertTemplate}
                        />
                    </section>
                }

                {value === 1 &&
                    <ContextOptions
                        contextManager={this.props.contextManager}
                        shortcutManager={this.props.shortcutManager}
                        handleClick={this.handleShortcutClick}
                    />
                }

                {this.renderParentContexts(activeContexts)}
            </div>
        );
    }
}

ContextTray.proptypes = {
    ref: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,
    shortcutManager: PropTypes.object.isRequired,
    contextManager: PropTypes.object.isRequired,
    onShortcutClicked: PropTypes.func.isRequired
}
