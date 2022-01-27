// Module imports
import React from "react";
import Collapsible from 'react-collapsible';

// Component imports
import SchemaViewer from "../Details/SchemaViewer";

/**
 * Component for displaying errors for 'Schema Response Body' checks.
 */
class ErrorSchema extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            case: props.case,
            message: props.message,
            errors: props.errors,
        };
    }

    renderErrors = () => {
        return (
            <div>
              {this.state.errors.map(err => (
                <div className="schema-errors">
                  <label className="badge badge-danger">{err.property} {err.message}</label>
                </div>
              ))}
            </div>
        );
    }

    render() {
        console.log(this.state.errors)
        return (
            <div>
                <Collapsible trigger={
                    <button type="button" className="btn btn-secondary dropdown-toggle">
                        {this.state.message}
                    </button>}>
                    {this.renderErrors()}
                    <SchemaViewer 
                        schema={this.state.case.schemaBody} leftTitle="Schema"
                        response={this.state.case.responseBody} rightTitle="Response Body"
                    />
                </Collapsible>
                <br/>
            </div>

        )
    }
}

export default ErrorSchema;