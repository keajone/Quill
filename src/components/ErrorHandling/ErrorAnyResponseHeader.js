// Module imports
import React from "react";
import Collapsible from 'react-collapsible';

/**
 * Component for displaying errors for 'Any Response Header' checks.
 * 
 * In this case, a simple message is displayed under collapsable window.
 */
class ErrorAnyResponseHeader extends React.Component {

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
                No response header(s) was received.
                </Collapsible>
                <br/>
            </div>

        )
    }
}

export default ErrorAnyResponseHeader;