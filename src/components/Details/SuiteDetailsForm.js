// Module imports
import React from "react";

// Component imports
import Suite from "../Suites/Suite";

// CSS imports
import "../css/Details/SuiteDetails.css";
import CaseDetailsForm from "./CaseDetailsForm";

/**
 * Component for displaying details of suite run
 */
class SuiteDetailsForm extends React.Component {

    constructor(props) {
        super(props);
        let id = props.id;
        let suite = props.suite;

        this.state = {
            id: id,
            suite: suite,
            failure: false,
        };
    }

    setFailStatus = () => {

        this.setState({
            failure: true,
            suite: {
                ...this.state.suite,
                status: "fail"
            }
        });
        Suite.edit(this.state.suite);
    }

    getCases = () => {
        return (
            <div>{this.state.suite.caseList.map((c) => { 

                return (<><br/>
                    <CaseDetailsForm case={c} id="suite-details" onFail={this.setFailStatus}/>
                    <br/></>
                ); 
            })}</div>
        )
    }

    getName = () => {
        return (
            <div className="details-suite-name">
                <br/>
                <h3 style={{marginLeft: "5%"}}>{this.state.suite.SuiteName}</h3>
            </div>
        );
    }

    getStatus = () => {
        if (this.state.failure === true) {
            return (
                <div className="details-status">
                    <label className="badge badge-danger" id={"fail_"+this.state.id}>FAILED</label>
                    <label id="details-status-message">&nbsp;&nbsp;&nbsp;Not all test cases passed.</label>
                </div>
            );
        } else {
            return (
                <div className="details-status">
                    <label className="badge badge-success" id={"pass_"+this.state.id}>PASSED</label>
                    <label id="details-status-message">&nbsp;&nbsp;&nbsp;All test cases passed successfully.</label>
                </div>
            );
        }
    }

    render() {
        return ( 
            <div className="suite-details-container">

                <h2>Suite:</h2>
                {this.getName()}

                <br/>

                {this.getStatus()}

                <br/>

                <h2>Cases:</h2><br/>
                {this.getCases()}

            </div>
        );
    }
}

export default SuiteDetailsForm;