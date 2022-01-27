// Module imports
import React from "react";
import Collapsible from 'react-collapsible';

/**
 * Component for displaying errors for 'Any Response Body' checks.
 * 
 * In this case, a simple message is displayed under collapsable window.
 */
class ErrorAnyResponseBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Collapsible trigger={
                    <button type="button" className="btn btn-secondary dropdown-toggle">
                        {this.state.message}
                    </button>}
                >
                No response body was received.
                </Collapsible>
                <br/>
            </div>

        )
    }
}

export default ErrorAnyResponseBody;