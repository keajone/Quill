// Module imports
import React from "react";
import { Formik, Field } from "formik";
import { withRouter } from "react-router-dom";

// Component imports
import Suite from "../Suites/Suite";
import Error from "../ErrorHandling/Error";
import CaseList from "./CaseList";
import {
    getSaveButton,
    MultiLineInput,
    SingleLineInput,
} from "../Tool/FormUtils"
import {ViewAllSuitesPath} from "../../App";


/**
 * Component for displaying the form to add a new Suite.
 */
class EditSuiteForm extends React.Component {

    constructor(props) {
        super(props);
        let obj = props.suite;
        this.state = {
            suiteObject: obj,
            id: obj.id,
            SuiteName: obj.SuiteName,
            Description: obj.Description,
            caseList: obj.caseList,
        };
    }

    // Attempts to edit the suite
    editSuite = (data) => {

        Error.clear();
        try {
            console.log("before suite save");
            var t = Suite.edit(data);
            console.log(t);

        }
        catch (err) {
            console.log(err);
            Error.set(err.message);
            return false
        }
        return true;
    }

    getDeleteButton = (isSubmitting) => {
        let DeleteButton;
        if (isSubmitting) {
            DeleteButton = 
                <div className="delete-case-submit">
                    <button type="button" disabled className="btn btn-danger">Delete</button>
                </div>
        } else {
            DeleteButton = 
                <div className="delete-case-submit">
                    <button type="button" className="btn btn-danger" onClick={ () => {
                        Error.clear();
                        let isSuccess = Suite.remove(this.state.suiteObject);
                        if (isSuccess)
                            this.props.history.push(ViewAllSuitesPath);
                        else
                            Error.set("Failed to remove test suite '"+this.state.suiteObject.SuiteName+"'");
                                
                    }}
                    >Delete</button>
                </div>
        }
        return DeleteButton;
    }

    render() {
        return (

            <div className="new-suite-form">
                <div className="new-suite-window">
                    <Formik 
                        initialValues={this.state.suiteObject} 
                        onSubmit={(data,actions) => { 
                            var isSuccess = this.editSuite(data);
                            actions.setSubmitting(false);
                            
                            // If successfully added, view all suites.
                            if (isSuccess)
                                this.props.history.push(ViewAllSuitesPath);
                        }}
                    >
                        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>

                                <div className="edit-buttons">
                                    <br/>
                                    {getSaveButton(isSubmitting)}
                                    {this.getDeleteButton(isSubmitting)}
                                </div>

                                {/** Suite Name input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <SingleLineInput 
                                        name="Suite Name"
                                        placeholder='Example: "Test Suite 1"' 
                                        onChange={setFieldValue} 
                                        valueToChange="SuiteName"
                                        value={values.SuiteName}
                                    />
                                )}
                                </Field>

                                {/** Description input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <MultiLineInput
                                        name="Description"
                                        placeholder='Example: "This suite focuses on testing the &apos;users&apos; endpoint."'
                                        onChange={setFieldValue} 
                                        valueToChange="Description"
                                        value={values.Description}
                                    />
                                )}
                                </Field>

                                {/** Add cases to suite input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <CaseList 
                                        onChange={setFieldValue} 
                                        valueToChange="caseList" 
                                        caseList={values.caseList}
                                    />
                                )}   
                                </Field>
                                <pre>{JSON.stringify(values, null, 2)}</pre>

                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        );
    }
}

export default withRouter(EditSuiteForm);