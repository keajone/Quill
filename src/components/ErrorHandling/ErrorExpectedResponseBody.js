// Module imports
import React from "react";
import Collapsible from 'react-collapsible';

// Component imports
import Diff from "../Details/DiffViewer";

/**
 * Component for displaying errors for 'Expected Response Body' checks.
 * 
 * Displays a diff viewer of expected/given response output.
 */
class ErrorExpectedResponseBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            case: props.case,
            message: props.message,
        };
    }

    render() {
        return (
            <div>
                <Collapsible trigger={
                    <button type="button" className="btn btn-secondary dropdown-toggle">
                        {this.state.message}
                    </button>}>
                <Diff 
                    expected={this.state.case.expectedResponseBody} leftTitle="Expected Response Body"
                    given={this.state.case.responseBody} rightTitle="Given Response Body"
                />
                </Collapsible>
                <br/>
            </div>

        )
    }
}

export default ErrorExpectedResponseBody;