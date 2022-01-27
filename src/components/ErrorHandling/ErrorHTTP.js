// Module imports
import React from "react";
import Collapsible from 'react-collapsible';


/**
 * Component for displaying an error message when a test case fails due to an HTTP problem.
 */
class ErrorHTTP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.message = props.message;
    }

    render() {
        return (
            <div>
                
                <Collapsible trigger={
                    <button type="button" className="btn btn-secondary dropdown-toggle">
                        Stack Trace
                    </button>}>
                    {this.message}
                </Collapsible>
            </div>
        )
    }
}

export default ErrorHTTP;