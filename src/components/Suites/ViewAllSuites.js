// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import PageHeader from "../Previews/PageHeader";
import ViewAllSuitesForm from "./ViewAllSuitesForm";

/**
 * Component for managing the page that views all test suites.
 */
class ViewAllSuites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="view-all-suites-container">
                <ToolNav />
                <PageHeader value="Test Suites"/>
                <ViewAllSuitesForm />
            </div>
        );
    }
}

export default ViewAllSuites;