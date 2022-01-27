// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import ViewCaseForm from "./ViewCaseForm";
import PageHeader from "../Previews/PageHeader";

/**
 * Component for managing the page that views a single test case.
 */
class ViewCase extends React.Component {

    constructor(props) {
        super(props);
        var caseID = props.match.params.id;
        this.state = {
            caseID: caseID,
            caseObject: this.getCase(caseID),
        };
        this.editMode = false;
    }

    // Finds and returns case object from local storage given the ID.
    getCase = (id) => {
        let caseList = sessionStorage.getItem('cases');
        let caseObj = {};

        if (caseList.length > 0) {
            caseObj = JSON.parse(caseList).find(obj => obj.id === id);
        }
        return caseObj;
    }

    render() {
        return (
            <div className="case-container">

                <ToolNav />
                <PageHeader value={this.state.caseObject.caseName}/>
                <ViewCaseForm case={this.state.caseObject} edit={this.editMode}/>

            </div>
        );
    }
}

export default ViewCase;