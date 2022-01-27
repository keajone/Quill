import {CaseCheckOptions} from "../Cases/Case";

/**
 * This file is for utility components/functions for Form building.
 */

 import React from "react";

// Returns a 'disabled' button if form is submitting. To prevent multiple clicks.
export function getSaveButton(isSubmitting) {
    let SaveButton;
    if (isSubmitting) {
        SaveButton = 
            <div className="new-case-submit">
                <button type="Submit" disabled className="btn btn-primary">Save</button>
            </div>
    } else {
        SaveButton = 
            <div className="new-case-submit">
                <button type="Submit" className="btn btn-primary">Save</button>
            </div>
    }
    return SaveButton;
}

// Single line text input
export class SingleLineInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.name = props.name;
        this.placeholder = props.placeholder;
        this.valueToChange = props.valueToChange;
        this.value = (props.value !== undefined ? props.value : "");
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.name+"Input"}>{this.name}</label>
                <input type="input" className="form-control" 
                        aria-describedby={this.name} placeholder={this.placeholder} 
                        onChange={e => {
                            this.onChange(this.valueToChange, e.target.value);
                            this.value = e.target.value
                        }}
                        value={this.value}
                />
            </div>
        );
    }
}

// Multi line text area
export class MultiLineInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.name = props.name;
        this.placeholder = props.placeholder;
        this.valueToChange = props.valueToChange;
        this.value = (props.value !== undefined ? props.value : "");
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.name+"Input"}>{this.name}</label>
                <textarea className="form-control" rows="3" aria-describedby={this.name} 
                            placeholder={this.placeholder} 
                            onChange={e => {
                                this.onChange(this.valueToChange, e.target.value);
                                this.value = e.target.value
                            }}
                            value={this.value}
                />
            </div>
        );
    }
}

// Dropdown selection
export class SelectDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.name = props.name;
        this.valueToChange = props.valueToChange;
        this.options = props.options;
    }

    getOptions() {
        var optionsHTML;
        for (let i=0; i<this.options.length; i++) {
            optionsHTML += <option>{this.options[i]}</option>;
        }
        return optionsHTML;
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.name+"Input"}>{this.name}</label>
                <select onChange={e => this.onChange(this.valueToChange, e.target.value)} 
                        className="form-control">
                    {this.getOptions}
                </select>
            </div>
        );
    }
}

export class CheckOptions extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.readOnlySchema = props.readOnlySchema;
        this.name = props.name;

        // Set the suite values to the given initial option boolean values.
        var options = Object.keys(CaseCheckOptions);
        var optionValues = this.props.optionValues;
        const onChange = this.onChange;
        options.forEach(function (o, i) {
            onChange(CaseCheckOptions[o], optionValues[i]);
        });
    }

    componentDidMount() {
        // Update the checkboxes based on initial option boolean values.
        // Needs to be done after rendering.
        var options = Object.keys(CaseCheckOptions);
        var optionValues = this.props.optionValues;
        options.forEach(function (o, i) {
            document.getElementById(CaseCheckOptions[o]+"-input").checked = optionValues[i];
        });
    }

    render() {
        return (
            <div className="check-options-container">
                <label htmlFor={this.name+"Options"}>{this.name}</label>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" value="" 
                                onChange={e => this.onChange(CaseCheckOptions.ONE, e.target.checked)}
                                id={CaseCheckOptions.ONE+"-input"}/>
                        Returns any response body
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" value="" 
                               onChange={e => this.onChange(CaseCheckOptions.TWO, e.target.checked)}
                               id={CaseCheckOptions.TWO+"-input"}/>
                        Returns an <b>expected</b> response body
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" value="" 
                               onChange={e => this.onChange(CaseCheckOptions.THREE, e.target.checked)}
                               id={CaseCheckOptions.THREE+"-input"}/>
                        Returns any header(s)
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" value="" 
                               onChange={e => this.onChange(CaseCheckOptions.FOUR, e.target.checked)}
                               id={CaseCheckOptions.FOUR+"-input"}/>
                        Returns an <b>expected</b> response header(s)
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" value="" 
                               onChange={(e) => {
                                    this.onChange(CaseCheckOptions.FIVE, e.target.checked);
                                    this.readOnlySchema(!e.target.checked);
                                }}
                               id={CaseCheckOptions.FIVE+"-input"}/>
                        Returns a response body based on <b>schema</b> (json only)
                    </label>
                </div>
            </div>
        )
    }
}