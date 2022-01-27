import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlmixed/htmlmixed';

import '../css/Previews/TextEditor.css';

/**
 * This was the first editor component I implimented, NumberedTextArea is better, but
 * I never bothered to change profiles from using TextEditor.
 */
class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
            code: props.value,
        };
        this.name = props.name;
        this.readOnly = props.readOnly;
    }
    changeMode = (event) => {
		var mode = event.target.value;
		this.setState({
			mode: mode,
			code: this.code
        });
        this.props.onModeChange(mode, "mode", this.name);
	}
    updateText = (e, d, newText) => {
        this.setState({
			code: newText,
        });
        this.props.onValueChange(newText, "value", this.name);
    }
    render() {
        var options = {
            lineNumbers: true,
            lineWrapping: true,
            mode: this.props.mode,
            smartIndent: false,
            autoRefresh: true,
            readOnly: this.readOnly,
            viewportMargin: Infinity,
        };

        return (
            <div>
                <CodeMirror value={this.props.value} onChange={this.updateText} options={options} />
                <span id="mode-dropdown">
                    <select onChange={this.changeMode} value={this.props.mode}>
                        <option value="javascript">JSON</option>
                        <option value="htmlmixed">HTML</option>
                        <option value="xml">XML</option>
                        <option value="text">Text</option>
                    </select>
                </span>
            </div>
        );
    }
}

export default TextEditor;