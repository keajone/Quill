// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import PageHeader from "../Previews/PageHeader";
import EditSuiteForm from "./EditSuiteForm";

/**
 * Component for managing the page that edits test suites.
 */
class EditSuite extends React.Component {

    constructor(props) {
        super(props);
        var suiteID = props.match.params.id;
        this.state = {
            suiteID: suiteID,
            suiteObject: this.getSuite(suiteID),
        };
    }

    // Finds and returns suite object from local storage given the ID.
    getSuite = (id) => {
        let suiteList = sessionStorage.getItem('Suites');
        let suiteObj = {};

        if (suiteList.length > 0) {
            suiteObj = JSON.parse(suiteList).find(obj => obj.id === id);
        }
        return suiteObj;
    }

    render() {
        return (
            <div className="edit-suite-container">
                <ToolNav />
                <PageHeader value="Edit Suite"/>
                <EditSuiteForm suite={this.state.suiteObject}/>
            </div>
        );
    }
}

export default EditSuite;