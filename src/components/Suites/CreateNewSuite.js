// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import PageHeader from "../Previews/PageHeader";
import CreateNewSuiteForm from "./CreateNewSuiteForm";

/**
 * Component for managing the page that creates new test suites.
 */
class CreateNewSuite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="new-test-suite-container">
                <ToolNav />
                <PageHeader value="New Test Suite"/>
                <CreateNewSuiteForm />
            </div>
        );
    }
}

export default CreateNewSuite;