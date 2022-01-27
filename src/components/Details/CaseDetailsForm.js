// Module imports
import React from "react";
import ReactDOM from 'react-dom';
import Case from "../Cases/Case";

// Component imports

// CSS imports
import "../css/Details/CaseDetails.css";
import "../css/Details/ErrorDetails.css"

/**
 * Component for displaying details of a case run
 */
class CaseDetailsForm extends React.Component {

    constructor(props) {
        super(props);
        let id = props.id;
        let caseObj = props.case;

        this.state = {
            id: id,
            case: caseObj,
        };

        this.status = undefined;
        this.errMessage = undefined;
        this.onFail = props.onFail;
    }

    componentDidMount = async () => {

        var errors = await Case.execute(this.state.case);
        if (errors.length > 0) {
            console.log(errors);
            this.status = "fail";
            if (errors[0].type.name === "ErrorHTTP")
                this.errMessage = "HTTP error occured.";
            else
                this.errMessage = "1 or more checks did not pass."
        } else {
            this.status = "pass";
        }
        this.setErrors(errors);
        this.setStatus();
    }

    setStatus = () => {
        var status;

        if (this.status === "pass") {
            status = (
                <div id={"pass_"+this.state.id}>
                    <label className="badge badge-success">PASSED</label>
                    <label>&nbsp;&nbsp;&nbsp;All checks have passed.</label>
                </div>
            )
        } else if (this.status === "fail") {
            status = (
                <div id={"fail_"+this.state.id}>
                    <label className="badge badge-danger">FAILED</label>
                    <label>&nbsp;&nbsp;&nbsp;{this.errMessage}</label>
                </div>
            );
            if (this.onFail !== undefined)
                this.onFail();
        } else
            status = (<></>)

        ReactDOM.render(status, document.getElementById("case-details-status"+this.state.case.id));
    }

    setErrors = (errors) => {
        ReactDOM.render(
            errors, 
            document.getElementById("case-details-errors"+this.state.case.id));
    }

    render() {

        return ( 
            <div className="case-details-container">
                <h3>{this.state.case.caseName}</h3>
                <div id="case-details-status"><div id={"case-details-status"+this.state.case.id}></div></div>
                <div id="case-details-errors"><div id={"case-details-errors"+this.state.case.id}></div></div>
            </div>
        );
    }
}

export default CaseDetailsForm;