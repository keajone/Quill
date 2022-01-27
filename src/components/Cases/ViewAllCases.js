// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import AllCasesForm from "./AllCasesForm";
import PageHeader from "../Previews/PageHeader";

/**
 * Component for managing the page that views all test cases.
 */
class ViewAllCases extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tabs: props.tabs, currentTab: props.currentTab};
        this.handleNameChange = props.handleNameChange;
    }

    render() {
        return (
            <div className="new-case-container">

                <ToolNav />
                <PageHeader value="Test Cases"/>
                <AllCasesForm />

            </div>
        );
    }
}

export default ViewAllCases;