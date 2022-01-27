// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import NewCaseForm from "./NewCaseForm";
import PageHeader from "../Previews/PageHeader";

/**
 * Component for managing the page that creates new test case.
 */
class CreateNewCase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (

            <div className="new-case-container">

                <ToolNav />
                <PageHeader value="New Test Case"/>
                <NewCaseForm />

            </div>

        );
    }
}

export default CreateNewCase;