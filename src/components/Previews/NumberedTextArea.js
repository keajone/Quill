import React, { Component } from 'react';
import {Field} from 'formik';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlmixed/htmlmixed';

import '../css/Previews/NumberedTextArea.css';

/**
 * Numbered text area component. 
 * Used for displaying response/request headers/body information.
 */
class NumberedTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "javascript",
            value: "",
        };
        this.edit = (props.edit === "false" ? "nocursor" : false);
        this.name = props.name;
        this.title = props.title;
        this.value = (props.value !== undefined ? props.value : "");
    }

    // handle the change of mode for the text editor
    updateMode = (event) => {
		var mode = event.target.value;
		this.setState({
			mode: mode,
        });
    }
    
    render() {
        var options = {
            lineNumbers: true,
            lineWrapping: true,
            mode: this.state.mode,
            smartIndent: false,
            autoRefresh: true,
            readOnly: this.edit,
        };

        return (

            <Field name={this.name} id={this.name} type="input">
                {({ form: { setFieldValue } }) => (
                <div className={"numbered-text-area-"+this.name}>
                    <div className="editor-title">{this.title}</div>
                    <CodeMirror 
                        value={this.value} 
                        onChange={(e,d,newValue) => setFieldValue(this.name, newValue)} 
                        options={options} 
                    />
                    <span id="mode-dropdown-text-area">
                        <select onChange={this.updateMode} value={this.state.mode}>
                            <option value="javascript">JSON</option>
                            <option value="htmlmixed">HTML</option>
                            <option value="xml">XML</option>
                            <option value="text">Text</option>
                        </select>
                    </span>
                </div>
                )}
            </Field>
        );
    }
}

export default NumberedTextArea;