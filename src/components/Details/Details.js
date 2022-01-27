// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import CaseDetailsForm from "./CaseDetailsForm";
import SuiteDetailsForm from "./SuiteDetailsForm";
import PageHeader from "../Previews/PageHeader";

/**
 * Abstract Component for managing the page that shows details of a running case or suite
 */
class Details extends React.Component {

    constructor(props) {
        super(props);
        let id = props.match.params.id;

        // determine if the element is a test case or suite
        var isCase;
        if (JSON.parse(sessionStorage.getItem('cases')).find(obj => obj.id === id) !== undefined) {
            isCase = true;
        } else if (JSON.parse(sessionStorage.getItem('Suites')).find(obj => obj.id === id) !== undefined) {
            isCase = false;
        } else {
            isCase = undefined;
        }

        this.state = {
            id: id,
            isCase: isCase,
            element: isCase ? this.getCase(id) : this.getSuite(id),
        };
    }

    // Retrieve case object from local storage
    getCase = (id) => {
        let caseList = sessionStorage.getItem('cases');
        let caseObj = {};

        if (caseList.length > 0) {
            caseObj = JSON.parse(caseList).find(obj => obj.id === id);
        }
        return caseObj;
    }

    // Retrieve suite object from local storage
    getSuite = (id) => {
        let suiteList = sessionStorage.getItem('Suites');
        let suiteObj = {};

        if (suiteList.length > 0) {
            suiteObj = JSON.parse(suiteList).find(obj => obj.id === id);
        }
        return suiteObj;
    }

    getForm = () => {
        if (this.state.isCase)
            return (<CaseDetailsForm id={this.state.id} case={this.state.element}/>);
        else
            return (<SuiteDetailsForm id={this.state.id} suite={this.state.element}/>);
    }

    render() {
        return (
            <div className="details-container">

                <ToolNav />
                <PageHeader value="Details"/>
                {this.getForm()}
            </div>
        );
    }
}

export default Details;